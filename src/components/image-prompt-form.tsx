
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

interface ImagePromptFormProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export function ImagePromptForm({ onSubmit, isLoading }: ImagePromptFormProps) {
  const [prompt, setPrompt] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };

  const promptSuggestions = [
    "A futuristic cityscape with neon lights",
    "A serene forest with a waterfall at sunset",
    "An astronaut riding a horse on Mars",
    "A cyberpunk character with yellow and black themes"
  ];

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="space-y-2">
        <Textarea
          placeholder="Describe the image you want to generate..."
          className="min-h-[100px] resize-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      <div className="flex flex-wrap gap-2 my-4">
        {promptSuggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            className="text-xs md:text-sm bg-secondary/80 hover:bg-secondary px-3 py-1 rounded-full transition-colors"
            onClick={() => setPrompt(suggestion)}
            disabled={isLoading}
          >
            {suggestion}
          </button>
        ))}
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-xeon-yellow text-xeon-gray hover:bg-opacity-90 font-medium"
        disabled={isLoading || !prompt.trim()}
      >
        <Sparkles className="mr-2 h-4 w-4" />
        {isLoading ? "Generating..." : "Generate Image"}
      </Button>
    </form>
  );
}
