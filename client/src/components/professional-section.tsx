import { useState } from "react";
import { personalInfo, projects, experience, education, skills } from "@/data/portfolio-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { 
  Github, 
  Linkedin,
  PenTool,
  GraduationCap, 
  Download,
  TrendingUp,
  Sprout,
  Brain,
  Network,
  MessageCircle,
  Utensils,
  GitBranch,
  TreePine,
  Eye,
  Map
} from "lucide-react";

const getProjectIcon = (iconName: string) => {
  const icons = {
    'chart-line': TrendingUp,
    'seedling': Sprout,
    'brain': Brain,
    'network-wired': GitBranch,
    'comments': MessageCircle,
    'utensils': Utensils,
    'tree-pine': TreePine,
    'eye': Eye,
    'map': Map,
  };
  return icons[iconName as keyof typeof icons] || TrendingUp;
};

const getProjectGradient = (category: string) => {
  const gradients = {
    'nlp': 'from-blue-300 to-blue-400',
    'computer-vision': 'from-emerald-300 to-emerald-400',
    'deep-learning': 'from-violet-300 to-violet-400',
    'ensemble-learning': 'from-orange-300 to-orange-400',
    'marketing-analytics': 'from-teal-300 to-teal-400',
    'text-classification': 'from-indigo-300 to-indigo-400',
    'exploratory-analysis': 'from-yellow-300 to-yellow-400',
    'business-analytics': 'from-pink-300 to-pink-400',
    'graph-theory': 'from-red-300 to-red-400',
  };
  return gradients[category as keyof typeof gradients] || 'from-slate-400 to-slate-500';
};

