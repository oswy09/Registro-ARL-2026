import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  SearchX, 
  UserRoundCheck, 
  AlertCircle, 
  X,
  RefreshCw,
  CloudOff,
  Phone
} from 'lucide-react';

export type StatusModalType = 'success' | 'no_products' | 'already_registered' | 'already_done' | 'affiliation_not_found' | 'service_error' | null;

interface StatusModalsProps {
  type: StatusModalType;
  onClose: () => void;
  onAction?: (actionType: string) => void;
}

export const StatusModals: React.FC<StatusModalsProps> = ({ type, onClose, onAction }) => {
  if (!type) return null;

  const getConfig = (type: StatusModalType) => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle2 className="w-16 h-16 text-green-500" />,
          bgIcon: "bg-green-50",
          title: "Usuario registrado",
          description: "¡Buenas noticias! Ya te encuentras registrado. Inicia sesión con tu correo y contraseña.",
          primaryAction: "Iniciar sesión",
          primaryColor: "bg-[#00008F]",
          secondaryAction: "Volver a portal ARL",
          secondaryVariant: "outline-blue",
          titleColor: "text-[#00008F]"
        };
      case 'no_products':
        return {
          icon: <SearchX className="w-16 h-16 text-[#C91432]" />,
          bgIcon: "bg-red-50",
          title: "No fue posible completar el registro",
          description: (
            <>
              <p className="text-sm text-gray-700 mb-4 text-left">
                Por favor, verifica los datos o comunícate con nuestros canales de atención.
              </p>
              <div className="bg-[#D6E6FF] border border-[rgba(0,0,0,0.1)] rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#00008F] rounded-full flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-base font-bold text-[#00008F] mb-1">¿Necesitas ayuda?</p>
                    <p className="text-sm text-gray-700">
                      Comunícate al <span className="font-bold text-[#00008F]">#247</span>, opción <span className="font-bold">3-1-3</span>
                    </p>
                  </div>
                </div>
              </div>
            </>
          ),
          primaryAction: "Volver a portal ARL",
          primaryColor: "bg-[#00008F]",
          secondaryAction: null,
          titleColor: "text-[#C91432]"
        };
      case 'already_registered':
        return {
          icon: <UserRoundCheck className="w-16 h-16 text-[#C91432]" />,
          bgIcon: "bg-red-50",
          title: "Usuario ya registrado",
          description: "Ya te encuentras registrado, pero no cuentas con un perfil asignado para ARL. Te invitamos a actualizar tus datos para que puedas acceder.",
          primaryAction: "Actualizar datos",
          primaryColor: "bg-[#00008F]",
          secondaryAction: "Volver al portal ARL",
          secondaryVariant: "outline-blue",
          titleColor: "text-[#C91432]"
        };
      case 'already_done':
        return {
          icon: <AlertCircle className="w-16 h-16 text-[#C91432]" />,
          bgIcon: "bg-red-50",
          title: "Registro ya realizado",
          description: "Ya completaste tu registro en la aplicación de Portal transaccional. Ahora, es necesario actualizar tu información para asesoría virtual.",
          primaryAction: "Actualizar datos",
          primaryColor: "bg-[#00008F]",
          secondaryAction: "Iniciar sesión",
          secondaryVariant: "outline-blue",
          titleColor: "text-[#C91432]"
        };
      case 'affiliation_not_found':
        return {
          icon: <SearchX className="w-16 h-16 text-[#C91432]" />,
          bgIcon: "bg-red-50",
          title: "No fue posible validar la información ingresada",
          description: "Por favor verifica los datos o comunícate con nuestros canales de atención.",
          primaryAction: "Corregir datos",
          primaryColor: "bg-[#00008F]",
          secondaryVariant: "outline-blue",
          titleColor: "text-[#C91432]",
          showHelp: true
        };
      case 'service_error':
        return {
          icon: <CloudOff className="w-16 h-16 text-[#C91432]" />,
          bgIcon: "bg-blue-50",
          title: "Estamos teniendo problemas para conectar.",
          description: (
            <>
              No pudimos completar el proceso porque uno de nuestros servicios se detuvo<br />
              <span className="font-bold">Inténtalo más tarde</span>
            </>
          ),
          primaryAction: "Entendido",
          primaryColor: "bg-[#00008F]",
          secondaryAction: null,
          titleColor: "text-[#C91432]"
        };
      default:
        return null;
    }
  };

  const config = getConfig(type);
  if (!config) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          key={type}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-white rounded-none w-full max-w-md overflow-hidden shadow-2xl border border-gray-100"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10 text-[#00008F]"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Body */}
          <div className="p-8 pt-10 flex flex-col items-center text-center">
            {/* Icon Area */}
            <div className={`w-28 h-28 ${config.bgIcon} rounded-full flex items-center justify-center mb-8 relative`}>
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                {config.icon}
              </motion.div>
            </div>

            <h3 className={`title-modal text-2xl ${config.titleColor} mb-4 tracking-tight leading-tight`}>
              {config.title}
            </h3>
            
            <div className="text-gray-600 text-[15px] leading-relaxed mb-8 px-2">
              {config.description}
            </div>

            <div className="w-full space-y-3">
              <button
                onClick={() => {
                  if (onAction) onAction(config.primaryAction || '');
                  onClose();
                }}
                className={`w-full max-w-[220px] h-[52px] px-10 mx-auto ${config.primaryColor} text-white rounded-full font-bold text-sm shadow-lg hover:bg-[#0000F7] active:bg-[#0000D2] disabled:bg-[#00000026] disabled:text-[#0000004D] disabled:shadow-none transition-all flex items-center justify-center gap-2`}
              >
                {config.primaryAction === "Reintentar" && <RefreshCw className="w-4 h-4" />}
                {config.primaryAction}
              </button>
              
              {config.secondaryAction && (
                <button
                  onClick={() => {
                    if (onAction) onAction(config.secondaryAction || '');
                    onClose();
                  }}
                  className={`w-full max-w-[220px] h-[52px] px-10 mx-auto rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    config.secondaryVariant === 'outline-blue' 
                      ? 'border-2 border-[#00008F] text-[#00008F] hover:bg-[#0000F7] hover:text-[#E8EAED] hover:border-transparent active:bg-[#0000D2] active:text-[#E8EAED] active:border-transparent' 
                      : 'bg-transparent text-[#00008F] hover:bg-gray-50'
                  }`}
                >
                  {config.secondaryAction}
                </button>
              )}

              {(config as any).showHelp && (
                <div className="mt-6 bg-[#D6E6FF] border border-[rgba(0,0,0,0.1)] rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#00008F] rounded-full flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-base font-bold text-[#00008F] mb-1">¿Necesitas ayuda?</p>
                      <p className="text-sm text-gray-700">
                        Comunícate al <span className="font-bold text-[#00008F]">#247</span>, opción <span className="font-bold">3-1-3</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};