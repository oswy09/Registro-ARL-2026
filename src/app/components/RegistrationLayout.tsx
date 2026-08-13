import React from 'react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import heroImage from "figma:asset/fd69be997a9c4c17b9cbf47b5fdc77f51c1fefc7.png";

interface RegistrationLayoutProps {
  children: React.ReactNode;
}

export const RegistrationLayout: React.FC<RegistrationLayoutProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center p-4 sm:p-6" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
      <div className="bg-white rounded-lg shadow-2xl flex flex-col md:flex-row max-w-4xl w-full min-h-[500px] relative">
        {/* Left Side: Image */}
        <div className="hidden md:block md:w-[42%] relative bg-[#00008F] rounded-l-lg overflow-hidden">
          <ImageWithFallback
            src="https://res.cloudinary.com/ddqbnr9vo/image/upload/v1770052424/mujer-op-arl_wloj8s.jpg"
            alt="ARL Professional"
            className="w-full h-full object-cover opacity-90 scale-x-[-1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00008F]/50 to-transparent pointer-events-none" />
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-[58%] flex flex-col p-8 sm:px-12 sm:py-10 relative bg-white rounded-r-lg">
          <div className="flex-1 min-h-[580px]">
            {children}
          </div>
          
          {/* Footer help link */}
          <div className="pt-6 border-t border-gray-100 bg-gray-50 -mx-8 sm:-mx-12 -mb-10 sm:-mb-10 p-5 text-center mt-8">
            <p className="text-[13px] text-gray-600">
              ¿Necesitas ayuda?{' '}
              <button className="text-[#00008F] font-bold hover:underline cursor-pointer">
                Haz clic aquí
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};