export default function ProfessionalSection() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const downloadResume = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Azin_Faghihi_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleProjectClick = (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    
    // Check if project has a custom detail page URL
    if (project?.detailPageUrl) {
      setLocation(project.detailPageUrl);
    } else {
      setLocation(`/project/${projectId}`);
    }
  };

  // Project categories based on data science expertise areas
  const projectCategories = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'nlp', label: 'NLP & LLMs', count: projects.filter(p => p.category === 'nlp').length },
    { id: 'computer-vision', label: 'Computer Vision', count: projects.filter(p => p.category === 'computer-vision').length },
    { id: 'deep-learning', label: 'Deep Learning', count: projects.filter(p => p.category === 'deep-learning').length },
    { id: 'ensemble-learning', label: 'Ensemble Learning', count: projects.filter(p => p.category === 'ensemble-learning').length },
    { id: 'marketing-analytics', label: 'Marketing Analytics', count: projects.filter(p => p.category === 'marketing-analytics').length },
    { id: 'text-classification', label: 'Text Classification', count: projects.filter(p => p.category === 'text-classification').length },
    { id: 'exploratory-analysis', label: 'Exploratory Analysis', count: projects.filter(p => p.category === 'exploratory-analysis').length },
    { id: 'business-analytics', label: 'Business Analytics', count: projects.filter(p => p.category === 'business-analytics').length },
    { id: 'graph-theory', label: 'Graph Theory', count: projects.filter(p => p.category === 'graph-theory').length },
  ].filter(cat => cat.count > 0 || cat.id === 'all');

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="professional" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Professional Portfolio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Data science expertise with a focus on machine learning, neural networks, and behavioral analytics
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-50 rounded-xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center">
              <Github className="text-secondary text-2xl mr-3" />
              <div>
                <a 
                  href={personalInfo.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium text-secondary hover:text-blue-700"
                >
                  GitHub
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Linkedin className="text-secondary text-2xl mr-3" />
              <div>
                <a 
                  href={personalInfo.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium text-secondary hover:text-blue-700"
                >
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <PenTool className="text-secondary text-2xl mr-3" />
              <div>
                <a 
                  href={personalInfo.medium} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium text-secondary hover:text-blue-700"
                >
                  Medium
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary mb-8">Featured Projects</h3>
          
          {/* Project Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {projectCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const IconComponent = getProjectIcon(project.icon);
              const gradient = getProjectGradient(project.category);
              
              return (
                <Card 
                  key={project.id} 
                  className="hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
                  onClick={() => handleProjectClick(project.id)}
                >
                  <div className={`h-48 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                    <IconComponent size={64} className="text-white" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-sm bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProjectClick(project.id);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary mb-8">Professional Experience</h3>
          <div className="space-y-8">
            {experience.map((exp) => (
              <Card key={exp.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle className="text-xl text-primary">{exp.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {exp.company}, {exp.location}
                      </CardDescription>
                    </div>
                    <p className="text-gray-500 mt-2 md:mt-0">{exp.period}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  {exp.bullets && (
                    <ul className="text-gray-700 mb-4 space-y-2">
                      {exp.bullets.map((bullet, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-secondary mr-2 mt-1.5 text-sm">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-sm bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary mb-8">Education</h3>
          <div className="space-y-6">
            {education.map((edu, index) => {
              // Parse degree level and subject
              const degreeMatch = edu.degree.match(/^(Ph\.D\.|M\.S\.|B\.S\.)\s*(.+)/);
              const degreeLevel = degreeMatch ? degreeMatch[1] : '';
              const subject = degreeMatch ? degreeMatch[2] : edu.degree;
              
              // Parse field and minor from details
              const parseDetails = (details: string) => {
                if (!details) return { field: null, minor: null };
                
                const fieldMatch = details.match(/Field:\s*([^,;-]+)/i);
                const minorMatch = details.match(/Minor:\s*([^,;-]+)/i);
                
                return {
                  field: fieldMatch ? fieldMatch[1].trim() : null,
                  minor: minorMatch ? minorMatch[1].trim() : null
                };
              };
              
              const { field, minor } = parseDetails(edu.details);
              
              return (
                <Card key={edu.id} className="hover:shadow-lg transition-all duration-300 border border-gray-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      {/* Left side - Degree information */}
                      <div className="flex items-start space-x-4 flex-grow">
                        <div className="flex-shrink-0">
                          {/* Simple degree level badge */}
                          <div className="w-16 h-16 bg-gray-50 border-2 border-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-sm font-bold text-gray-700 leading-tight text-center">
                              {degreeLevel}
                            </span>
                          </div>
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex flex-col lg:flex-row lg:items-baseline lg:space-x-4 mb-2">
                            <h4 className="text-xl font-bold text-primary mb-1 lg:mb-0">
                              {subject}
                            </h4>
                            <span className="text-lg font-semibold text-gray-700">
                              {edu.school}
                            </span>
                          </div>
                          
                          {/* Field and Minor Information */}
                          {(field || minor) && (
                            <div className="grid sm:grid-cols-2 gap-3 mt-3">
                              {field && (
                                <div className="flex items-start text-sm">
                                  <span className="font-semibold text-gray-700 mr-2 min-w-fit">Field:</span>
                                  <span className="text-gray-600">{field}</span>
                                </div>
                              )}
                              {minor && (
                                <div className="flex items-start text-sm">
                                  <span className="font-semibold text-gray-700 mr-2 min-w-fit">Minor:</span>
                                  <span className="text-gray-600">{minor}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Right side - Period */}
                      <div className="flex-shrink-0 text-right ml-4">
                        <div className="bg-gray-100 px-3 py-1 rounded-lg">
                          <span className="text-sm font-medium text-gray-600">{edu.period}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary mb-8">Technical Skills</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <Card key={category} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-sm bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Download Resume Button */}
        <div className="text-center">
          <Button 
            onClick={downloadResume}
            size="lg"
            className="bg-secondary hover:bg-blue-700"
          >
            <Download className="mr-2" size={20} />
            Download Resume
          </Button>
        </div>
      </div>
    </section>
  );
}
