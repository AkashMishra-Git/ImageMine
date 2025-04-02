
import React from "react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src="/lovable-uploads/8a86ad3e-0e8f-483a-b232-a48a0a613a84.png" 
        alt="XeonWeb ImageMine Logo" 
        className="h-10 w-10 object-contain" 
      />
      <span className="font-bold text-lg md:text-xl tracking-tight">
        XeonWeb <span className="text-xeon-yellow">ImageMine</span>
      </span>
    </div>
  );
}
