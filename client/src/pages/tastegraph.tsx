import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import { ArrowLeft, ExternalLink, Download, CheckCircle2, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function TasteGraphPage() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { root: null, rootMargin: "-50px", threshold: 0.1 }
    );
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const projectData = {
    title: "TasteGraph",
    description: "A personal taste analytics application that turns ratings and watch history into interactive visual insights about genres, countries, and viewing patterns.",
    technologies: ["Next.js", "TypeScript", "React", "PostgreSQL", "Data Visualization", "Analytics", "Tailwind"],
    githubUrl: "https://github.com/ozayn/tastegraph",
    liveUrl: "https://tastegraph.ozayn.com",
  };

  const keyFeatures = [
    "Interactive visual insights for genres, countries, and viewing patterns",
    "Clean analytics UI with summary views, breakdowns, and narrative insights",
    "Taste-oriented modules that combine ratings + history for richer context",
    "Filters and comparisons to explore personal taste evolution over time",
  ];

  const implementation = [
    "Next.js + TypeScript frontend with Tailwind for polished, responsive layouts",
    "PostgreSQL-backed structured ratings and watch-history schema",
    "Data visualization modules for genre splits, geography, time-based trends",
    "Product-focused UX with cards, summaries, and insight callouts",
  ];

  const future = [
    "Add similarity-based recommendations and taste clusters",
    "Import pipelines for more streaming providers",
    "Shareable taste snapshots with privacy controls",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} />

      {/* Hero */}
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
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
                <BarChart3 className="h-7 w-7" />
              </div>
            </div>
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
                <a href={projectData.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section id="overview" className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
              <CardDescription>Personal taste analytics with structured ratings, summaries, and visual storytelling.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Built a clean, modern analytics experience for exploring entertainment preferences through structured ratings data, summary views, visual breakdowns, and taste-oriented insight modules. Emphasize product thinking, frontend polish, and data storytelling.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {keyFeatures.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Implementation Highlights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {implementation.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Future Directions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {future.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
