import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Facebook, Twitter, Linkedin, Instagram, Check, Clock, AlertCircle } from 'lucide-react';
import svgPaths from "../../imports/svg-m2qeozjt2";
import imgSupersalud from "../../assets/6fe1d7696ecf804b2fefa928304a9c63acd4dcf3.png";
import imgSuperfinancieraBlanco from "../../assets/993e8cef156deb1cb47d97050febb84f23ae973e.png";
import imgColpatriaAxaSolidRgb1 from "../../assets/08d80e44689c01827e2f4957526419bbf854eb79.png";

export type EmailTemplateType = 'otp' | 'hseq_request' | 'hseq_confirmation' | 'hseq_approved' | 'hseq_rejected' | 'hseq_expired' | 'hseq_no_rl_email';

interface EmailTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  docType?: string;
  docNumber?: string;
  type?: EmailTemplateType;
  onTypeChange?: (type: EmailTemplateType) => void;
}

export const EmailTemplateModal: React.FC<EmailTemplateModalProps> = ({ 
  isOpen, 
  onClose, 
  userName, 
  docType = 'CC',
  docNumber = '12345678',
  type = 'otp',
  onTypeChange
}) => {
  if (!isOpen) return null;

  const isHseq = type === 'hseq_request';
  const isHseqConfirmation = type === 'hseq_confirmation';
  const isHseqResult = type === 'hseq_approved' || type === 'hseq_rejected' || type === 'hseq_expired';
  const isNoRlEmail = type === 'hseq_no_rl_email';

  const getStatusConfig = () => {
    switch(type) {
      case 'hseq_no_rl_email':
        return {
          icon: <AlertCircle className="w-6 h-6" strokeWidth={4} />,
          color: '#027180',
          label: 'Información',
          title: 'Registro de Representante Legal'
        };
      case 'hseq_approved':
        return {
          icon: <Check className="w-6 h-6" strokeWidth={4} />,
          color: '#1CC54F',
          label: 'Aprobada',
          title: 'Resultado de asignación rol HSEQ'
        };
      case 'hseq_rejected':
        return {
          icon: <X className="w-6 h-6" strokeWidth={4} />,
          color: '#FF3B30',
          label: 'Negada',
          title: 'Resultado de asignación rol HSEQ'
        };
      case 'hseq_expired':
        return {
          icon: <Clock className="w-6 h-6" strokeWidth={4} />,
          color: '#FFCC00',
          label: 'Caducada',
          title: 'Resultado de asignación rol HSEQ'
        };
      default:
        return {
          icon: <Check className="w-6 h-6" strokeWidth={4} />,
          color: '#1CC54F',
          label: '',
          title: ''
        };
    }
  };

  const statusConfig = getStatusConfig();
  const imageTemplateUrl =
    type === 'otp'
      ? 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1774883079/Correo_OTP_mxqf67.png'
      : type === 'hseq_no_rl_email'
        ? 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1774883079/representante-sin.correo_tdoz4a.png'
        : type === 'hseq_confirmation'
          ? 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1774883079/Confirmaci%C3%B3n_de_Rol_HSEQ_gvwzfk.png'
          : type === 'hseq_approved'
            ? 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1774885526/Rol_HSEQ_Aprobada_1_etlrob.png'
            : type === 'hseq_rejected'
              ? 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1774885542/Rol_HSEQ_Negada_2_pkvzrk.png'
              : type === 'hseq_expired'
                ? 'https://res.cloudinary.com/ddqbnr9vo/image/upload/v1774885557/Rol_HSEQ_Cancelada_l4ebjo.png'
                : null;

  const isImageTemplate = imageTemplateUrl !== null;

  if (isImageTemplate) {
    return (
      <div
        className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-[628px] w-full"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-1.5 bg-white/80 hover:bg-white rounded-full text-gray-600 shadow transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={imageTemplateUrl}
            alt="Plantilla de correo"
            className="w-full h-auto rounded-xl shadow-2xl"
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-6 max-w-[850px] w-full">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-[#FAFAFA] w-full max-w-[628px] shadow-2xl overflow-hidden rounded-none border border-gray-100 flex-shrink-0"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          {/* Header with Logo */}
          <div className="p-8 pb-4 flex justify-between items-start bg-white">
            <img src={imgColpatriaAxaSolidRgb1} alt="AXA Colpatria" className="h-12 object-contain" />
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 rounded-full text-[#00008F] transition-colors cursor-pointer"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Teal Header Section */}
          <div className="relative h-[220px] w-full overflow-visible bg-[#41949f]">
            {/* Laptop Illustration Area - Protruding into white area */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-60px] z-30">
              <div className="relative w-[200px] h-[139px]" style={{ marginTop: '-18.5rem' }}>
                {/* Laptop Shadow */}
                <svg className="absolute inset-[79.83%_0_13.55%_24.59%] w-[150.82px] h-[9.19px]" fill="none" viewBox="0 0 150.82 9.19527">
                    <path d={svgPaths.p1d9ca440} fill="#2F2E41" />
                </svg>
                {/* Laptop Main Body */}
                <svg className="absolute inset-[10.92%_0_16.76%_24.59%] w-[150.82px] h-[100.53px]" fill="none" viewBox="0 0 150.82 100.531">
                    <path d={svgPaths.pd6fca00} fill="#3F3D56" />
                </svg>
                {/* Laptop Screen Area */}
                <svg className="absolute inset-[13.92%_10.73%_40.8%_35.32%] w-[107.88px] h-[62.93px]" fill="none" viewBox="0 0 107.888 62.936">
                    <path d={svgPaths.p1f3be300} fill="white" />
                </svg>
                {/* Status Icon Circle */}
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={type}
                    initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                    className="absolute top-[-5px] right-[5px] w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundColor: statusConfig.color }}
                  >
                      {statusConfig.icon}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* White Body Container - Width 88% as per Figma ratio */}
          <div className="relative z-20 w-[88%] mx-auto bg-white rounded-t-[20px] border border-[#f0f0f0] flex flex-col items-center text-center p-8 pt-20 pb-24 min-h-[620px] shadow-sm -mt-[8%] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full flex flex-col items-center"
              >
                {isHseq ? (
                  <>
                    <h2 className="title-modal text-[#41949f] text-[32px] mb-6 leading-tight">
                      Solicitud de aprobación
                    </h2>
                    <p className="text-[21px] text-[#111b1d] mb-4">👋 Hola representante legal,</p>
                    <p className="text-[16px] text-[#343c3d] mb-6 leading-relaxed max-w-[480px]">
                      El usuario <span className="font-bold">{userName}</span> ha solicitado vincularse con su empresa bajo el perfil HSEQ. Por favor revise y apruebe esta solicitud en el portal.
                    </p>
                    <div className="bg-white border border-gray-100 p-5 rounded-lg w-full max-w-[500px] text-left shadow-sm">
                      <p className="text-[14px] text-[#c05621] font-medium mb-1">Nota de seguridad:</p>
                      <p className="text-[14px] text-[#7b341e]">Si no reconoces esta solicitud, puedes ignorar este mensaje o contactar a soporte.</p>
                    </div>
                  </>
                ) : isHseqResult ? (
                  <>
                    <h2 className="title-modal text-[#41949f] text-[28px] mb-6 leading-tight">
                      {statusConfig.title}
                    </h2>
                    <div className="w-full text-center">
                      <p className="text-[18px] text-[#111b1d] mb-4">👋 Hola</p>
                      <p className="text-[15px] font-bold text-gray-700 mb-6">{userName}</p>
                      
                      <p className="text-[15px] text-[#343c3d] mb-8 leading-relaxed max-w-[480px] mx-auto">
                        Te informamos el resultado de la validación de tu perfil para la vinculación con la empresa solicitada.
                      </p>

                      <div className="mb-8">
                        <p className="text-[24px] font-bold uppercase tracking-wider" style={{ color: statusConfig.color }}>{statusConfig.label}</p>
                      </div>

                      <div className="bg-gray-50/50 p-6 border-t border-gray-100 w-full mt-4">
                        <p className="text-[14px] text-gray-500 leading-relaxed max-w-[480px] mx-auto">
                          Si tienes alguna duda o inquietud con respecto a este resultado, puedes consultar el estado detallado de tus permisos ingresando a tu perfil en el portal AXA Colpatria o comunicándote con nuestra línea de atención.
                        </p>
                      </div>
                    </div>
                  </>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Area - Match Figma Structure */}
          <div className="relative z-40 w-full h-[203px] bg-[#41949f] p-8 overflow-hidden -mt-16">
            {/* Top part of footer */}
            <div className="flex justify-between items-center mb-6">
                <span className="text-white text-[14px] font-bold tracking-widest uppercase">
                  AXACOLPATRIA.CO
                </span>
                <div className="flex gap-2">
                  {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                      <div key={i} className="bg-white w-[27px] h-[27px] rounded-full flex items-center justify-center text-[#41949f] cursor-pointer hover:bg-gray-100 transition-colors">
                        <Icon size={16} />
                      </div>
                  ))}
                </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/30 mb-6" />

            {/* Bottom part of footer */}
            <div className="flex justify-between items-end">
                <div className="text-white text-[14px] leading-relaxed opacity-90">
                  AXA COLPATRIA Seguros S.A.<br />
                  AXA COLPATRIA Medicina Prepagada S.A.<br />
                  AXA COLPATRIA Seguros de Vida S.A.
                </div>
                
                {/* Vertical Logos Area */}
                <div className="flex gap-4 items-center">
                  <div className="h-[70px] flex items-center">
                      <img src={imgSuperfinancieraBlanco} alt="Superfinanciera" className="h-full object-contain opacity-80" />
                  </div>
                  <div className="flex h-[70px] items-center">
                      <img src={imgSupersalud} alt="Supersalud" className="h-3 object-contain opacity-80 rotate-[-90deg]" />
                  </div>
                </div>
            </div>
          </div>
        </motion.div>

        {/* Side Panel Switcher */}
        {onTypeChange && isHseqResult && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-3 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-white/20 w-full max-w-[200px] lg:w-[200px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-4 bg-[#41949f] rounded-full"></div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Vista previa</span>
            </div>
            
            {[
              { id: 'hseq_approved', label: 'Aprobada', color: '#1CC54F', icon: Check },
              { id: 'hseq_rejected', label: 'Negada', color: '#FF3B30', icon: X },
              { id: 'hseq_expired', label: 'Caducada', color: '#FFCC00', icon: Clock }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => onTypeChange(btn.id as EmailTemplateType)}
                className={`flex items-center gap-3 p-3 rounded-xl text-[12px] font-bold transition-all cursor-pointer border-2 ${
                  type === btn.id 
                    ? 'bg-white shadow-lg border-gray-100 ring-1 ring-black/5' 
                    : 'bg-transparent border-transparent text-gray-400 hover:bg-white/50 hover:border-gray-50'
                }`}
                style={{ color: type === btn.id ? btn.color : undefined }}
              >
                <div 
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm transition-transform duration-300 ${type === btn.id ? 'scale-110' : 'scale-100 opacity-70'}`}
                  style={{ backgroundColor: btn.color }}
                >
                  <btn.icon size={16} strokeWidth={3} />
                </div>
                <span className={type === btn.id ? 'translate-x-0' : 'translate-x-[-2px]'}>{btn.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};