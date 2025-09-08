import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import { ArrowLeft, ExternalLink, Download, BarChart3, X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function StandardizedTestAnalysisPage() {
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
    title: "Standardized Test Analysis",
    description: "Geospatial analysis comparing state SAT/ACT averages to college admission requirements with interactive mapping",
    technologies: ["Python", "GeoPandas", "Matplotlib", "Seaborn", "MapClassify"],
    githubUrl: "https://github.com/ozayn/AIML-projects/blob/main/Standardized%20Test%20Analysis/code/notebook.ipynb",
    presentationUrl: "https://github.com/ozayn/AIML-projects/blob/main/Standardized%20Test%20Analysis/Presentation.pdf",
    images: [
      "https://raw.githubusercontent.com/ozayn/AIML-projects/main/Standardized%20Test%20Analysis/images/all_universities_map.png",
      "https://raw.githubusercontent.com/ozayn/AIML-projects/main/Standardized%20Test%20Analysis/images/sat_participation_and_top_ranking_map.png",
      "https://raw.githubusercontent.com/ozayn/AIML-projects/main/Standardized%20Test%20Analysis/images/act_participation_and_top_ranking_map.png",
      "https://raw.githubusercontent.com/ozayn/AIML-projects/main/Standardized%20Test%20Analysis/images/sat_higher_than_average_min_req.png"
    ]
  };

  const keyFindings = [
    "Several states have SAT requirements higher than state averages",
    "Geographic clustering of high-performing states in the Northeast",
    "Significant variations in test participation rates across regions",
    "Top-ranked universities concentrated in specific geographic areas"
  ];

  const recommendations = [
    "States with SAT averages below college requirements should implement targeted test preparation programs to bridge the performance gap",
    "Geographic clustering analysis shows northeastern states perform better - establish regional partnerships for best practice sharing",
    "Significant variations in test participation rates across regions suggest need for standardized participation policies",
    "Universities in high-performing geographic clusters could expand outreach to underrepresented regions to increase diversity",
    "State education departments should align curriculum standards with standardized test requirements in their region"
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
                Figure out how the minimum college SAT/ACT requirements compare to the average of those scores in each state. 
                In case the minimum requirement is higher than the state average, suggest solutions or further studies. This project 
                analyzes 2017-2019 SAT and ACT scores by state, along with college admission requirements data, using GeoPandas 
                for advanced geospatial visualization to map and compare state performance against college requirements.
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
                  <li>• <strong>2017-2019 data</strong> - 3 years of comprehensive test scores</li>
                  <li>• <strong>All US states</strong> - complete geographical coverage</li>
                  <li>• <strong>SAT and ACT scores</strong> - dual standardized test analysis</li>
                  <li>• <strong>College requirements</strong> - admission threshold data</li>
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
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Test Score Data</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>act_2017.csv, act_2018.csv, act_2019.csv</strong> - ACT scores by state for 2017-2019</li>
                  <li>• <strong>sat_2017.csv, sat_2018.csv, sat_2019.csv</strong> - SAT scores by state for 2017-2019</li>
                  <li>• <strong>State participation rates</strong> - Percentage of students taking each test</li>
                  <li>• <strong>Mean composite scores</strong> - Average performance by state</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>College Requirements Data</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>sat_act_by_college.csv</strong> - Accepted score ranges by colleges</li>
                  <li>• <strong>Top 100 US universities ranking</strong> - Institution rankings and requirements</li>
                  <li>• <strong>Geographic coordinates</strong> - University locations for mapping</li>
                  <li>• <strong>Admission thresholds</strong> - Minimum required scores by institution</li>
                </ul>
              </CardContent>
            </Card>
          </div>
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
                      alt={`Standardized test analysis visualization ${index + 1}`}
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