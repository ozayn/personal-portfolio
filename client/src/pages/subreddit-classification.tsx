import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import { ArrowLeft, ExternalLink, Download, BarChart3, X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function SubredditClassificationPage() {
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
    title: "Subreddit Classification",
    description: "NLP-powered wellness program recommendation system classifying Yoga and Meditation texts with 88% accuracy",
    technologies: ["NLP", "Text Classification", "Machine Learning", "Python", "TF-IDF", "Naive Bayes"],
    githubUrl: "https://github.com/ozayn/subreddit_classification_nlp",
    presentationUrl: "https://github.com/ozayn/subreddit_classification_nlp/blob/main/presentation/Project_3_presentation_Azin.pdf",
    images: [
      "https://ozayn.github.io/images/project2/character_word_count_dist_title_content.png",
      "https://ozayn.github.io/images/project2/top_occurring_ngram_1_2.png"
    ]
  };

  const keyFindings = [
    "Achieved 88% accuracy in distinguishing Yoga vs Meditation practitioners",
    "TF-IDF vectorization effectively captured text pattern differences",
    "Multinomial Naive Bayes and Random Forest provided complementary insights",
    "Personality-based recommendations enabled for corporate wellness programs"
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
                  Presentation
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
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  Objective
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Applied natural language processing to classify texts from Yoga and Meditation subreddits to develop a wellness program recommendation system. This project uses advanced NLP techniques including TF-IDF vectorization, Multinomial Naive Bayes, and Random Forest classification to analyze text patterns and personality types, providing valuable insights for corporate wellness programs and employee personality-based recommendations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Findings</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  {keyFindings.map((finding, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                      {finding}
                    </li>
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
              <CardTitle>Reddit Text Data</CardTitle>
              <CardDescription>
                Comprehensive text analysis from Yoga and Meditation subreddit communities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Dataset Details</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Yoga subreddit posts</strong> - Community discussions and content</li>
                    <li>• <strong>Meditation subreddit posts</strong> - Mindfulness-focused conversations</li>
                    <li>• <strong>Text preprocessing</strong> - Cleaned and tokenized content</li>
                    <li>• <strong>Character and word counts</strong> - Length distribution analysis</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Text Analysis Features</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>N-gram analysis</strong> - Unigram and bigram patterns</li>
                    <li>• <strong>TF-IDF vectorization</strong> - Term frequency analysis</li>
                    <li>• <strong>Content distribution</strong> - Title vs content patterns</li>
                    <li>• <strong>Personality indicators</strong> - Wellness behavior classification</li>
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
                      alt={`Subreddit classification analysis visualization ${index + 1}`}
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
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Natural Language Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>NLTK</strong> - Natural language processing and text preprocessing</li>
                  <li>• <strong>Scikit-learn</strong> - TF-IDF vectorization and machine learning models</li>
                  <li>• <strong>PRAW</strong> - Python Reddit API wrapper for data collection</li>
                  <li>• <strong>RegEx</strong> - Text cleaning and pattern matching</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Machine Learning & Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Pandas & NumPy</strong> - Data manipulation and numerical analysis</li>
                  <li>• <strong>Matplotlib & Seaborn</strong> - Statistical visualization and plotting</li>
                  <li>• <strong>Jupyter Notebook</strong> - Interactive data analysis environment</li>
                  <li>• <strong>Pickle</strong> - Model serialization and deployment</li>
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