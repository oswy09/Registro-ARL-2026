import React from 'react';
import { motion } from 'framer-motion';
import { X, BookOpen } from 'lucide-react';

interface ManualModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'hseq' | 'general';
}

export const ManualModal: React.FC<ManualModalProps> = ({ isOpen, onClose, type = 'hseq' }) => {
  console.log('🟢 ManualModal render - isOpen:', isOpen, 'type:', type);

  const isHSEQ = type === 'hseq';
  const generalGif = 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1772064572/video03_lt76is.gif';
  const hseqGif = 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1772064572/vide02_qizpoo.gif';

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-lg w-full max-w-3xl overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="bg-[#00008F] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h3 className="title-modal text-xl text-white">
              {isHSEQ ? 'Manual de Usuario HSEQ' : 'Manual de Usuario'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          <div className="mb-6">
            <h4 className="text-lg font-bold text-[#00008F] mb-2">Guía paso a paso</h4>
            <p className="text-sm text-gray-600">
              {isHSEQ 
                ? 'Sigue estos pasos para gestionar tu solicitud como usuario HSEQ.'
                : 'Sigue estos pasos para usar la plataforma.'}
            </p>
          </div>

          {/* Image/GIF Container */}
          <div className="bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 mb-6 flex items-center justify-center p-8">
            <img 
              src={isHSEQ ? hseqGif : generalGif}
              alt={isHSEQ ? "Guía paso a paso del proceso HSEQ" : "Guía de uso de la plataforma"}
              className="w-full h-auto max-w-xl"
            />
          </div>

          {/* Instructions */}
          {isHSEQ && (
            <div className="bg-[#D6E6FF] border border-[rgba(0,0,0,0.1)] rounded-lg p-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-bold text-[#00008F]">Nota:</span> Asegúrate de revisar tu correo electrónico regularmente para estar al tanto del estado de tu solicitud. Puedes gestionar toda la información desde la sección "Perfil" en tu cuenta.
              </p>
            </div>
          )}

          {/* Close Button */}
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="mt-6 bg-[#00008F] text-white py-3 px-12 rounded-full font-bold text-sm hover:bg-[#0000F7] active:bg-[#0000D2] disabled:bg-[#00000026] disabled:text-[#0000004D] transition-all tracking-wide"
            >
              Entendido
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};