import { useState, useCallback } from "react";
import { photographyCategories, photographyImages } from "@/data/portfolio-data";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";

// Utility to detect image orientation
const getImageOrientation = (src: string): Promise<'vertical' | 'horizontal'> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve(img.naturalHeight > img.naturalWidth ? 'vertical' : 'horizontal');
    };
    img.src = src;
  });
};

interface PhotographySectionProps {
  onImageClick: (image: { src: string; title: string; category: string }) => void;
}

export default function PhotographySection({ onImageClick }: PhotographySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [aiKeywords, setAiKeywords] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchIntent, setSearchIntent] = useState("");

  // Fetch uploaded photos from database
  const { data: dbPhotos = [] } = useQuery({
    queryKey: ["/api/photos"],
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: 0, // Always fetch fresh data
  });

  // Combine static photos with database photos
  const allPhotos = [...photographyImages, ...dbPhotos.map((photo: any) => ({
    ...photo,
    tags: (photo.tags || []).filter((tag: string) => tag.trim() !== "")
  }))];

  // Debug: Log photos for troubleshooting
  // console.log("Static photos count:", photographyImages.length);
  // console.log("Database photos count:", dbPhotos.length);
  // console.log("Total photos:", allPhotos.length);

  // AI-powered search analysis with smart fallback
  const analyzeSearch = useCallback(async (query: string) => {
    if (!query.trim() || query.length < 3) {
      setAiKeywords([]);
      setSearchIntent("");
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/search-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        credentials: "include"
      });
      
      if (!response.ok) {
        // If AI fails (quota exceeded, etc.), fall back to smart keywords
        if (response.status === 429) {
          console.log("AI quota exceeded, using smart keyword fallback");
        } else {
          console.log("AI search unavailable, using smart keyword fallback");
        }
        const smartKeywords = getSmartKeywords(query);
        setAiKeywords(smartKeywords);
        setSearchIntent(`Finding photos related to "${query}" using smart search`);
        return;
      }
      
      const analysis = await response.json();
      setAiKeywords(analysis.keywords || []);
      setSearchIntent(analysis.intent || "");
    } catch (error) {
      console.log("AI search unavailable, using smart keyword fallback", error);
      // Fallback to smart keyword system
      const smartKeywords = getSmartKeywords(query);
      setAiKeywords(smartKeywords);
      setSearchIntent(`Finding photos related to "${query}"`);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  // Debounced search analysis with longer delay to prevent rate limiting
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Set new timeout for debounced search with longer delay
    searchTimeoutRef.current = setTimeout(() => {
      analyzeSearch(value);
    }, 1000); // 1 second delay to prevent rate limiting
  }, [analyzeSearch]);

  // Smart keyword mapping for better search results
  const getSmartKeywords = (searchTerm: string): string[] => {
    const term = searchTerm.toLowerCase();
    const keywordMap: { [key: string]: string[] } = {
      // People & Emotions
      'people': ['portraits', 'group', 'children', 'flower-girls', 'candid'],
      'kids': ['children', 'flower-girls', 'innocence', 'youth'],
      'children': ['flower-girls', 'kids', 'innocence', 'youth'],
      'couple': ['wedding', 'romance', 'love', 'bridal'],
      'bride': ['wedding', 'bridal', 'elegance', 'dress'],
      'groom': ['wedding', 'formal', 'suit'],
      
      // Emotions & Moods
      'happy': ['joy', 'celebration', 'smile', 'cheerful'],
      'elegant': ['elegance', 'formal', 'sophisticated', 'classic'],
      'romantic': ['romance', 'wedding', 'love', 'intimate'],
      'fun': ['celebration', 'joy', 'festival', 'party'],
      'peaceful': ['serenity', 'calm', 'nature', 'ethereal'],
      
      // Photography Styles
      'artistic': ['creative', 'abstract', 'experimental', 'unique'],
      'documentary': ['candid', 'street', 'real', 'authentic'],
      'portrait': ['portraits', 'people', 'face', 'expression'],
      'landscape': ['nature', 'seascape', 'outdoor', 'scenic'],
      'macro': ['close-up', 'details', 'intimate'],
      
      // Events & Occasions
      'party': ['celebration', 'festival', 'event', 'gathering'],
      'ceremony': ['wedding', 'formal', 'traditional', 'ritual'],
      'celebration': ['festival', 'party', 'joy', 'event'],
      
      // Visual Elements
      'water': ['waves', 'seascape', 'ocean', 'flow'],
      'movement': ['motion', 'dynamic', 'action', 'flow'],
      'fashion': ['style', 'dress', 'outfit', 'clothing'],
      'flowers': ['bouquet', 'floral', 'nature', 'decoration'],
      'city': ['urban', 'street', 'buildings', 'metropolitan'],
      
      // Colors (implied)
      'colorful': ['vibrant', 'bright', 'festival', 'celebration'],
      'black and white': ['monochrome', 'classic', 'timeless', 'artistic'],
      'vintage': ['classic', 'retro', 'traditional', 'timeless'],
      
      // Technical terms
      'blur': ['motion', 'movement', 'dynamic', 'artistic'],
      'sharp': ['clear', 'crisp', 'detailed', 'precise']
    };
    
    return keywordMap[term] || [term];
  };

  // AI-enhanced filter with natural language understanding
  const filteredImages = searchTerm.trim() ? allPhotos.filter(img => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const smartKeywords = getSmartKeywords(lowerSearchTerm);
    
    // Direct search in title
    if (img.title.toLowerCase().includes(lowerSearchTerm)) return true;
    
    // Direct search in category
    if (img.category.toLowerCase().includes(lowerSearchTerm)) return true;
    
    // Direct search in description
    if (img.description && img.description.toLowerCase().includes(lowerSearchTerm)) return true;
    
    // Event name search
    if ((img as any).event && (img as any).event.toLowerCase().includes(lowerSearchTerm)) return true;
    
    // Search in tags
    if ((img as any).tags) {
      const imageTags = (img as any).tags as string[];
      
      // Direct tag match
      if (imageTags.some(tag => tag.toLowerCase().includes(lowerSearchTerm))) return true;
      
      // Smart keyword match (fallback)
      if (smartKeywords.some(keyword => 
        imageTags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
      )) return true;
      
      // AI keyword match (primary)
      if (aiKeywords.length > 0 && aiKeywords.some(keyword => 
        imageTags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
      )) return true;
    }
    
    return false;
  }) : allPhotos;

  // Get unique categories from filtered images
  const uniqueCategories = filteredImages.reduce((acc: string[], img) => {
    if (!acc.includes(img.category)) {
      acc.push(img.category);
    }
    return acc;
  }, []);

  // Get unique events within the events category from filtered images
  const uniqueEvents = filteredImages
    .filter(img => img.category === 'events')
    .reduce((acc: string[], img) => {
      const eventName = (img as any).event || img.title;
      if (!acc.includes(eventName)) {
        acc.push(eventName);
      }
      return acc;
    }, []);

  // Get representative image for each category (first image)
  const getCategoryRepresentative = (category: string) => {
    return allPhotos.find(img => img.category === category);
  };

  // Get representative image for each event
  const getEventRepresentative = (eventName: string) => {
    return allPhotos.find(img => 
      img.category === 'events' && ((img as any).event === eventName || img.title === eventName)
    );
  };

  const handleImageClick = (image: typeof photographyImages[0]) => {
    onImageClick({
      src: image.fullSrc,
      title: image.title,
      category: `${image.category.charAt(0).toUpperCase() + image.category.slice(1)} Photography`
    });
  };

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      'long-exposure': 'Long Exposure',
      'street': 'Street Photography',
      'wedding': 'Wedding Photography',
      'events': 'Events'
    };
    return labels[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };

  const handleCategoryClick = (category: string) => {
    if (category === 'events') {
      setSelectedCategory(selectedCategory === category ? null : category);
      setSelectedEvent(null);
    } else {
      setSelectedCategory(selectedCategory === category ? null : category);
      setSelectedEvent(null);
    }
  };

  const handleEventClick = (eventName: string) => {
    setSelectedEvent(selectedEvent === eventName ? null : eventName);
  };

  return (
    <section id="photography" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#000000' }}>
            Photography Portfolio
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-6" style={{ color: '#000000' }}>
            Street photography and urban exploration through the lens of human connection and city life
          </p>
          <div className="flex justify-center">
            <a 
              href="https://www.instagram.com/ozayn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow on Instagram @ozayn
            </a>
          </div>
        </div>

        {/* AI-Powered Search Box */}
        <div className="max-w-lg mx-auto mb-8">
          <div className="relative">
            {isAnalyzing ? (
              <Sparkles className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500 w-5 h-5 animate-pulse" />
            ) : (
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            )}
            <Input
              type="text"
              placeholder="Search photos: 'elegant wedding photos', 'vintage style', 'kids having fun'..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-12 py-3 w-full rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
            />
            {searchTerm && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="flex items-center gap-1 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                  <Sparkles className="w-3 h-3" />
                  AI
                </div>
              </div>
            )}
          </div>
          
          {searchTerm && (
            <div className="mt-2 space-y-1">
              <div className="text-sm text-gray-600 text-center">
                {filteredImages.length} photo{filteredImages.length !== 1 ? 's' : ''} found
              </div>
              {searchIntent && (
                <div className="text-xs text-purple-600 text-center italic">
                  "{searchIntent}"
                </div>
              )}
              {aiKeywords.length > 0 && (
                <div className="flex flex-wrap justify-center gap-1 mt-2">
                  {aiKeywords.slice(0, 5).map((keyword, index) => (
                    <span key={index} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Show search results or category grid */}
        {searchTerm ? (
          /* Search Results - Individual Photos with Masonry Layout */
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 mb-12">
            {filteredImages.map((image) => (
              <Card 
                key={image.id} 
                className="photo-card cursor-pointer hover:shadow-xl transition-all duration-300 mb-6 break-inside-avoid"
                onClick={() => handleImageClick(image)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    onError={(e) => {
                      console.log(`Image failed to load: ${image.src}`);
                      e.currentTarget.src = '/api/placeholder/400/600';
                    }}
                    loading="lazy"
                    className="w-full object-cover bg-gray-100 transition-transform duration-300 hover:scale-105"
                    style={{ 
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                      imageRendering: 'auto'
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-end">
                    <div className="p-4 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <h4 className="font-bold text-sm">{image.title}</h4>
                      <p className="text-xs">{getCategoryLabel(image.category)}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* Category Grid with Masonry Layout */
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 mb-12">
            {uniqueCategories.map((category) => {
              const representative = getCategoryRepresentative(category);
              if (!representative) return null;
              
              return (
                <Card 
                  key={category} 
                  className="category-tile cursor-pointer hover:shadow-xl transition-all duration-300 mb-6 break-inside-avoid"
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={representative.src} 
                      alt={getCategoryLabel(category)}
                      loading="lazy"
                      className="w-full object-cover transition-transform duration-300 hover:scale-105"
                      style={{ 
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        imageRendering: 'auto'
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="text-white text-xl font-bold mb-2">{getCategoryLabel(category)}</h3>
                        <p className="text-white text-sm">
                          {allPhotos.filter(img => img.category === category).length} photos
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Expanded Category View */}
        {selectedCategory && selectedCategory !== 'events' && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold" style={{ color: '#000000' }}>
                {getCategoryLabel(selectedCategory)}
              </h3>
              <button
                onClick={() => setSelectedCategory(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                style={{ color: '#000000' }}
              >
                Close
              </button>
            </div>
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6">
              {allPhotos
                .filter(img => img.category === selectedCategory)
                .map((image) => (
                  <Card 
                    key={image.id} 
                    className="gallery-item cursor-pointer hover:shadow-xl transition-all duration-300 mb-6 break-inside-avoid"
                    onClick={() => handleImageClick(image)}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={image.src} 
                        alt={image.title}
                        loading="lazy"
                        className="w-full object-cover bg-gray-100 transition-transform duration-300 hover:scale-105"
                        style={{ 
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover',
                          imageRendering: 'auto'
                        }}
                      />
                    </div>
                    <CardContent className="p-4 bg-white">
                      <h3 className="font-semibold mb-1" style={{ color: '#000000' }}>{image.title}</h3>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* Events Category View */}
        {selectedCategory === 'events' && !selectedEvent && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold" style={{ color: '#000000' }}>
                Events
              </h3>
              <button
                onClick={() => setSelectedCategory(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                style={{ color: '#000000' }}
              >
                Close
              </button>
            </div>
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6">
              {uniqueEvents.map((eventName) => {
                const representative = getEventRepresentative(eventName);
                if (!representative) return null;
                
                return (
                  <Card 
                    key={eventName} 
                    className="event-tile cursor-pointer hover:shadow-xl transition-all duration-300 mb-6 break-inside-avoid"
                    onClick={() => handleEventClick(eventName)}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={representative.src} 
                        alt={eventName}
                        loading="lazy"
                        className="w-full object-cover transition-transform duration-300 hover:scale-105"
                        style={{ 
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover',
                          imageRendering: 'auto'
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="text-center">
                          <h3 className="text-white text-xl font-bold mb-2">{eventName}</h3>
                          <p className="text-white text-sm">
                            {allPhotos.filter(img => 
                              img.category === 'events' && ((img as any).event === eventName || img.title === eventName)
                            ).length} photos
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Individual Event View */}
        {selectedEvent && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold" style={{ color: '#000000' }}>
                {selectedEvent}
              </h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                style={{ color: '#000000' }}
              >
                Back to Events
              </button>
            </div>
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6">
              {allPhotos
                .filter(img => 
                  img.category === 'events' && ((img as any).event === selectedEvent || img.title === selectedEvent)
                )
                .map((image) => (
                  <Card 
                    key={image.id} 
                    className="gallery-item cursor-pointer hover:shadow-xl transition-all duration-300 mb-6 break-inside-avoid"
                    onClick={() => handleImageClick(image)}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={image.src} 
                        alt={image.title}
                        loading="lazy"
                        className="w-full object-cover bg-gray-100 transition-transform duration-300 hover:scale-105"
                        style={{ 
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover',
                          imageRendering: 'auto'
                        }}
                      />
                    </div>
                    <CardContent className="p-4 bg-white">
                      <h3 className="font-semibold mb-1" style={{ color: '#000000' }}>{image.title}</h3>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
