import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import { ArrowLeft, ExternalLink, Download, BarChart3, X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function PlantSeedlingClassificationPage() {
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
    title: "Plant Seedling Classification",
    description: "Advanced Computer Vision system using TensorFlow and Transfer Learning for precision agriculture",
    technologies: ["Computer Vision", "TensorFlow", "Transfer Learning", "Deep Learning"],
    githubUrl: "https://github.com/ozayn/AIML-projects/blob/main/Plant%20Seedling%20Classification/code/notebook.ipynb",
    presentationUrl: "https://github.com/ozayn/AIML-projects/blob/main/Plant%20Seedling%20Classification/Presentation.pdf",
    images: [
      "https://raw.githubusercontent.com/ozayn/AIML-projects/main/Plant%20Seedling%20Classification/images/prediction_sample_correct_wrong.png"
    ]
  };

  const keyFindings = [
    "TensorFlow deep learning framework successfully implemented for plant classification",
    "Transfer Learning from pre-trained models achieved high accuracy with limited data",
    "Computer Vision algorithms effectively distinguished between seedlings and weeds",
    "Deep Learning techniques enabled automated precision agriculture applications"
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
                  Built an advanced <strong>Computer Vision</strong> image classifier leveraging <strong>TensorFlow</strong> deep learning framework and <strong>Transfer Learning</strong> techniques to distinguish plant seedlings and weeds for agricultural applications. This precision agriculture system uses state-of-the-art <strong>Computer Vision</strong> algorithms and <strong>TensorFlow's</strong> neural network capabilities with <strong>Transfer Learning</strong> from pre-trained models to automate plant species classification for farmers.
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
              <CardTitle>Plant Seedling Image Dataset</CardTitle>
              <CardDescription>
                Comprehensive image collection for Computer Vision-based plant classification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Dataset Details</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Plant seedling images</strong> - High-resolution agricultural photos</li>
                    <li>• <strong>Weed classification images</strong> - Diverse weed species samples</li>
                    <li>• <strong>TensorFlow preprocessing</strong> - Image augmentation and normalization</li>
                    <li>• <strong>Transfer Learning data</strong> - Pre-trained model feature extraction</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Computer Vision Features</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Image classification</strong> - Multi-class plant species recognition</li>
                    <li>• <strong>Deep Learning models</strong> - CNN architecture implementation</li>
                    <li>• <strong>TensorFlow training</strong> - Model optimization and validation</li>
                    <li>• <strong>Transfer Learning accuracy</strong> - Performance evaluation metrics</li>
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
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Model Results</h2>
          
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
                      alt={`Plant seedling classification results ${index + 1}`}
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
                <CardTitle>Computer Vision & Deep Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>TensorFlow</strong> - Deep learning framework and neural networks</li>
                  <li>• <strong>Keras</strong> - High-level neural networks API with Transfer Learning</li>
                  <li>• <strong>OpenCV</strong> - Computer Vision and image processing</li>
                  <li>• <strong>Scikit-learn</strong> - Machine learning utilities and preprocessing</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Processing & Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>NumPy</strong> - Numerical computing and matrix operations</li>
                  <li>• <strong>Pandas</strong> - Data manipulation and analysis</li>
                  <li>• <strong>Matplotlib</strong> - Data visualization and plotting</li>
                  <li>• <strong>Seaborn</strong> - Statistical visualization and model evaluation</li>
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