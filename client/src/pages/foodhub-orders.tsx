import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import { ArrowLeft, ExternalLink, Download, BarChart3, X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function FoodHubOrdersPage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const projectData = {
    title: "FoodHub Orders",
    description: "Comprehensive EDA on restaurant orders to uncover demand patterns and business optimization recommendations",
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    githubUrl: "https://github.com/ozayn/AIML-projects/blob/main/FoodHub/code/notebook.ipynb",
    presentationUrl: "https://github.com/ozayn/AIML-projects/blob/main/FoodHub/Presentation.pdf",
    images: [
      "https://raw.githubusercontent.com/ozayn/AIML-projects/main/FoodHub/images/histplot_cost_of_the_order.png",
      "https://raw.githubusercontent.com/ozayn/AIML-projects/main/FoodHub/images/boxplot_cuisine_type_food_preparation_time.png"
    ]
  };

  const keyFindings = [
    "70% of orders placed on weekends, 30% on weekdays",
    "40% of orders are not rated, affecting feedback quality",
    "Average order cost: $16.5 with 29% costing more than $20",
    "Italian cuisine has highest preparation time, Korean lowest"
  ];

  const recommendations = [
    "Encourage customers to leave reviews to increase their chances of receiving more discount vouchers - particularly important for Japanese and Italian cuisines, which currently have the highest proportion of unrated orders",
    "Reduce the total time and consider weekend/weekday deliveries more carefully",
    "If possible, reduce the preparation time for the Italian and Thai restaurants",
    "If possible, reduce the delivery time on weekdays (currently 6 minutes longer than weekends)",
    "Hire more help during the weekends for the higher number of orders (70% of orders occur on weekends)"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} />
      
      {/* Hero Section */}
      <section id="hero" className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Portfolio
              </Button>
            </Link>
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
              {projectData.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              {projectData.description}
            </p>
            
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {projectData.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild>
                <a href={projectData.githubUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Code
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={projectData.presentationUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  Download Presentation
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section id="overview" className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Project Overview</h2>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Problem Statement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                FoodHub is a food aggregator app connecting users to multiple restaurants through a single platform. With the growing number of restaurants in New York and busy professionals relying on food delivery, FoodHub wants to analyze customer order data to understand demand patterns and improve customer experience.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Dataset Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>1,898 rows, 9 columns</strong> - comprehensive order data</li>
                  <li>• <strong>1,200 unique customers</strong> across the platform</li>
                  <li>• <strong>178 restaurants</strong> in 14 cuisine types</li>
                  <li>• <strong>No null values</strong> - clean dataset</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Findings</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  {keyFindings.map((finding, index) => (
                    <li key={index}>• {finding}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section id="data-sources" className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Data Sources</h2>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>FoodHub Order Dataset</CardTitle>
              <CardDescription>
                Comprehensive restaurant order data from FoodHub's platform in New York
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Dataset Details</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>1,898 total orders</strong> - Complete transaction records</li>
                    <li>• <strong>1,200 unique customers</strong> - Diverse customer base</li>
                    <li>• <strong>178 restaurants</strong> - Wide restaurant coverage</li>
                    <li>• <strong>14 cuisine types</strong> - Varied food categories</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Data Attributes</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Order details</strong> - Cost, delivery time, preparation time</li>
                    <li>• <strong>Customer ratings</strong> - Feedback and satisfaction scores</li>
                    <li>• <strong>Restaurant info</strong> - Cuisine type, location data</li>
                    <li>• <strong>Temporal data</strong> - Order timing (weekday/weekend)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Visualizations */}
      <section id="visualizations" className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Data Visualizations</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {projectData.images.map((image, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div 
                    className="relative cursor-pointer group"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={`FoodHub analysis visualization ${index + 1}`}
                      className="w-full rounded-lg shadow-md group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center rounded-lg">
                      <div className="bg-white/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <ZoomIn className="h-6 w-6 text-gray-800" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section id="tools" className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Tools & Technologies</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Data Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Python</strong> - Primary programming language for analysis</li>
                  <li>• <strong>Pandas</strong> - Data manipulation and analysis library</li>
                  <li>• <strong>NumPy</strong> - Numerical computing and array operations</li>
                  <li>• <strong>Jupyter Notebook</strong> - Interactive development environment</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Matplotlib</strong> - Comprehensive plotting library</li>
                  <li>• <strong>Seaborn</strong> - Statistical data visualization</li>
                  <li>• <strong>Histograms & Box plots</strong> - Distribution analysis</li>
                  <li>• <strong>Statistical charts</strong> - Pattern identification</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg"
            >
              <X className="h-5 w-5 text-gray-800" />
            </button>
            <img
              src={selectedImage}
              alt="Full size visualization"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}