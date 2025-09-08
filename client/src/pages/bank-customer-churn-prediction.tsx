import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import { ArrowLeft, ExternalLink, Download, BarChart3, X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function BankCustomerChurnPredictionPage() {
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
    title: "Bank Customer Churn Prediction",
    description: "Deep Learning with Neural Networks, TensorFlow, and Keras for advanced customer behavior analysis",
    technologies: ["Neural Networks", "TensorFlow", "Keras", "Deep Learning"],
    githubUrl: "https://github.com/ozayn/AIML-projects/blob/main/Bank%20Customer%20Churn%20Prediction/code/notebook.ipynb",
    presentationUrl: "https://github.com/ozayn/AIML-projects/blob/main/Bank%20Customer%20Churn%20Prediction/Presentation.pdf",
    images: [
      "https://raw.githubusercontent.com/ozayn/AIML-projects/main/Bank%20Customer%20Churn%20Prediction/images/heatmap_corr_categorical_corner.png"
    ]
  };

  const keyFindings = [
    "Neural Networks with TensorFlow achieved superior performance in customer churn prediction",
    "Deep Learning techniques effectively identified complex behavioral patterns in customer data",
    "Keras high-level API enabled efficient neural network architecture design and training",
    "TensorFlow's optimization algorithms improved model convergence and prediction accuracy"
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
                  Developed an advanced artificial <strong>Neural Network</strong> from scratch using <strong>TensorFlow</strong> and <strong>Keras</strong> to identify high-risk churn customers through sophisticated <strong>Deep Learning</strong> techniques. This predictive modeling project leverages <strong>Neural Networks</strong> and <strong>TensorFlow's</strong> deep learning capabilities to analyze customer behavior patterns and demographic data, enabling proactive customer retention strategies through advanced <strong>Deep Learning</strong> algorithms.
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
              <CardTitle>Bank Customer Behavior Dataset</CardTitle>
              <CardDescription>
                Comprehensive customer analysis for Neural Network-based churn prediction using Deep Learning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Dataset Features</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Customer demographics</strong> - Age, gender, geography for Neural Network input</li>
                    <li>• <strong>Account information</strong> - Tenure, balance, products for Deep Learning analysis</li>
                    <li>• <strong>Behavioral patterns</strong> - Activity levels and engagement metrics</li>
                    <li>• <strong>Financial indicators</strong> - Credit scores and salary data for TensorFlow processing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Deep Learning Applications</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Neural Network training</strong> - Multi-layer perceptron architecture</li>
                    <li>• <strong>TensorFlow optimization</strong> - Advanced gradient descent algorithms</li>
                    <li>• <strong>Keras model building</strong> - High-level neural network construction</li>
                    <li>• <strong>Deep Learning validation</strong> - Cross-validation and performance metrics</li>
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
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Neural Network Analysis</h2>
          
          <div className="grid md:grid-cols-1 gap-6 mb-8">
            {projectData.images.map((image, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div 
                    className="relative cursor-pointer group"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={`Bank customer churn analysis ${index + 1}`}
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
                <CardTitle>Deep Learning & Neural Networks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>TensorFlow</strong> - Deep learning framework for neural network implementation</li>
                  <li>• <strong>Keras</strong> - High-level neural networks API and model building</li>
                  <li>• <strong>Neural Networks</strong> - Multi-layer perceptron architecture design</li>
                  <li>• <strong>Deep Learning</strong> - Advanced pattern recognition and optimization</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Processing & Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Pandas & NumPy</strong> - Data manipulation and numerical computations</li>
                  <li>• <strong>Matplotlib & Seaborn</strong> - Data visualization and statistical analysis</li>
                  <li>• <strong>Scikit-learn</strong> - Data preprocessing and model evaluation</li>
                  <li>• <strong>Jupyter Notebook</strong> - Interactive development and experimentation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section id="methodology" className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Methodology</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Neural Network Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Input layer design</strong> - Customer feature engineering for neural networks</li>
                  <li>• <strong>Hidden layer optimization</strong> - Deep learning architecture tuning</li>
                  <li>• <strong>Activation functions</strong> - ReLU and sigmoid for optimal performance</li>
                  <li>• <strong>Output layer configuration</strong> - Binary classification for churn prediction</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>TensorFlow Implementation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Model compilation</strong> - Loss function and optimizer selection</li>
                  <li>• <strong>Training process</strong> - Batch processing and epoch optimization</li>
                  <li>• <strong>Keras callbacks</strong> - Early stopping and learning rate scheduling</li>
                  <li>• <strong>Performance evaluation</strong> - Accuracy, precision, recall metrics</li>
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