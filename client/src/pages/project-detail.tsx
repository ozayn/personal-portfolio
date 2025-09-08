import { useParams, useLocation } from "wouter";
import { useState } from "react";
import { projects } from "@/data/portfolio-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, X } from "lucide-react";

export default function ProjectDetail() {
  const [, setLocation] = useLocation();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const project = projects.find(p => p.id === parseInt(id || "0"));
  
  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Project Not Found</h1>
          <Button onClick={() => setLocation("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-background/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Button 
              variant="outline" 
              onClick={() => setLocation("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Button>
            <h1 className="text-xl font-semibold text-primary">Project Details</h1>
          </div>
        </div>
      </nav>

      {/* Project Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">{project.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Project Images */}
        {project.images && project.images.length > 0 && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Project Visualizations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.map((image, index) => (
                  <div key={index} className="relative cursor-pointer group">
                    <img 
                      src={image} 
                      alt={`${project.title} visualization ${index + 1}`}
                      className="w-full h-auto rounded-lg border bg-white transition-transform duration-200 group-hover:scale-105"
                      onClick={() => setSelectedImage(image)}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Project Details */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {project.overview || project.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technical Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* <div>
                  <h4 className="font-semibold text-primary mb-2">Key Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Feature 1 - to be customized</li>
                    <li>• Feature 2 - to be customized</li>
                    <li>• Feature 3 - to be customized</li>
                  </ul>
                </div> */}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          {project.presentationUrl ? (
            <Button 
              className="flex items-center gap-2"
              onClick={() => window.open(project.presentationUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
              View Presentation
            </Button>
          ) : (
            <Button disabled className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Live Demo (Coming Soon)
            </Button>
          )}
          {project.githubUrl && (
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => window.open(project.githubUrl, '_blank')}
            >
              <Github className="h-4 w-4" />
              View Code
            </Button>
          )}
        </div>

        {/* Note for future customization */}
        {/* <Card className="mt-8 bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center">
              This is a template for project details. You can customize the content, add images, 
              detailed descriptions, code snippets, and project outcomes specific to each project.
            </p>
          </CardContent>
        </Card> */}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X className="h-6 w-6" />
            </Button>
            <img 
              src={selectedImage} 
              alt="Project visualization enlarged"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}