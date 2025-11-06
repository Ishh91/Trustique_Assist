import React from 'react';

export default function BackgroundFX() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid animate-fade-in"></div>

      {/* Brand gradient blobs with varied motion */}
      <div className="absolute -top-20 -left-24 w-[45vw] h-[45vw] bg-[#0056D2]/20 rounded-full blur-3xl animate-drift"></div>
      <div className="absolute top-1/3 -right-24 w-[40vw] h-[40vw] bg-[#00FF88]/20 rounded-full blur-3xl animate-drift-slow"></div>
      <div className="absolute bottom-[-10%] left-1/4 w-[35vw] h-[35vw] bg-[#0056D2]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
    </div>
  );
}