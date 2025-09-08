import { personalInfo } from "@/data/portfolio-data";
import { Button } from "@/components/ui/button";
import profilePicture from "@assets/profile picture_1751738885313.jpg";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="pt-16 gradient-bg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {personalInfo.title} & Photographer
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {personalInfo.about}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => scrollToSection('professional')}
                size="lg"
                className="bg-secondary hover:bg-blue-700"
              >
                View Professional Work
              </Button>
              <Button
                onClick={() => scrollToSection('photography')}
                variant="outline"
                size="lg"
                style={{ 
                  color: '#2563eb',
                  borderColor: '#d1d5db',
                  backgroundColor: '#f3f4f6'
                }}
                className="hover:bg-gray-200 hover:text-blue-700"
              >
                Explore Photography
              </Button>
            </div>
          </div>
          <div className="text-center">
            <div className="w-64 h-64 mx-auto rounded-full overflow-hidden shadow-2xl">
              <img 
                src={profilePicture} 
                alt="Azin Faghihi"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
