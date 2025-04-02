
import React, { useState } from "react";
import { Logo } from "@/components/logo";
import { ImagePromptForm } from "@/components/image-prompt-form";
import { ImageGallery } from "@/components/image-gallery";
import { LoadingAnimation } from "@/components/loading-animation";
import { generateImage } from "@/services/imageService";
import { toast } from "sonner";
import { Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<Array<{ url: string; prompt: string }>>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const imageUrls = await generateImage(prompt);
      
      // Add new images to the beginning of the array
      setImages(prevImages => [
        { url: imageUrls[0], prompt },
        ...prevImages
      ]);
      
      toast.success("Image generated successfully!");
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to generate image. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full border-b">
        <div className="container py-4 flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Twitter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container py-8 md:py-12">
        <div className="w-full max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Transform Text to Image with AI</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Use the power of DALL·E to generate stunning, creative images from your text descriptions.
            </p>
          </div>

          {/* Error alert */}
          {error && (
            <Alert variant="destructive" className="mb-6 max-w-2xl mx-auto">
              <AlertTitle>Generation Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Prompt input */}
          <div className="w-full max-w-2xl mx-auto mb-10">
            <ImagePromptForm onSubmit={handleGenerateImage} isLoading={isLoading} />
          </div>

          {/* Loading or gallery */}
          <div className="w-full mt-8">
            {isLoading ? (
              <LoadingAnimation />
            ) : (
              <ImageGallery images={images} />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} XeonWeb ImageMine. All rights reserved.
          </div>
          <div className="text-sm text-muted-foreground">
            Powered by DALL·E
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
