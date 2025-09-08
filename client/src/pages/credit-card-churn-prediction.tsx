import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import { ArrowLeft, ExternalLink, Download, BarChart3, X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function CreditCardChurnPredictionPage() {
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
    title: "Credit Card User Churn Prediction",
    description: "Advanced Ensemble Learning using Random Forest, AdaBoost, SMOTE oversampling, and Hyperparameter Tuning",
    technologies: ["Ensemble Learning", "Random Forest", "AdaBoost", "SMOTE", "Hyperparameter Tuning"],
    githubUrl: "https://github.com/ozayn/AIML-projects/blob/main/Credit%20Card%20User%20Churn%20Prediction/code/notebook.ipynb",
    presentationUrl: "https://github.com/ozayn/AIML-projects/blob/main/Credit%20Card%20User%20Churn%20Prediction/Presentation.pdf",
    images: [
      "https://raw.githubusercontent.com/ozayn/AIML-projects/main/Credit%20Card%20User%20Churn%20Prediction/images/pairplot_categorical.png"
    ]
  };

  const keyFindings = [
    "Ensemble Learning with AdaBoost achieved optimal recall performance for churn detection",
    "SMOTE oversampling effectively addressed class imbalance in 84% retained customers dataset",
    "Hyperparameter Tuning improved model performance while minimizing overfitting",
    "Feature Engineering identified transaction count and credit utilization as key churn indicators"
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
                  Built an advanced predictive model for Thera Bank to classify churn behavior using <strong>Ensemble Learning</strong> methods including <strong>Random Forest</strong>, <strong>AdaBoost</strong>, and <strong>Gradient Boosting</strong> with <strong>SMOTE oversampling</strong> and comprehensive <strong>Hyperparameter Tuning</strong>. This machine learning project addresses class imbalance in credit card customer data to identify high-risk customers early and enable proactive retention strategies.
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
              <CardTitle>Thera Bank Credit Card Customer Dataset</CardTitle>
              <CardDescription>
                Comprehensive customer behavior analysis for Ensemble Learning-based churn prediction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Dataset Characteristics</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>10,127 customer records</strong> - Historical credit card data</li>
                    <li>• <strong>24 feature variables</strong> - Demographics, financial, and behavioral</li>
                    <li>• <strong>16% churn rate</strong> - Class imbalance addressed with SMOTE</li>
                    <li>• <strong>3,380 missing values</strong> - Handled with preprocessing techniques</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features for Ensemble Learning</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Transaction patterns</strong> - Count, amount, frequency analysis</li>
                    <li>• <strong>Credit utilization</strong> - Limit, balance, utilization ratios</li>
                    <li>• <strong>Customer demographics</strong> - Age, income, education level</li>
                    <li>• <strong>Account behavior</strong> - Tenure, card category, relationship</li>
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
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Visualizations</h2>
          
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
                      alt={`Credit card churn analysis ${index + 1}`}
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
                <CardTitle>Ensemble Learning & Machine Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Scikit-learn</strong> - Ensemble methods and machine learning algorithms</li>
                  <li>• <strong>Imbalanced-learn</strong> - SMOTE oversampling and class balancing</li>
                  <li>• <strong>Random Forest</strong> - Ensemble learning with bagging technique</li>
                  <li>• <strong>AdaBoost</strong> - Adaptive boosting ensemble method</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Analysis & Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Pandas & NumPy</strong> - Data manipulation and numerical analysis</li>
                  <li>• <strong>Matplotlib & Seaborn</strong> - Statistical visualization and EDA</li>
                  <li>• <strong>GridSearchCV</strong> - Hyperparameter tuning and model optimization</li>
                  <li>• <strong>Jupyter Notebook</strong> - Interactive development and analysis</li>
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
                <CardTitle>Data Preprocessing & Feature Engineering</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Missing value imputation</strong> - Most frequent value strategy</li>
                  <li>• <strong>Feature selection</strong> - Removed collinear and outlier-heavy features</li>
                  <li>• <strong>Correlation analysis</strong> - Identified relationships between variables</li>
                  <li>• <strong>Class balancing</strong> - SMOTE oversampling for minority class</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Model Selection & Evaluation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Ensemble methods comparison</strong> - AdaBoost, Gradient Boosting, Random Forest</li>
                  <li>• <strong>Hyperparameter tuning</strong> - GridSearchCV with validation recall</li>
                  <li>• <strong>Recall optimization</strong> - Prioritized to minimize false negatives</li>
                  <li>• <strong>Overfitting prevention</strong> - Cross-validation and regularization</li>
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