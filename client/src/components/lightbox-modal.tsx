import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface LightboxModalProps {
  image: {
    src: string;
    title: string;
    category: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function LightboxModal({ image, isOpen, onClose }: LightboxModalProps) {
  const [isVertical, setIsVertical] = useState<boolean | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      
      // Reset orientation state when modal opens
      setIsVertical(null);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const vertical = img.naturalHeight > img.naturalWidth;
    setIsVertical(vertical);
  };

  if (!isOpen || !image) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 lightbox-backdrop"
      onClick={onClose}
    >
      <div className={`relative ${
        isVertical === null ? 'max-w-4xl max-h-[90vh]' : 
        isVertical ? 'max-w-2xl max-h-[95vh]' : 'max-w-6xl max-h-[75vh]'
      }`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
        >
          <X size={24} />
        </button>
        
        <img 
          src={image.src} 
          alt={image.title}
          className={`object-cover ${
            isVertical === null ? 'max-w-full max-h-[90vh]' :
            isVertical ? 'w-full h-[95vh]' : 'w-full h-[75vh]'
          }`}
          onLoad={handleImageLoad}
          onClick={(e) => e.stopPropagation()}
        />
        
        <div className="absolute bottom-4 left-4 right-4 text-center text-white bg-black bg-opacity-50 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
          <p className="text-gray-300">{image.category}</p>
        </div>
      </div>
    </div>
  );
}
