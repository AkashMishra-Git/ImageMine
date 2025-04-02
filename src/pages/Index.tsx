
import React, { useState } from "react";
import { Logo } from "@/components/logo";
import { ImagePromptForm } from "@/components/image-prompt-form";
import { ImageGallery } from "@/components/image-gallery";
import { LoadingAnimation } from "@/components/loading-animation";
import { generateImage, testApiKey } from "@/services/imageService";
import { toast } from "sonner";
import { Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<Array<{ url: string; prompt: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  
  const handleGenerateImage = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const imageUrls = await generateImage(prompt, apiKey || undefined);
      
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

  const validateApiKey = async () => {
    if (!apiKey.trim()) {
      toast.error("Please enter an API key");
      return;
    }
    
    setIsLoading(true);
    try {
      const isValid = await testApiKey(apiKey);
      if (isValid) {
        toast.success("API key validated successfully");
        setError(null);
      } else {
        toast.error("Invalid API key");
      }
    } catch (error) {
      console.error("API key validation error:", error);
      toast.error("Error validating API key");
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
            <Button 
              variant="outline" 
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
            >
              {showApiKeyInput ? "Hide API Key" : "Change API Key"}
            </Button>
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

          {/* API Key input */}
          {showApiKeyInput && (
            <div className="mb-6 max-w-2xl mx-auto">
              <div className="flex gap-2 mb-4">
                <Input
                  type="password"
                  placeholder="Enter your OpenAI API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={validateApiKey} disabled={isLoading}>
                  Validate
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Your API key stays in your browser and is never stored on our servers.
              </p>
            </div>
          )}

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
