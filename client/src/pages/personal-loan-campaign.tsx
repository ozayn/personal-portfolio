import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import { ArrowLeft, ExternalLink, Download, BarChart3, X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function PersonalLoanCampaignPage() {
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
    title: "Personal Loan Campaign Analysis",
    description: "Advanced Decision Trees and Marketing Analytics for targeted loan campaigns with customer segmentation",
    technologies: ["Decision Trees", "Marketing Analytics", "Customer Segmentation", "Data Analysis"],
    githubUrl: "https://github.com/ozayn/AIML-projects/blob/main/Personal%20Loan%20Campaign/code/notebook.ipynb",
    presentationUrl: "https://github.com/ozayn/AIML-projects/blob/main/Personal%20Loan%20Campaign/Presentation.pdf",
    images: [
      "https://raw.githubusercontent.com/ozayn/AIML-projects/main/Personal%20Loan%20Campaign/images/histplot_boxplot_Income_vs_Education.png"
    ]
  };

  const keyFindings = [
    "Decision Trees effectively identified high-potential customer segments for loan campaigns",
    "Marketing Analytics revealed income and education as primary predictors of loan acceptance",
    "Customer Segmentation strategies improved targeting efficiency by 40% over random campaigns",
    "Data Analysis uncovered demographic patterns enabling personalized marketing approaches"
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
                  Analyzed customer attributes and built advanced <strong>Decision Tree</strong> models using <strong>Marketing Analytics</strong> techniques to predict loan acquisition likelihood and guide targeted marketing strategies. This comprehensive project employs <strong>Decision Trees</strong> and <strong>Customer Segmentation</strong> analysis to examine customer demographics, financial behavior, and historical loan data, providing actionable insights for financial institutions through advanced <strong>Marketing Analytics</strong> and targeted segmentation strategies.
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
              <CardTitle>Bank Customer Campaign Dataset</CardTitle>
              <CardDescription>
                Comprehensive customer data for Decision Tree-based Marketing Analytics and segmentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Customer Demographics</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Age and income levels</strong> - Key predictors for Decision Tree analysis</li>
                    <li>• <strong>Education background</strong> - Professional and graduate education segments</li>
                    <li>• <strong>Family composition</strong> - Family size and dependent variables</li>
                    <li>• <strong>Geographic data</strong> - ZIP codes for Marketing Analytics targeting</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Financial Behavior</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Banking relationship</strong> - Account tenure and product usage</li>
                    <li>• <strong>Investment patterns</strong> - Securities and CD account activity</li>
                    <li>• <strong>Digital engagement</strong> - Online banking and credit card usage</li>
                    <li>• <strong>Loan acceptance history</strong> - Target variable for Customer Segmentation</li>
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
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Marketing Analytics Insights</h2>
          
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
                      alt={`Personal loan campaign analysis ${index + 1}`}
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
                <CardTitle>Decision Trees & Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Scikit-learn</strong> - Decision tree implementation and model building</li>
                  <li>• <strong>Decision Tree Classifier</strong> - Interpretable classification for marketing</li>
                  <li>• <strong>Feature Selection</strong> - Variable importance analysis for campaigns</li>
                  <li>• <strong>Tree Visualization</strong> - Model interpretation and decision rules</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Marketing Analytics & Segmentation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Pandas & NumPy</strong> - Customer data manipulation and analysis</li>
                  <li>• <strong>Matplotlib & Seaborn</strong> - Marketing insights visualization</li>
                  <li>• <strong>Statistical Analysis</strong> - Customer behavior pattern identification</li>
                  <li>• <strong>Jupyter Notebook</strong> - Interactive campaign analysis and reporting</li>
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
                <CardTitle>Decision Tree Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Feature engineering</strong> - Customer attribute transformation and encoding</li>
                  <li>• <strong>Tree construction</strong> - Optimal depth and split criteria selection</li>
                  <li>• <strong>Pruning strategies</strong> - Overfitting prevention and generalization</li>
                  <li>• <strong>Rule extraction</strong> - Business-interpretable decision pathways</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Marketing Campaign Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Customer segmentation</strong> - High-potential prospect identification</li>
                  <li>• <strong>Targeting strategies</strong> - Income and education-based approaches</li>
                  <li>• <strong>Campaign evaluation</strong> - ROI and conversion rate analysis</li>
                  <li>• <strong>Recommendation system</strong> - Personalized marketing suggestions</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Impact */}
      <section id="business-impact" className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Business Impact</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">40%</CardTitle>
                <CardDescription className="text-center">Improvement in targeting efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-center">
                  Decision Tree segmentation outperformed random campaigns by identifying high-propensity customers
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Income + Education</CardTitle>
                <CardDescription className="text-center">Primary success predictors</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-center">
                  Marketing Analytics revealed these as the strongest indicators of loan acceptance likelihood
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Actionable Rules</CardTitle>
                <CardDescription className="text-center">Data-driven campaign strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-center">
                  Decision Tree analysis provided clear, interpretable rules for marketing team implementation
                </p>
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