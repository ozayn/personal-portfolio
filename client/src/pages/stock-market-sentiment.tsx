import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import { ArrowLeft, ExternalLink, Download, BarChart3, X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function StockMarketSentimentPage() {
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
    title: "Stock Market News Sentiment Analysis",
    description: "AI-driven system using LLMs, Transformers, and Prompt Engineering to extract market sentiment from financial news articles",
    technologies: ["NLP", "LLMs", "Transformers", "Prompt Engineering"],
    githubUrl: "https://github.com/ozayn/AIML-projects/tree/main/Stock%20Market%20News%20Sentiment%20Analysis%20%26%20Summarization",
    presentationUrl: "https://github.com/ozayn/AIML-projects/blob/main/Stock%20Market%20News%20Sentiment%20Analysis%20%26%20Summarization/Presentation.pdf",
    images: [
      "https://raw.githubusercontent.com/ozayn/AIML-projects/main/Stock%20Market%20News%20Sentiment%20Analysis%20%26%20Summarization/images/label_distribution.png",
      "https://raw.githubusercontent.com/ozayn/AIML-projects/main/Stock%20Market%20News%20Sentiment%20Analysis%20%26%20Summarization/images/histplot_boxplot_News%20Length_vs_Label.png"
    ]
  };

  const keyFindings = [
    "LLMs successfully implemented for automated sentiment extraction from financial news",
    "Transformers architecture optimized for market sentiment classification",
    "Prompt Engineering techniques fine-tuned for financial context analysis",
    "NLP preprocessing pipeline enhanced accuracy of sentiment predictions"
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
                  Built an AI-driven system leveraging <strong>Large Language Models (LLMs)</strong>, <strong>Transformers</strong>, and <strong>Prompt Engineering</strong> to extract and summarize market sentiment from financial news articles. The <strong>NLP</strong> system processes news content through advanced preprocessing pipelines, utilizing state-of-the-art Transformers architecture for sentiment classification and custom Prompt Engineering strategies to optimize LLM performance for financial context understanding.
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
              <CardTitle>Financial News Dataset</CardTitle>
              <CardDescription>
                Comprehensive collection of financial news articles for sentiment analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Dataset Details</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Financial news articles</strong> - Diverse sources processed with NLP techniques</li>
                    <li>• <strong>Market sentiment labels</strong> - LLM-generated sentiment classifications</li>
                    <li>• <strong>Transformers preprocessing</strong> - Tokenized content optimized for model input</li>
                    <li>• <strong>Prompt Engineering data</strong> - Structured prompts for LLM interactions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Analysis Features</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>NLP text analysis</strong> - Article length vs sentiment correlation patterns</li>
                    <li>• <strong>LLM classification</strong> - Sentiment label distribution analysis</li>
                    <li>• <strong>Transformers integration</strong> - Deep learning architecture implementation</li>
                    <li>• <strong>Prompt Engineering optimization</strong> - Strategic LLM interaction design</li>
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
                      alt={`Stock market sentiment analysis visualization ${index + 1}`}
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
                <CardTitle>NLP & LLM Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Transformers</strong> - Hugging Face library for LLMs and NLP models</li>
                  <li>• <strong>PyTorch/TensorFlow</strong> - Deep learning frameworks for model training</li>
                  <li>• <strong>NLTK/SpaCy</strong> - Natural language processing and tokenization</li>
                  <li>• <strong>OpenAI API</strong> - Large Language Models integration and prompt engineering</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Analysis & Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Pandas & NumPy</strong> - Data manipulation and numerical computing</li>
                  <li>• <strong>Matplotlib & Seaborn</strong> - Data visualization and statistical plotting</li>
                  <li>• <strong>Scikit-learn</strong> - Machine learning utilities and evaluation metrics</li>
                  <li>• <strong>Requests</strong> - API integration for news data collection</li>
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