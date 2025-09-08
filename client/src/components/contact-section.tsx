import { personalInfo, interests } from "@/data/portfolio-data";
import { Mail, Github } from "lucide-react";

export default function ContactSection() {

  return (
    <section id="contact" className="py-20 gradient-bg text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-300">Ready to collaborate on your next project?</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <Mail className="text-secondary text-xl mr-4" />
                <span>{personalInfo.email}</span>
              </div>
              <div className="flex items-center justify-center">
                <Github className="text-secondary text-xl mr-4" />
                <a 
                  href={personalInfo.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-blue-400"
                >
                  github.com/ozayn
                </a>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-6 mt-8">Areas of Interest</h3>
            <div className="space-y-2">
              {interests.map((interest) => (
                <p key={interest} className="text-gray-300">• {interest}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
