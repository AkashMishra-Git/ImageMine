
import React from "react";

export function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="relative">
        <img 
          src="/lovable-uploads/8a86ad3e-0e8f-483a-b232-a48a0a613a84.png" 
          alt="Loading" 
          className="h-16 w-16 animate-pulse-yellow"
        />
      </div>
      <p className="mt-4 text-center text-sm text-muted-foreground animate-pulse">
        Generating your masterpiece...
      </p>
    </div>
  );
}
