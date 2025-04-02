
import React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ImageGalleryProps {
  images: Array<{
    url: string;
    prompt: string;
  }>;
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const downloadImage = async (url: string, prompt: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `imageMine-${prompt.slice(0, 20).replace(/\s+/g, "-")}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  if (images.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 mb-4 opacity-30">
          <img 
            src="/lovable-uploads/8a86ad3e-0e8f-483a-b232-a48a0a613a84.png" 
            alt="No images yet" 
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-lg text-muted-foreground">
          Your generated images will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, index) => (
        <Card key={index} className="overflow-hidden group relative">
          <div className="aspect-square">
            <img 
              src={image.url} 
              alt={image.prompt} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <p className="text-white text-sm line-clamp-2 mb-2">{image.prompt}</p>
            <Button 
              size="sm" 
              variant="outline"
              className="bg-black/20 border-white/20 text-white hover:bg-black/40 w-full"
              onClick={() => downloadImage(image.url, image.prompt)}
            >
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
