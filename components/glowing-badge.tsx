// import React from "react";

// type GlowingBadgeProps = {
//   children: React.ReactNode;
// };

// export const GlowingBadge = ({ children }: GlowingBadgeProps) => {
//   return (
//     <div className="relative inline-flex items-center justify-center">
//       <div className="absolute -inset-1 rounded-full bg-[conic-gradient(from_0deg,#3b82f6,transparent,#3b82f6)] blur-md opacity-80 glow-rotate" />
//       <span className="relative z-10 rounded-full bg-white px-4 py-1 text-sm font-semibold text-blue-600 shadow">
//         {children}
//       </span>
//     </div>
//   );
// };

// export default GlowingBadge;



import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowingBadgeProps {
  children: ReactNode;
  className?: string;
}

export const  GlowingBadge = ({ children, className }: GlowingBadgeProps) => {
  return (
    <div className={cn("glowing-badge-wrapper", className)}>
      <div className="glowing-badge-container shadow-blue-500">
        {/* Spinning light beam */}
        <div className="glowing-badge-beam" />
        
        {/* Badge content */}
        <div className="glowing-badge-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GlowingBadge;
