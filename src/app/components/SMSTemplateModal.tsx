import React from 'react';
import { motion } from 'motion/react';
import { X, ArrowLeft, MoreVertical, Smartphone } from 'lucide-react';

interface SMSTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
}

export const SMSTemplateModal: React.FC<SMSTemplateModalProps> = ({ 
  isOpen, 
  onClose, 
  code 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="relative w-full max-w-[320px] aspect-[9/19] bg-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl border-[6px] border-[#333] overflow-hidden"
      >
        {/* Notch Area */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50 flex items-center justify-center gap-2">
           <div className="w-10 h-1 bg-[#1a1a1a] rounded-full"></div>
           <div className="w-2 h-2 bg-[#1a1a1a] rounded-full"></div>
        </div>

        {/* Screen Container */}
        <div className="w-full h-full bg-[#f4f4f4] rounded-[2.5rem] overflow-hidden flex flex-col relative">
          {/* Status Bar Mock */}
          <div className="h-10 px-6 flex justify-between items-end pb-1">
             <span className="text-[12px] font-bold">9:41</span>
             <div className="flex gap-1 items-center">
                <div className="w-3 h-3 bg-black rounded-sm"></div>
                <div className="w-4 h-2 bg-black rounded-sm"></div>
             </div>
          </div>

          {/* SMS Header */}
          <div className="px-4 py-3 bg-white border-b border-gray-200 flex items-center gap-3">
             <button onClick={onClose} className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-[#007AFF]" />
             </button>
             <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-gray-500" />
             </div>
             <div className="flex-1">
                <p className="text-[13px] font-bold text-black uppercase">AXA COLPATRIA</p>
                <p className="text-[10px] text-gray-500">En línea</p>
             </div>
             <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                <X className="w-5 h-5" />
             </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
             <div className="self-center">
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Hoy • 14:32</span>
             </div>

             {/* Message Bubble */}
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="self-start max-w-[85%] bg-white border border-gray-100 rounded-2xl rounded-tl-none p-3 shadow-sm"
             >
                <p className="text-[14px] text-gray-800 leading-relaxed">
                   Tu código de validación para el registro es <span className="font-bold text-black">{code}</span>. Válido por 5 min. No lo compartas con nadie.
                </p>
             </motion.div>
          </div>

          {/* Input Area Mock */}
          <div className="p-4 bg-white flex items-center gap-2 border-t border-gray-100">
             <div className="flex-1 h-9 bg-gray-100 rounded-full px-4 flex items-center">
                <span className="text-gray-400 text-[13px]">Mensaje de texto...</span>
             </div>
             <div className="w-9 h-9 bg-[#007AFF] rounded-full flex items-center justify-center text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 rotate-90">
                   <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
             </div>
          </div>
        </div>

        {/* Close button outside the phone - Improved visibility */}
        <button 
          onClick={onClose}
          className="absolute -top-14 right-0 flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-white backdrop-blur-md transition-all group border border-white/30"
        >
          <span className="text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Cerrar</span>
          <X size={20} />
        </button>
      </motion.div>
    </div>
  );
};