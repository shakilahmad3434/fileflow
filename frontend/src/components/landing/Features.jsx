import { 
  Share2, 
  HardDrive, 
  Image as ImageIcon, 
  FileText, 
  Music, 
  Cloud
} from "lucide-react";
import FeatureCard from "./FeatureCard";

const Features = () => {
  return (
    <section className="py-20 bg-yellow-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-black">
            Comprehensive File Management
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            FileFlow offers a complete suite of tools to manage, share, and process your files with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Share2}
            title="Quick Share"
            description="Share files anonymously with time-limited links. Perfect for quick transfers without registration."
          />
          
          <FeatureCard
            icon={HardDrive}
            title="Personal Drive"
            description="Authenticated cloud storage with robust organization features and generous storage quotas."
          />
          
          <FeatureCard
            icon={ImageIcon}
            title="Image Studio"
            description="Upload, compress, and organize your images with a beautiful gallery interface."
          />
          
          <FeatureCard
            icon={FileText}
            title="DocuScan"
            description="Advanced document parsing capabilities for resumes, invoices, and more with AI-powered extraction."
            isPro={true}
          />
          
          <FeatureCard
            icon={Music}
            title="AudioBank"
            description="Store, organize, and convert audio files with smart playlists and metadata management."
            isPro={true}
          />
          
          <FeatureCard
            icon={Cloud}
            title="CloudSync"
            description="Intelligent integration between local storage and popular cloud providers for seamless access."
            isPro={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;