import React, { useState, useEffect } from 'react';
import { User, IdCard, HelpCircle, Check, Building2, FileText, Mail, Lock, Smartphone, Eye, EyeOff, X, ClipboardList, LogIn, ExternalLink, ArrowLeft, Info, AlertCircle, SearchX, UserCheck, ShieldCheck, RefreshCw, Clock, Home, Bell, Key, MousePointerClick, Zap, Phone, BookOpen, FastForward, ChevronDown, Layers } from 'lucide-react';
import { RegistrationLayout } from '@/app/components/RegistrationLayout';
import { InputField, SelectField } from '@/app/components/FormElements';
import { StepIndicator } from '@/app/components/StepDetails';
import { motion, AnimatePresence } from 'framer-motion';
import { StatusModals, StatusModalType } from './components/StatusModals';
import { EmailTemplateModal, EmailTemplateType } from './components/EmailTemplateModal';
import { SMSTemplateModal } from './components/SMSTemplateModal';
import { ManualModal } from './components/ManualModal';

const LoadingHSEQOverlay = ({ isVisible }: { isVisible: boolean }) => (
  <AnimatePresence>
    {isVisible && (
      <div className="fixed inset-0 z-[250] flex items-center justify-center bg-white/95 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col items-center max-w-[450px] w-full px-6 text-center"
        >
          {/* Notification Icon Group */}
          <div className="relative mb-12">
            <div className="w-[180px] h-[180px] bg-[#EEF5FF] rounded-full flex items-center justify-center">
              <div className="relative">
                <Mail className="w-16 h-16 text-[#00008F]" strokeWidth={1.5} />
                {/* Notification Badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#FF3B30] rounded-full border-[3px] border-white flex items-center justify-center shadow-md">
                  <span className="text-white text-[14px] font-bold">1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <h3 className="title-modal text-[28px] text-[#00008F] mb-4">Notificación Recibida</h3>
          <p className="text-[#6C757D] text-[16px] leading-relaxed mb-12">
            El representante legal ha recibido un nuevo correo electrónico para la <span className="text-[#41949F] font-bold">Aprobación de Rol HSEQ.</span>
          </p>

          {/* Progress Indicator */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-1.5 bg-[#E9ECEF] rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute top-0 bottom-0 bg-[#00008F] rounded-full"
                initial={{ width: "40%", left: "-50%" }}
                animate={{ left: "110%" }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5, 
                  ease: "linear" 
                }}
              />
            </div>
            <span className="text-[#007BFF] text-[14px] font-medium">Abriendo plantilla...</span>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const EmailMenuContent = ({ 
  showUserOptions, 
  onShowUserOptions, 
  onBack, 
  onSelect 
}: { 
  showUserOptions: boolean; 
  onShowUserOptions: () => void; 
  onBack: () => void; 
  onSelect: (type: EmailTemplateType) => void;
}) => (
  <>
    {!showUserOptions ? (
      <>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-1">Previsualizar correos</p>
        <button 
          onClick={() => onSelect('hseq_confirmation')}
          className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl transition-colors text-left group/btn w-full cursor-pointer"
        >
          <div className="w-10 h-10 bg-[#00008F]/10 rounded-full flex items-center justify-center text-[#00008F] group-hover/btn:scale-110 transition-transform">
            <User size={18} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-gray-800">Representante Legal</p>
            <p className="text-[10px] text-gray-500">Confirmación de Rol HSEQ</p>
          </div>
        </button>
        <button 
          onClick={() => onSelect('hseq_no_rl_email')}
          className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl transition-colors text-left group/btn w-full cursor-pointer"
        >
          <div className="w-10 h-10 bg-[#027180]/10 rounded-full flex items-center justify-center text-[#027180] group-hover/btn:scale-110 transition-transform">
            <AlertCircle size={18} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-gray-800">Sin correo Representante</p>
            <p className="text-[10px] text-gray-500">Notificación registro RL</p>
          </div>
        </button>
        <button 
          onClick={onShowUserOptions}
          className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl transition-colors text-left group/btn w-full cursor-pointer"
        >
          <div className="w-10 h-10 bg-[#41949f]/10 rounded-full flex items-center justify-center text-[#41949f] group-hover/btn:scale-110 transition-transform">
            <UserCheck size={18} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-gray-800">Usuario</p>
            <p className="text-[10px] text-gray-500">Ver estados HSEQ</p>
          </div>
        </button>
      </>
    ) : (
      <>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 p-2 text-[10px] font-bold text-[#00008F] uppercase tracking-widest hover:bg-gray-50 rounded-lg transition-colors mb-2 group w-full text-left cursor-pointer"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Volver
        </button>
        <div className="flex flex-col gap-1">
          {[
            { id: 'otp', label: 'Código OTP', icon: Key, color: '#00008F' },
            { id: 'hseq_approved', label: 'Solicitud Aprobada', icon: Check, color: '#1CC54F' },
            { id: 'hseq_rejected', label: 'Solicitud Rechazada', icon: X, color: '#FF3B30' },
            { id: 'hseq_expired', label: 'Solicitud Caducada', icon: Clock, color: '#FFCC00' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => onSelect(item.id as EmailTemplateType)}
              className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-xl transition-colors text-left group/btn w-full cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover/btn:scale-110 transition-transform" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                <item.icon size={14} />
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-gray-800">{item.label}</p>
              </div>
            </button>
          ))}
        </div>
      </>
    )}
  </>
);

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center px-6 z-[80]">
    <div className="max-w-7xl mx-auto w-full flex items-center">
      <img 
        src="https://www.axacolpatria.co/image/layout_set_logo?img_id=159588018&t=1769636653442" 
        alt="AXA Colpatria" 
        className="h-8 md:h-10"
      />
    </div>
  </nav>
);

const Tooltip = ({ text, children, className = "" }: { text?: string; children?: React.ReactNode; className?: string }) => {
  return (
    <div className={`group relative inline-flex items-center self-center ${className}`}>
      <div className="cursor-help transition-colors w-4 h-4 bg-[#606776] hover:bg-[#4E5563] rounded-full flex items-center justify-center">
        <span className="text-white text-[10px] font-bold leading-none">i</span>
      </div>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block w-72 p-4 bg-gray-900 text-white text-[12px] rounded-xl shadow-2xl z-[150] leading-relaxed pointer-events-auto">
        <div className="relative z-[151]">
          {children || text}
        </div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-gray-900" />
      </div>
    </div>
  );
};

const InfoBanner = ({ text }: { text: string | React.ReactNode }) => (
  <div className="bg-[#D6E6FF] border border-[rgba(0,0,0,0.1)] rounded-md p-4 mb-4">
    <p className="text-sm text-gray-700 leading-tight">
      {text}
    </p>
  </div>
);

const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
  <div className="flex items-start gap-2 py-1">
    {met ? (
      <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600 stroke-[3px]" />
    ) : (
      <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 ml-1.5 mr-1.5 flex-shrink-0" />
    )}
    <span className={`text-[13.5px] leading-snug ${met ? 'text-gray-400 line-through' : 'text-gray-600'}`}>
      {text}
    </span>
  </div>
);

const PasswordRequirementNoStrike = ({ met, text }: { met: boolean; text: string }) => (
  <div className="flex items-start gap-2 py-1">
    {met ? (
      <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600 stroke-[3px]" />
    ) : (
      <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 ml-1.5 mr-1.5 flex-shrink-0" />
    )}
    <span className={`text-[13.5px] leading-snug ${met ? 'text-green-600' : 'text-gray-600'}`}>
      {text}
    </span>
  </div>
);

const PrivacyModal = ({ isOpen, onClose, onAccept }: { isOpen: boolean; onClose: () => void; onAccept: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-[#00008F]/5 rounded-full">
              <ClipboardList className="w-8 h-8 text-[#00008F]" />
            </div>
            <h2 className="title-modal text-xl text-[#00008F]">Tratamiento de datos personales</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <p className="text-sm text-gray-600 leading-relaxed text-justify">
            <strong>AUTORIZACIÓN TRATAMIENTO DE DATOS PERSONALES</strong>
            <br /><br />
            AXA COLPATRIA Seguros de Vida S.A. (en adelante la Compañía) será responsable del tratamiento de mis datos personales. Al continuar, autorizo de manera libre, previa, expresa e informada a la Compañía, su matriz, subordinadas, afiliadas y demás sociedades del Grupo AXA en Colombia, así como a sus cesionarios o beneficiarios, para recolectar, almacenar, usar, circular y suprimir mis datos personales, con las siguientes finalidades:
            <br /><br />
            1) Autenticación en los portales de clientes de LA COMPAÑÍA;
            <br />
            2) Recordatorio de usuario, restablecimiento de contraseña y desbloqueo de cuenta;
            <br />
            3) Desarrollo propio de las actividades que componen el Sistema de Seguridad y Salud en el Trabajo de la empresa, así como las exigencias expuestas por las normas que lo regulan.
            <br /><br />
            Este tratamiento se realiza conforme a la Ley 1581 de 2012 y sus decretos reglamentarios. Como titular, tengo derecho a conocer, actualizar, rectificar y suprimir mis datos, así como a revocar esta autorización en cualquier momento, y a presentar quejas ante la Superintendencia de Industria y Comercio. Puedo ejercer estos derechos y consultar la Política de Tratamiento de Datos Personales en{' '}
            <a href="https://www.axacolpatria.com" target="_blank" rel="noopener noreferrer" className="text-[#00008F] underline font-medium">www.axacolpatria.com</a>
            {' '}Es mi responsabilidad informar oportunamente cualquier cambio o actualización de mis datos.
          </p>
        </div>
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button 
            onClick={() => { onAccept(); onClose(); }}
            className="bg-[#00008F] text-white px-8 py-2.5 rounded-full font-bold tracking-wide text-sm hover:bg-[#0000F7] transition-colors"
          >
            Aceptar
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const CustomCheckbox = ({ checked, onChange, label, children }: { checked: boolean; onChange: (e: any) => void; label?: string; children?: React.ReactNode }) => (
  <label className="flex items-start gap-3 cursor-pointer group">
    <div className="relative">
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={onChange} />
      <div
        className={`mt-0.5 w-5 h-5 border-[1.5px] rounded-[6px] transition-all flex items-center justify-center flex-shrink-0 ${
          checked
            ? 'bg-[#00008F] border-[#00008F] group-hover:bg-[#0000F7] group-hover:border-[#0000F7]'
            : 'bg-[#F8FAFF] border-[#C7CAD1] group-hover:bg-[#F0F6FF] group-hover:border-[#0000F7]'
        }`}
      >
        <Check className={`w-3.5 h-3.5 text-white transition-opacity duration-200 ${checked ? 'opacity-100' : 'opacity-0'}`} strokeWidth={3} />
      </div>
    </div>
    {label && <span className="text-sm text-gray-700 font-medium">{label}</span>}
    {children}
  </label>
);

const ReadOnlyField = ({ label, value, icon, tooltipText }: { label: string; value: string; icon: React.ReactNode; tooltipText?: string }) => (
  <div className="flex flex-col gap-2 w-full">
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-[#1A1D21]">{label} *</span>
      {tooltipText && <Tooltip text={tooltipText} />}
    </div>
    <div className="flex items-stretch border rounded-[8px] overflow-hidden transition-all duration-200 border-green-600 bg-gray-50/50 h-11">
      <div className="flex items-center justify-center w-12 bg-green-600 text-white">
        {icon}
      </div>
      <div className="flex-1 flex items-center px-3 text-gray-800 font-medium text-[15px]">
        {value}
      </div>
      <div className="flex items-center px-3">
        <Check className="w-5 h-5 text-green-600" strokeWidth={3} />
      </div>
    </div>
  </div>
);

const OnboardingTour = ({ step, onNext, onClose }: { step: number; onNext: () => void; onClose: () => void }) => {
  if (step === 0) return null;

  return (
    <div className="fixed inset-0 z-[250]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute left-[180px] top-[120px] z-[260] w-full max-w-xs"
          >
            <div className="bg-white p-5 rounded-2xl shadow-2xl border border-blue-100 relative">
              {/* Arrow pointing left */}
              <div className="absolute -left-3 top-10 w-4 h-4 bg-white rotate-45 border-l border-b border-blue-100" />
              
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-[#00008F]/10 rounded-lg">
                  <ClipboardList className="w-5 h-5 text-[#00008F]" />
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-lg font-bold text-[#00008F] mb-1">Botones de Prueba</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-5">
                Utiliza estos accesos directos para simular diferentes respuestas del sistema instantáneamente.
              </p>
              <div className="flex items-center justify-between">
                <button onClick={onClose} className="text-[10px] font-bold text-gray-400 hover:underline">Omitir</button>
                <button 
                  onClick={onNext}
                  className="bg-[#00008F] text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2"
                >
                  Siguiente <ArrowLeft className="w-3 h-3 rotate-180" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-1/2 -translate-x-1/2 top-[180px] z-[260] w-full max-w-xs"
          >
            <div className="bg-white p-5 rounded-2xl shadow-2xl border border-[#027180]/20 relative">
              {/* Arrow pointing up */}
              <div className="absolute left-1/2 -top-2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-[#027180]/20" />
              
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-[#027180]/10 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-[#027180]" />
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-lg font-bold text-[#027180] mb-1">Guía de Flujos</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-5">
                Esta barra de colores te indica en qué escenario te encuentras (HSEQ, Tradicional, etc).
              </p>
              <button 
                onClick={onClose}
                className="w-fit min-w-[180px] max-w-full px-10 mx-auto bg-[#027180] text-white py-2.5 rounded-full text-xs font-bold"
              >
                ¡Entendido, empezar!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const rgbToHex = (colorValue: string) => {
  const trimmed = colorValue.trim();

  if (trimmed.startsWith('#')) {
    if (trimmed.length === 4) {
      const [hash, r, g, b] = trimmed;
      return `${hash}${r}${r}${g}${g}${b}${b}`.toUpperCase();
    }
    return trimmed.toUpperCase();
  }

  const rgbMatch = trimmed.match(/rgba?\(([^)]+)\)/i);
  if (!rgbMatch) return trimmed;

  const [r = '0', g = '0', b = '0'] = rgbMatch[1].split(',').map((part) => part.trim());
  const red = Number.parseInt(r, 10);
  const green = Number.parseInt(g, 10);
  const blue = Number.parseInt(b, 10);

  if ([red, green, blue].some((channel) => Number.isNaN(channel))) return trimmed;

  const toHex = (channel: number) => channel.toString(16).padStart(2, '0').toUpperCase();
  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
};

const getElementLabel = (el: HTMLElement): string => {
  if (el.dataset.component) return el.dataset.component;
  const tag = el.tagName.toLowerCase();
  const ariaLabel = el.getAttribute('aria-label');
  if (ariaLabel) return ariaLabel;
  if (tag === 'input') {
    const placeholder = el.getAttribute('placeholder');
    const type = el.getAttribute('type') || 'text';
    return placeholder ? `input — "${placeholder.slice(0, 22)}"` : `input[${type}]`;
  }
  if (tag === 'label') return `label — "${(el.textContent || '').trim().slice(0, 22)}"`;
  if (tag === 'button') {
    const text = (el.textContent || '').trim().slice(0, 22);
    return text ? `button — "${text}"` : 'button';
  }
  if (tag === 'select') return 'select';
  if (tag === 'svg') return 'svg (ícono)';
  if (tag === 'span') {
    const text = (el.textContent || '').trim().slice(0, 22);
    return text ? `span — "${text}"` : 'span';
  }
  if (el.id) return `${tag}#${el.id}`;
  return `<${tag}>`;
};

const buildAncestry = (hovered: HTMLElement): Array<{ element: HTMLElement; label: string }> => {
  const chain: Array<{ element: HTMLElement; label: string }> = [];
  let el: HTMLElement | null = hovered;
  let depth = 0;
  while (el && el !== document.body && depth < 12) {
    chain.unshift({ element: el, label: getElementLabel(el) });
    if (el.dataset.component) break;
    el = el.parentElement;
    depth++;
  }
  if (!chain[0]?.element.dataset.component) return chain.slice(-4);
  return chain;
};

const DeveloperInspector = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [copiedKey, setCopiedKey] = useState('');
  const showDeveloperSwitch = true;
  const [inspectInfo, setInspectInfo] = useState<null | {
    tagName: string;
    selector: string;
    isTextElement: boolean;
    fontSize: string;
    fontFamily: string;
    colorHex: string;
    backgroundHex: string;
    display: string;
    width: string;
    height: string;
    alignItems: string;
    gap: string;
    flexShrink: string;
    alignSelf: string;
    position: string;
    zIndex: string;
    borderBottom: string;
    border: string;
    borderRadius: string;
    boxShadow: string;
    padding: string;
    margin: string;
    currentStates: string[];
    implementedStates: string[];
    stateImplementation: string;
  }>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const highlightedElementRef = React.useRef<HTMLElement | null>(null);
  const selectedElementRef = React.useRef<HTMLElement | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const ancestryRef = React.useRef<Array<{ element: HTMLElement; label: string }>>([]);
  const [componentInfo, setComponentInfo] = useState<{ blockName: string; labels: string[]; selectedIdx: number } | null>(null);

  const clearHighlight = React.useCallback(() => {
    const previous = highlightedElementRef.current;
    if (!previous) return;

    previous.style.outline = previous.dataset.devInspectorOutline || '';
    previous.style.outlineOffset = previous.dataset.devInspectorOutlineOffset || '';
    previous.style.boxShadow = previous.dataset.devInspectorBoxShadow || '';
    delete previous.dataset.devInspectorOutline;
    delete previous.dataset.devInspectorOutlineOffset;
    delete previous.dataset.devInspectorBoxShadow;
    highlightedElementRef.current = null;
  }, []);

  const applyHighlight = React.useCallback((element: HTMLElement) => {
    if (highlightedElementRef.current === element) return;

    clearHighlight();

    element.dataset.devInspectorOutline = element.style.outline;
    element.dataset.devInspectorOutlineOffset = element.style.outlineOffset;
    element.dataset.devInspectorBoxShadow = element.style.boxShadow;
    element.style.outline = '2px solid #0B57D0';
    element.style.outlineOffset = '1px';
    element.style.boxShadow = 'inset 0 0 0 1px rgba(11, 87, 208, 0.25)';
    highlightedElementRef.current = element;
  }, [clearHighlight]);

  const buildSelector = React.useCallback((element: HTMLElement) => {
    if (element.id) return `#${element.id}`;
    const className = element.className?.toString?.().trim() || '';
    if (className) {
      const firstClass = className.split(/\s+/)[0];
      if (firstClass) return `${element.tagName.toLowerCase()}.${firstClass}`;
    }
    return element.tagName.toLowerCase();
  }, []);

  const collectInspectInfo = React.useCallback((targetElement: HTMLElement) => {
    const computedStyle = window.getComputedStyle(targetElement);
    const padding = `${computedStyle.paddingTop} ${computedStyle.paddingRight} ${computedStyle.paddingBottom} ${computedStyle.paddingLeft}`;
    const margin = `${computedStyle.marginTop} ${computedStyle.marginRight} ${computedStyle.marginBottom} ${computedStyle.marginLeft}`;
    const borderBottomColorHex = rgbToHex(computedStyle.borderBottomColor);
    const borderBottom = computedStyle.borderBottomStyle === 'none' || computedStyle.borderBottomWidth === '0px'
      ? 'none'
      : `${computedStyle.borderBottomWidth} ${computedStyle.borderBottomStyle} ${borderBottomColorHex}`;
    const borderColorHex = rgbToHex(computedStyle.borderColor);
    const border = computedStyle.borderStyle === 'none' || computedStyle.borderWidth === '0px'
      ? 'none'
      : `${computedStyle.borderWidth} ${computedStyle.borderStyle} ${borderColorHex}`;
    const borderRadius = computedStyle.borderRadius || '0px';
    const boxShadow = computedStyle.boxShadow === 'none' ? 'none' : computedStyle.boxShadow;
    const classNames = targetElement.className?.toString?.() || '';

    const hasTextNode = Array.from(targetElement.childNodes).some(
      (node) => node.nodeType === Node.TEXT_NODE && (node.textContent || '').trim().length > 0
    );
    const isTextElement = ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label', 'a', 'button', 'li', 'strong', 'em'].includes(targetElement.tagName.toLowerCase()) || hasTextNode;
    const primaryFontFamily = computedStyle.fontFamily
      .split(',')[0]
      .replace(/['"]/g, '')
      .trim();

    const currentStates: string[] = [];
    if (targetElement.matches(':hover')) currentStates.push('hover');
    if (targetElement.matches(':focus')) currentStates.push('focus');
    if (targetElement.matches(':focus-visible')) currentStates.push('focus-visible');
    if (targetElement.matches(':active')) currentStates.push('active');
    if (targetElement.matches(':disabled') || targetElement.getAttribute('aria-disabled') === 'true') currentStates.push('disabled');
    if (targetElement.matches(':checked') || targetElement.getAttribute('aria-checked') === 'true') currentStates.push('checked');
    if (targetElement.getAttribute('aria-expanded') === 'true') currentStates.push('expanded');
    if (targetElement.getAttribute('aria-selected') === 'true') currentStates.push('selected');

    const implementedStates = Array.from(new Set([
      ...(classNames.includes('hover:') ? ['hover'] : []),
      ...(classNames.includes('focus:') ? ['focus'] : []),
      ...(classNames.includes('focus-visible:') ? ['focus-visible'] : []),
      ...(classNames.includes('active:') ? ['active'] : []),
      ...(classNames.includes('disabled:') ? ['disabled'] : []),
      ...(classNames.includes('group-hover:') ? ['group-hover'] : []),
      ...(classNames.includes('peer-focus:') ? ['peer-focus'] : []),
      ...(targetElement.hasAttribute('aria-pressed') ? ['pressed (ARIA)'] : []),
      ...(targetElement.hasAttribute('aria-expanded') ? ['expanded (ARIA)'] : []),
      ...(targetElement.hasAttribute('aria-selected') ? ['selected (ARIA)'] : []),
    ]));

    const implementationHints: string[] = [];
    if (classNames.includes(':')) implementationHints.push('Tailwind pseudo-state variants');
    if (targetElement.hasAttribute('aria-pressed') || targetElement.hasAttribute('aria-expanded') || targetElement.hasAttribute('aria-selected') || targetElement.hasAttribute('aria-disabled')) {
      implementationHints.push('ARIA attributes');
    }
    if (targetElement.tagName === 'BUTTON' || targetElement.tagName === 'INPUT' || targetElement.tagName === 'SELECT' || targetElement.tagName === 'TEXTAREA') {
      implementationHints.push('Native interactive element states');
    }
    if (implementationHints.length === 0) implementationHints.push('No explicit state hooks detected');

    return {
      tagName: targetElement.tagName.toLowerCase(),
      selector: buildSelector(targetElement),
      isTextElement,
      fontSize: computedStyle.fontSize,
      fontFamily: primaryFontFamily || computedStyle.fontFamily,
      colorHex: rgbToHex(computedStyle.color),
      backgroundHex: rgbToHex(computedStyle.backgroundColor),
      display: computedStyle.display,
      width: computedStyle.width,
      height: computedStyle.height,
      alignItems: computedStyle.alignItems,
      gap: computedStyle.gap,
      flexShrink: computedStyle.flexShrink,
      alignSelf: computedStyle.alignSelf,
      position: computedStyle.position,
      zIndex: computedStyle.zIndex,
      borderBottom,
      border,
      borderRadius,
      boxShadow,
      padding,
      margin,
      currentStates,
      implementedStates,
      stateImplementation: implementationHints.join(' + ')
    };
  }, [buildSelector]);

  const copyText = React.useCallback(async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey((prev) => (prev === key ? '' : prev)), 1200);
    } catch {
      setCopiedKey('copy-error');
    }
  }, []);

  const copyAll = React.useCallback(() => {
    if (!inspectInfo) return;
    const payload = [
      `tag: ${inspectInfo.tagName}`,
      `selector: ${inspectInfo.selector}`,
      '',
      '[layout]',
      `display: ${inspectInfo.display}`,
      `position: ${inspectInfo.position}`,
      `z-index: ${inspectInfo.zIndex}`,
      `width: ${inspectInfo.width}`,
      `height: ${inspectInfo.height}`,
      `padding: ${inspectInfo.padding}`,
      `margin: ${inspectInfo.margin}`,
      `align-items: ${inspectInfo.alignItems}`,
      `gap: ${inspectInfo.gap}`,
      `flex-shrink: ${inspectInfo.flexShrink}`,
      `align-self: ${inspectInfo.alignSelf}`,
      '',
      '[style]',
      `border: ${inspectInfo.border}`,
      `border-radius: ${inspectInfo.borderRadius}`,
      `box-shadow: ${inspectInfo.boxShadow}`,
      `background: ${inspectInfo.backgroundHex}`,
      `color: ${inspectInfo.colorHex}`,
      `font-size: ${inspectInfo.fontSize}`,
      `font-family: ${inspectInfo.fontFamily}`,
      '',
      '[states]',
      `current: ${inspectInfo.currentStates.length > 0 ? inspectInfo.currentStates.join(', ') : 'default'}`,
      `implemented: ${inspectInfo.implementedStates.length > 0 ? inspectInfo.implementedStates.join(', ') : 'none'}`,
      `implementation: ${inspectInfo.stateImplementation}`
    ].join('\n');

    void copyText('copy-all', payload);
  }, [copyText, inspectInfo]);

  useEffect(() => {
    if (isEnabled) return;
    setIsLocked(false);
    setInspectInfo(null);
    setComponentInfo(null);
    ancestryRef.current = [];
    selectedElementRef.current = null;
    clearHighlight();
  }, [clearHighlight, isEnabled]);

  useEffect(() => {
    if (!isEnabled) return;

    const onMouseMove = (event: MouseEvent) => {
      if (isLocked) return;

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        setMousePos({ x: event.clientX, y: event.clientY });
        const hovered = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement | null;

        if (!hovered || hovered.closest('[data-dev-inspector-ui="true"]')) {
          clearHighlight();
          setInspectInfo(null);
          return;
        }

        const targetElement = hovered.closest('*') as HTMLElement | null;
        if (!targetElement || targetElement === document.body || targetElement === document.documentElement) {
          clearHighlight();
          setInspectInfo(null);
          return;
        }

        const ancestry = buildAncestry(targetElement);
        ancestryRef.current = ancestry;
        const selectedIdx = ancestry.length - 1;
        const target = ancestry[selectedIdx];
        applyHighlight(target.element);
        setInspectInfo(collectInspectInfo(target.element));
        setComponentInfo({ blockName: ancestry[0].label, labels: ancestry.map((a) => a.label), selectedIdx });
      });
    };

    const onMouseLeaveWindow = (event: MouseEvent) => {
      if (event.relatedTarget || isLocked) return;
      clearHighlight();
      setInspectInfo(null);
      setComponentInfo(null);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseLeaveWindow);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseLeaveWindow);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [applyHighlight, clearHighlight, collectInspectInfo, isEnabled, isLocked]);

  useEffect(() => {
    if (!isEnabled) return;

    const onClickCapture = (event: MouseEvent) => {
      const clickTarget = event.target as HTMLElement | null;
      if (!clickTarget) return;
      if (clickTarget.closest('[data-dev-inspector-ui="true"]')) return;

      const targetElement = clickTarget.closest('*') as HTMLElement | null;
      if (!targetElement || targetElement === document.body || targetElement === document.documentElement) return;

      setIsLocked(true);
      const ancestry = buildAncestry(targetElement);
      ancestryRef.current = ancestry;
      const selectedIdx = ancestry.length - 1;
      const target = ancestry[selectedIdx];
      selectedElementRef.current = target.element;
      applyHighlight(target.element);
      setInspectInfo(collectInspectInfo(target.element));
      setComponentInfo({ blockName: ancestry[0].label, labels: ancestry.map((a) => a.label), selectedIdx });
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLocked(false);
        selectedElementRef.current = null;
      }
    };

    window.addEventListener('click', onClickCapture, true);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('click', onClickCapture, true);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [applyHighlight, collectInspectInfo, isEnabled]);

  const handleAncestrySelect = React.useCallback((idx: number) => {
    const item = ancestryRef.current[idx];
    if (!item) return;
    applyHighlight(item.element);
    setInspectInfo(collectInspectInfo(item.element));
    setComponentInfo((prev) => prev ? { ...prev, selectedIdx: idx } : null);
  }, [applyHighlight, collectInspectInfo]);

  return (
    <>
      {showDeveloperSwitch && (
        <div data-dev-inspector-ui="true" className="fixed bottom-6 left-6 z-[300] pointer-events-auto">
          <div className="bg-white border border-[#DCE3F0] shadow-[0_8px_20px_rgba(15,23,42,0.16)] rounded-2xl px-3 py-2">
            <div className="flex items-center gap-3">
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] uppercase tracking-wider text-[#64748B] font-semibold">Dev Mode</span>
                <span className={`text-[11px] font-semibold ${isLocked ? 'text-[#0B57D0]' : 'text-[#111827]'}`}>
                  {isLocked ? 'Locked' : 'Inspect'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsEnabled((prev) => !prev)}
                className={`relative h-7 w-12 rounded-full transition-colors duration-200 ${isEnabled ? 'bg-[#0B57D0]' : 'bg-[#CBD5E1]'}`}
                aria-pressed={isEnabled}
                aria-label="Alternar modo desarrollador"
              >
                <span
                  className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-[0_1px_4px_rgba(15,23,42,0.25)] transition-all duration-200 ${isEnabled ? 'left-[22px]' : 'left-[2px]'}`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {isEnabled && inspectInfo && (
        <div
          data-dev-inspector-ui="true"
          className="fixed right-0 top-0 z-[320] h-screen w-[336px] pointer-events-auto border-l border-[#E5E7EB] bg-[#F7F7F9]"
        >
          <div className="h-full overflow-y-auto select-text">
            <div className="px-4 py-3 border-b border-[#E5E7EB] bg-white sticky top-0 z-10">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-[#64748B] font-semibold mb-0.5">Componente</p>
                  <span className="text-[13px] font-bold text-[#111827] truncate block">{componentInfo?.blockName || inspectInfo.tagName}</span>
                </div>
                <button
                  type="button"
                  onClick={copyAll}
                  className="flex-shrink-0 text-[11px] font-semibold text-[#0B57D0] px-2 py-1 rounded-md hover:bg-[#EEF2FF]"
                >
                  {copiedKey === 'copy-all' ? 'Copiado' : 'Copiar'}
                </button>
              </div>
              {componentInfo && componentInfo.labels.length > 1 && (
                <div className="mb-2">
                  <p className="text-[10px] uppercase tracking-wider text-[#64748B] font-semibold mb-1">Nivel</p>
                  <select
                    value={componentInfo.selectedIdx}
                    onChange={(e) => handleAncestrySelect(Number(e.target.value))}
                    className="w-full text-[11px] font-medium text-[#111827] bg-[#F1F5F9] border border-[#E2E8F0] rounded-md px-2 py-1.5 outline-none focus:border-[#0B57D0] cursor-pointer"
                  >
                    {componentInfo.labels.map((label, i) => (
                      <option key={i} value={i}>{i === 0 ? `⬛ ${label}` : `${'  '.repeat(i)}↳ ${label}`}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsLocked((prev) => !prev)}
                  className="text-[11px] font-semibold px-2 py-1 rounded-md bg-[#EEF2FF] text-[#1D4ED8] hover:bg-[#E0EAFF]"
                >
                  {isLocked ? 'Desbloquear (Esc)' : 'Bloquear con clic'}
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <section className="rounded-lg border border-[#E5E7EB] bg-white p-3">
                <h4 className="text-[12px] font-semibold text-[#111827] mb-2">Layout</h4>
                <div className="rounded-md border border-[#E5E7EB] bg-[#FAFAFA] p-2.5 font-mono text-[11px] leading-5 text-[#374151]">
                  <div>display: <span className="text-[#DB2777]">{inspectInfo.display}</span>;</div>
                  <div>position: <span className="text-[#DB2777]">{inspectInfo.position}</span>; z-index: <span className="text-[#DB2777]">{inspectInfo.zIndex}</span>;</div>
                  <div>width: <span className="text-[#DB2777]">{inspectInfo.width}</span>;</div>
                  <div>height: <span className="text-[#DB2777]">{inspectInfo.height}</span>;</div>
                  <div>padding: <span className="text-[#DB2777]">{inspectInfo.padding}</span>;</div>
                  <div>margin: <span className="text-[#DB2777]">{inspectInfo.margin}</span>;</div>
                  <div>align-items: <span className="text-[#DB2777]">{inspectInfo.alignItems}</span>;</div>
                  <div>gap: <span className="text-[#DB2777]">{inspectInfo.gap}</span>;</div>
                  <div>flex-shrink: <span className="text-[#DB2777]">{inspectInfo.flexShrink}</span>;</div>
                  <div>align-self: <span className="text-[#DB2777]">{inspectInfo.alignSelf}</span>;</div>
                </div>
              </section>

              <section className="rounded-lg border border-[#E5E7EB] bg-white p-3">
                <h4 className="text-[12px] font-semibold text-[#111827] mb-2">Style</h4>
                <div className="rounded-md border border-[#E5E7EB] bg-[#FAFAFA] p-2.5 font-mono text-[11px] leading-5 text-[#374151]">
                  <div>border: <span className="text-[#DB2777]">{inspectInfo.border}</span>;</div>
                  <div>border-radius: <span className="text-[#DB2777]">{inspectInfo.borderRadius}</span>;</div>
                  <div>box-shadow: <span className="text-[#DB2777] break-all">{inspectInfo.boxShadow}</span>;</div>
                  <div>background: <span className="text-[#DB2777]">{inspectInfo.backgroundHex}</span>;</div>
                  <div>color: <span className="text-[#DB2777]">{inspectInfo.colorHex}</span>;</div>
                  <div>font-size: <span className="text-[#DB2777]">{inspectInfo.fontSize}</span>;</div>
                  {inspectInfo.isTextElement && (
                    <div>font-family: <span className="text-[#DB2777]">{inspectInfo.fontFamily}</span>;</div>
                  )}
                </div>

                <div className="mt-3 space-y-2 text-[11px] text-[#4B5563]">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="h-3.5 w-3.5 rounded-sm border border-[#D1D5DB]" style={{ backgroundColor: inspectInfo.backgroundHex }} />
                      <span className="truncate">Background {inspectInfo.backgroundHex}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => void copyText('bg', inspectInfo.backgroundHex)}
                      className="text-[10px] font-semibold text-[#0B57D0] px-1.5 py-1 rounded hover:bg-[#EEF2FF]"
                    >
                      {copiedKey === 'bg' ? 'Copiado' : 'Copiar'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="h-3.5 w-3.5 rounded-sm border border-[#D1D5DB]" style={{ backgroundColor: inspectInfo.colorHex }} />
                      <span className="truncate">Text {inspectInfo.colorHex}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => void copyText('color', inspectInfo.colorHex)}
                      className="text-[10px] font-semibold text-[#0B57D0] px-1.5 py-1 rounded hover:bg-[#EEF2FF]"
                    >
                      {copiedKey === 'color' ? 'Copiado' : 'Copiar'}
                    </button>
                  </div>
                </div>
              </section>

              <section className="rounded-lg border border-[#E5E7EB] bg-white p-3">
                <h4 className="text-[12px] font-semibold text-[#111827] mb-2">States</h4>
                <div className="space-y-2 text-[11px] text-[#374151]">
                  <div>
                    <p className="text-[#6B7280] mb-1">Current state</p>
                    <p className="font-medium text-[#111827]">{inspectInfo.currentStates.length > 0 ? inspectInfo.currentStates.join(', ') : 'default'}</p>
                  </div>
                  <div>
                    <p className="text-[#6B7280] mb-1">Implemented states</p>
                    <p className="font-medium text-[#111827] break-words">{inspectInfo.implementedStates.length > 0 ? inspectInfo.implementedStates.join(', ') : 'No detectados'}</p>
                  </div>
                  <div>
                    <p className="text-[#6B7280] mb-1">How it was implemented</p>
                    <p className="font-medium text-[#111827] break-words">{inspectInfo.stateImplementation}</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {isEnabled && !inspectInfo && (
        <div data-dev-inspector-ui="true" className="fixed right-0 top-0 z-[300] h-screen w-[336px] pointer-events-auto border-l border-[#E5E7EB] bg-[#F7F7F9]">
          <div className="px-4 py-3 border-b border-[#E5E7EB] bg-white">
            <span className="text-[12px] font-semibold text-[#111827]">Inspect</span>
          </div>
          <div className="p-4">
            <div className="rounded-lg border border-dashed border-[#CBD5E1] bg-white p-4 text-[12px] text-[#64748B] space-y-2">
              <p>Pasa el mouse sobre cualquier elemento para ver sus propiedades CSS.</p>
              <p className="text-[#0B57D0] font-medium">Al hacer clic el componente funciona normalmente y el panel se bloquea en ese elemento. Presiona Esc para desbloquear.</p>
            </div>
          </div>
        </div>
      )}

      {isEnabled && inspectInfo && !isLocked && (
        <div
          data-dev-inspector-ui="true"
          className="fixed z-[350] pointer-events-none"
          style={{ left: mousePos.x + 16, top: mousePos.y + 16 }}
        >
          <div className="bg-[#1D3461] text-white text-[10px] font-mono px-2 py-1 rounded-md shadow-lg whitespace-nowrap flex items-center gap-1.5">
            <span className="text-[#7DD3FC]">{inspectInfo.tagName}</span>
            <span className="text-[#94A3B8]">·</span>
            <span>{componentInfo?.blockName || inspectInfo.selector}</span>
          </div>
        </div>
      )}
    </>
  );
};

// ─── Component States Panel (para exportar a Figma) ─────────────────────────
const ComponentStatesModal = ({ onClose }: { onClose: () => void }) => {
  const docOptions = [
    { value: 'cc', label: 'Cédula de ciudadanía' },
    { value: 'ce', label: 'Cédula de extranjería' },
    { value: 'ti', label: 'Tarjeta de identidad' },
    { value: 'pasaporte', label: 'Pasaporte' },
    { value: 'cd', label: 'Carné diplomático' },
    { value: 'ppt', label: 'Permiso por protección temporal' },
  ];

  const Tag = ({ label, color }: { label: string; color: 'green' | 'red' | 'blue' | 'purple' }) => {
    const styles = {
      green: 'bg-green-100 text-green-700',
      red: 'bg-red-100 text-red-700',
      blue: 'bg-[#EEF5FF] text-[#00008F]',
      purple: 'bg-purple-100 text-purple-700',
    };
    return <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${styles[color]}`}>{label}</span>;
  };

  const SectionHeader = ({ title, tag, color }: { title: string; tag: string; color: 'green' | 'red' | 'blue' | 'purple' }) => (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF]">{title}</span>
      <Tag label={tag} color={color} />
    </div>
  );

  return (
    <div className="fixed inset-0 z-[400] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ type: 'spring', damping: 28, stiffness: 340 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
        style={{ fontFamily: "'Source Sans 3', 'Inter', sans-serif" }}
      >
        {/* Header */}
        <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-base font-bold text-[#1A1D21]">Estados de componentes</h2>
            <p className="text-[12px] text-gray-400 mt-0.5">Todos los estados visibles para exportar al plugin de Figma</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Grid content */}
        <div className="overflow-y-auto p-6 grid grid-cols-2 gap-5">

          {/* 1. Dropdown abierto */}
          <div className="bg-[#FAFBFC] rounded-xl p-4 border border-gray-200">
            <SectionHeader title="Select / Dropdown" tag="Abierto" color="green" />
            {/* Trigger activo */}
            <div className="flex items-stretch h-11 border-2 border-[#00008F] rounded-[8px] overflow-hidden mb-1">
              <div className="flex items-center justify-center w-12 h-11 bg-[#00008F]">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 h-11 flex items-center justify-between px-3 bg-white">
                <span className="text-[15px] text-[#606776]">Seleccionar</span>
                <ChevronDown className="w-4 h-4 text-[#00008F] rotate-180" />
              </div>
            </div>
            {/* Lista desplegada */}
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md bg-white">
              {docOptions.map((opt, i) => (
                <div
                  key={opt.value}
                  className={`relative flex items-center h-10 border-b border-gray-50 last:border-0 ${i === 0 ? 'bg-[#EEF5FF]' : 'bg-white'}`}
                >
                  {i === 0 && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#00008F] rounded-r" />}
                  <span className={`text-[13px] pl-4 ${i === 0 ? 'font-semibold text-[#00008F]' : 'text-[#374151]'}`}>{opt.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Select con valor seleccionado */}
          <div className="bg-[#FAFBFC] rounded-xl p-4 border border-gray-200">
            <SectionHeader title="Select" tag="Con valor" color="blue" />
            <div className="flex items-stretch h-11 border border-green-600 rounded-[8px] overflow-hidden">
              <div className="flex items-center justify-center w-12 h-11 bg-green-600">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 h-11 flex items-center justify-between px-3 bg-white">
                <span className="text-[15px] text-[#1A1D21]">Cédula de ciudadanía</span>
                <div className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-green-600" />
                  <ChevronDown className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Input con error */}
          <div className="bg-[#FAFBFC] rounded-xl p-4 border border-gray-200">
            <SectionHeader title="Input" tag="Error" color="red" />
            <div className="flex flex-col gap-1">
              <div className="flex items-stretch h-11 border border-[#880727] rounded-[8px] overflow-hidden bg-[#FFF5F7]">
                <div className="flex items-center justify-center w-12 h-11 bg-[#880727]">
                  <IdCard className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 h-11 flex items-center justify-between px-3">
                  <span className="text-[15px] text-[#1A1D21]">8888</span>
                  <AlertCircle className="w-5 h-5 text-[#880727]" />
                </div>
              </div>
              <span className="text-sm text-[#880727] font-medium">Introduce un valor válido</span>
            </div>
          </div>

          {/* 4. Input válido */}
          <div className="bg-[#FAFBFC] rounded-xl p-4 border border-gray-200">
            <SectionHeader title="Input" tag="Válido" color="blue" />
            <div className="flex items-stretch h-11 border border-green-600 rounded-[8px] overflow-hidden">
              <div className="flex items-center justify-center w-12 h-11 bg-green-600">
                <IdCard className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 h-11 flex items-center justify-between px-3 bg-white">
                <span className="text-[15px] text-[#1A1D21]">1047123456</span>
                <Check className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          {/* 5. Input enfocado */}
          <div className="bg-[#FAFBFC] rounded-xl p-4 border border-gray-200">
            <SectionHeader title="Input" tag="Enfocado" color="blue" />
            <div className="flex items-stretch h-11 border-2 border-[#00008F] rounded-[8px] overflow-hidden ring-2 ring-[#00008F]/20">
              <div className="flex items-center justify-center w-12 h-11 bg-[#00008F]">
                <IdCard className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 h-11 flex items-center px-3 bg-white gap-0.5">
                <span className="text-[15px] text-[#606776]">Número de identificación</span>
                <span className="w-[2px] h-5 bg-[#00008F] animate-pulse rounded-full" />
              </div>
            </div>
          </div>

          {/* 6. Input vacío (placeholder) */}
          <div className="bg-[#FAFBFC] rounded-xl p-4 border border-gray-200">
            <SectionHeader title="Input" tag="Placeholder" color="purple" />
            <div className="flex items-stretch h-11 border border-gray-300 rounded-[8px] overflow-hidden">
              <div className="flex items-center justify-center w-12 h-11 bg-gray-200">
                <IdCard className="w-5 h-5 text-gray-500" />
              </div>
              <div className="flex-1 h-11 flex items-center px-3 bg-white">
                <span className="text-[15px] text-[#606776]">Número de identificación</span>
              </div>
            </div>
          </div>

          {/* 7. Tooltip — ocupa full width */}
          <div className="col-span-2 bg-[#FAFBFC] rounded-xl p-4 border border-gray-200">
            <SectionHeader title="Tooltip" tag="Activo / Visible" color="green" />
            <div className="flex items-start gap-8">

              {/* Tooltip tipo documento */}
              <div className="flex flex-col items-start gap-1">
                <p className="text-[11px] text-gray-400 mb-2">Tipo de documento</p>
                <div className="relative inline-flex">
                  <div className="w-4 h-4 bg-[#606776] rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold leading-none">i</span>
                  </div>
                  {/* Tooltip box fijo hacia arriba */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-4 bg-gray-900 text-white text-[12px] rounded-xl shadow-2xl leading-relaxed whitespace-normal z-10 pointer-events-none">
                    Este registro corresponde a una <strong>persona natural</strong>. Por este motivo, el tipo de documento <strong>NIT</strong> no está disponible.
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-gray-900" />
                  </div>
                </div>
                <div className="h-20" /> {/* Espacio para el tooltip */}
              </div>

              {/* Tooltip afiliación */}
              <div className="flex flex-col items-start gap-1 flex-1">
                <p className="text-[11px] text-gray-400 mb-2">Número de afiliación</p>
                <div className="relative inline-flex">
                  <div className="w-4 h-4 bg-[#606776] rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold leading-none">i</span>
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 p-4 bg-gray-900 text-white text-[12px] rounded-xl shadow-2xl leading-relaxed whitespace-normal z-10 pointer-events-none">
                    Verifica el número de afiliación con la empresa o consúltalo en el Portal Transaccional ARL, opción Certificados.
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-gray-900" />
                  </div>
                </div>
                <div className="h-20" />
              </div>

              {/* Tooltip debajo (afiliación en pantalla HSEQ, aparece hacia abajo) */}
              <div className="flex flex-col items-start gap-1 flex-1">
                <p className="text-[11px] text-gray-400 mb-2">Tooltip callout (HSEQ)</p>
                <div className="w-full max-w-xs p-3 bg-gray-900 text-white text-[12px] rounded-xl shadow-xl leading-relaxed relative">
                  <div className="absolute -top-2 left-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-gray-900" />
                  Verifica el número de afiliación con la empresa o consúltalo en el Portal Transaccional ARL, opción Certificados.
                </div>
              </div>

            </div>
          </div>

          {/* 8. Rol — Trabajador seleccionado */}
          <div className="bg-[#FAFBFC] rounded-xl p-4 border border-gray-200">
            <SectionHeader title="Selecciona tu rol" tag="Trabajador" color="blue" />
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-[#1A1D21]">Selecciona tu rol *</label>
              <div className="flex gap-6 items-center">
                {/* Trabajador — SELECCIONADO */}
                <div className="flex items-center gap-3">
                  <div className="relative w-7 h-7 rounded-full border-2 border-[#00008F] bg-[#F8FAFF] flex-shrink-0">
                    <span className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00008F]" />
                  </div>
                  <span className="text-sm font-semibold text-[#00008F]">Trabajador</span>
                </div>
                {/* HSEQ — no seleccionado */}
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full border-2 border-[#C7CAD1] bg-[#F8FAFF] flex-shrink-0" />
                  <span className="text-sm text-gray-700">Soy usuario HSEQ</span>
                </div>
              </div>
            </div>
          </div>

          {/* 9. Rol — HSEQ seleccionado */}
          <div className="bg-[#FAFBFC] rounded-xl p-4 border border-gray-200">
            <SectionHeader title="Selecciona tu rol" tag="Usuario HSEQ" color="green" />
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-[#1A1D21]">Selecciona tu rol *</label>
              <div className="flex gap-6 items-center">
                {/* Trabajador — no seleccionado */}
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full border-2 border-[#C7CAD1] bg-[#F8FAFF] flex-shrink-0" />
                  <span className="text-sm text-gray-700">Trabajador</span>
                </div>
                {/* HSEQ — SELECCIONADO */}
                <div className="flex items-center gap-3">
                  <div className="relative w-7 h-7 rounded-full border-2 border-[#00008F] bg-[#F8FAFF] flex-shrink-0">
                    <span className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00008F]" />
                  </div>
                  <span className="text-sm font-semibold text-[#00008F]">Soy usuario HSEQ</span>
                </div>
              </div>
            </div>
          </div>

          {/* 10. Contraseña — En proceso */}
          <div className="bg-[#FAFBFC] rounded-xl p-4 border border-gray-200">
            <SectionHeader title="Contraseña" tag="En proceso" color="purple" />
            <div className="flex flex-col gap-3">
              {/* Campo enfocado */}
              <div className="flex items-stretch h-11 border-2 border-[#00008F] rounded-[8px] overflow-hidden ring-2 ring-[#00008F]/20">
                <div className="flex items-center justify-center w-12 h-11 bg-[#00008F] flex-shrink-0">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 h-11 flex items-center justify-between px-3 bg-white">
                  <span className="text-[16px] text-[#1A1D21] tracking-[0.18em]">••••••••</span>
                  <Eye className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
              </div>
              {/* Panel de requisitos — parcialmente cumplidos */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                <h3 className="text-[12px] font-bold text-gray-800 mb-1.5">Tu contraseña debe cumplir con:</h3>
                <div className="h-px bg-gray-100 w-full mb-2" />
                <div className="grid grid-cols-2 gap-x-4">
                  <div>
                    <p className="text-[11px] font-bold text-gray-800 mb-1">Debe contener:</p>
                    <PasswordRequirement met={false} text="Mínimo 10 caracteres" />
                    <PasswordRequirement met={true} text="Una mayúscula" />
                    <PasswordRequirement met={true} text="Una minúscula" />
                    <PasswordRequirement met={true} text="Un número" />
                    <PasswordRequirement met={false} text="Un carácter especial #?!@$%*+-=_" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-800 mb-1">No debe contener:</p>
                    <PasswordRequirementNoStrike met={true} text="Secuencias numéricas (ej: 1234)" />
                    <PasswordRequirementNoStrike met={true} text="Tu número de documento" />
                    <PasswordRequirementNoStrike met={true} text="Tus nombres o apellidos" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 9. Contraseña — Completada */}
          <div className="bg-[#FAFBFC] rounded-xl p-4 border border-gray-200">
            <SectionHeader title="Contraseña" tag="Completada" color="green" />
            <div className="flex flex-col gap-3">
              {/* Campo válido */}
              <div className="flex items-stretch h-11 border border-green-600 rounded-[8px] overflow-hidden">
                <div className="flex items-center justify-center w-12 h-11 bg-green-600 flex-shrink-0">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 h-11 flex items-center justify-between px-3 bg-white">
                  <span className="text-[16px] text-[#1A1D21] tracking-[0.18em]">••••••••••</span>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Check className="w-5 h-5 text-green-600" />
                    <Eye className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
              {/* Panel de requisitos — todos cumplidos */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                <h3 className="text-[12px] font-bold text-gray-800 mb-1.5">Tu contraseña debe cumplir con:</h3>
                <div className="h-px bg-gray-100 w-full mb-2" />
                <div className="grid grid-cols-2 gap-x-4">
                  <div>
                    <p className="text-[11px] font-bold text-gray-800 mb-1">Debe contener:</p>
                    <PasswordRequirement met={true} text="Mínimo 10 caracteres" />
                    <PasswordRequirement met={true} text="Una mayúscula" />
                    <PasswordRequirement met={true} text="Una minúscula" />
                    <PasswordRequirement met={true} text="Un número" />
                    <PasswordRequirement met={true} text="Un carácter especial #?!@$%*+-=_" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-800 mb-1">No debe contener:</p>
                    <PasswordRequirementNoStrike met={true} text="Secuencias numéricas (ej: 1234)" />
                    <PasswordRequirementNoStrike met={true} text="Tu número de documento" />
                    <PasswordRequirementNoStrike met={true} text="Tus nombres o apellidos" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

const App = () => {
  const [step, setStep] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [emailCodeSent, setEmailCodeSent] = useState(false);
  const [phoneCodeSent, setPhoneCodeSent] = useState(false);
  const [timer, setTimer] = useState(299);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [affiliationFocused, setAffiliationFocused] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [activeModal, setActiveModal] = useState<StatusModalType>(null);
  const [otpError, setOtpError] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [showEmailTemplate, setShowEmailTemplate] = useState(false);
  const [showSMSTemplate, setShowSMSTemplate] = useState(false);
  const [emailTemplateType, setEmailTemplateType] = useState<EmailTemplateType>('otp');
  const [showEmailOptions, setShowEmailOptions] = useState(false);
  const [showUserEmailOptions, setShowUserEmailOptions] = useState(false);
  const [showTestShortcuts, setShowTestShortcuts] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualModalType, setManualModalType] = useState<'hseq' | 'general'>('hseq');
  const [showComponentStates, setShowComponentStates] = useState(false);

  const handleEmailSelect = (type: EmailTemplateType) => {
    if (type === 'hseq_confirmation') {
      setShowEmailOptions(false);
      setShowUserEmailOptions(false);
      setIsSendingHSEQ(true);
      setTimeout(() => {
        setIsSendingHSEQ(false);
        setEmailTemplateType(type);
        setShowEmailTemplate(true);
      }, 2500);
    } else {
      setEmailTemplateType(type);
      setShowEmailTemplate(true);
      setShowEmailOptions(false);
      setShowUserEmailOptions(false);
    }
  };
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Enviando solicitud');
  const [isSendingHSEQ, setIsSendingHSEQ] = useState(false);
  const [showHSEQSuccess, setShowHSEQSuccess] = useState(false);
  const [isAlreadyRegisteredShortcut, setIsAlreadyRegisteredShortcut] = useState(false);
  const [isPreRegisteredHSEQ, setIsPreRegisteredHSEQ] = useState(false);
  const [hseqValidationFailed, setHseqValidationFailed] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [otpLimitErrorType, setOtpLimitErrorType] = useState<null | 'limit1' | 'limit2'>(null);
  const showEmailPreviewIcons = false;
  const isDevEnvironment = import.meta.env.DEV;

  useEffect(() => {
    // Force tour for current testing session
    setTourStep(1);
    
    // Normal persistence logic
    const hasSeenTour = localStorage.getItem('arl_onboarding_seen');
    if (!hasSeenTour) {
      setTourStep(1);
    }
  }, []);

  const finishTour = () => {
    setTourStep(0);
    localStorage.setItem('arl_onboarding_seen', 'true');
  };
  
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState({
    docType: '',
    docNumber: '',
    userRole: '', // 'worker' o 'hseq'
    firstName: '',
    lastName: '',
    isHSEQ: false,
    companyName: '',
    companyDocType: 'nit',
    companyDocNumber: '',
    affiliationNumber: '',
    email: '',
    confirmEmail: '',
    phone: '',
    confirmPhone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptPrivacy: false,
  });

  // Flow identification for the new onboarding/status bar
  const activeFlow = (() => {
    if (formData.docNumber === '111111') return {
      id: 4,
      name: "Usuario ya registrado",
      description: "Acceso directo a recuperación para cuenta existente",
      color: "#6B46C1", // Purple
      icon: <UserCheck className="w-4 h-4" />
    };
    if (formData.docNumber === '333333') return {
      id: 5,
      name: "Flujo simplificado",
      description: "Registro rol independiente",
      color: "#10B981", // Green
      icon: <User className="w-4 h-4" />
    };
    if (formData.isHSEQ) {
      if (hseqValidationFailed) return {
        id: 3,
        name: "HSEQ con incidencia",
        description: "Afiliación no validada, registro degradado a trabajador",
        color: "#D75D3D", // Orange
        icon: <AlertCircle className="w-4 h-4" />
      };
      return {
        id: 2,
        name: "HSEQ en proceso",
        description: "Flujo completo de registro con validación de empresa",
        color: "#027180", // Teal
        icon: <ShieldCheck className="w-4 h-4" />
      };
    }
    return {
      id: 1,
      name: "Trabajador Estándar",
      description: "Flujo básico de registro para persona natural",
      color: "#00008F", // Blue
      icon: <User className="w-4 h-4" />
    };
  })();

  useEffect(() => {
    let interval: any;
    if ((emailCodeSent || phoneCodeSent) && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [emailCodeSent, phoneCodeSent, timer]);

  const handleInputChange = (field: string, value: any) => {
    let finalValue = value;
    
    // Restriction: Only allow alphabetical characters for names
    if (field === 'firstName' || field === 'lastName') {
      if (typeof value === 'string') {
        finalValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
      }
    }

    setFormData((prev) => ({ ...prev, [field]: finalValue }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateDocNumber = (val: string) => /^\d{6,15}$/.test(val);
  const validateCompanyDocNumber = (val: string) => val.trim() !== '8888' && /^[a-zA-Z0-9]{3,20}$/.test(val.trim());
  const validateName = (val: string) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/.test(val.trim());
  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const validatePhone = (val: string) => /^3\d{9}$/.test(val);

  const passReqs = {
    length: formData.password.length >= 10,
    upper: /[A-Z]/.test(formData.password),
    lower: /[a-z]/.test(formData.password),
    number: /\d/.test(formData.password),
    special: /[#?!@$%*+\-=_]/.test(formData.password),
    noSequence: !/(0123|1234|2345|3456|4567|5678|6789|7890|0987|9876|8765|7654|6543|5432|4321|3210)/.test(formData.password),
    noDoc: !formData.password.includes(formData.docNumber) || formData.docNumber === '',
    noNames: !(
      (formData.firstName && formData.password.toLowerCase().includes(formData.firstName.toLowerCase())) || 
      (formData.lastName && formData.password.toLowerCase().includes(formData.lastName.toLowerCase()))
    )
  };

  const isPasswordValid = Object.values(passReqs).every(v => v);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';

  const errors = {
    docNumber: touched.docNumber && !validateDocNumber(formData.docNumber) ? "Introduce un valor válido" : undefined,
    firstName: touched.firstName && !validateName(formData.firstName) ? "Introduce un valor válido" : undefined,
    lastName: touched.lastName && !validateName(formData.lastName) ? "Introduce un valor válido" : undefined,
    email: touched.email && formData.email === 'correo20@gmail.com' 
      ? <span>Por favor intenta con un correo electrónico diferente o si quieres comunícate con asesoría virtual (<span className="font-bold text-[#C91432]">asesoriavirtual.axacolpatria.@axacolpatria.co</span>)</span>
      : touched.email && !validateEmail(formData.email) ? "Introduce un correo electrónico válido" : undefined,
    confirmEmail: touched.confirmEmail && !validateEmail(formData.confirmEmail)
      ? "Introduce un correo electrónico válido"
      : touched.confirmEmail && (formData.email !== formData.confirmEmail)
        ? "Los correos no coinciden"
        : undefined,
    phone: touched.phone && formData.phone === '3051111111'
      ? <span>Por favor intenta con un numero de celular diferente o si quieres comunicate con asesoria virtual (<span className="font-bold text-[#C91432]">asesoriavirtual,axacolpatria@axacolpatria.co</span>)</span>
      : touched.phone && !validatePhone(formData.phone) ? "Diligencia un valor correcto" : undefined,
    confirmPhone: touched.confirmPhone && !validatePhone(formData.confirmPhone)
      ? "Diligencia un valor correcto"
      : touched.confirmPhone && (formData.phone !== formData.confirmPhone)
        ? "Número de celular no coincide"
        : undefined,
    confirmPassword: touched.confirmPassword && (formData.password !== formData.confirmPassword) ? "Las contraseñas no coinciden" : undefined,
    companyDocNumber: touched.companyDocNumber && !validateCompanyDocNumber(formData.companyDocNumber) ? "Introduce un valor válido" : undefined,
  };

  const isStep1Valid = formData.docType !== '' && validateDocNumber(formData.docNumber);
  const isPersonalValid = validateName(formData.firstName) && validateName(formData.lastName) && (formData.docNumber === '333333' || formData.userRole !== '');
  const isCompanyValid = formData.companyDocType !== '' && validateCompanyDocNumber(formData.companyDocNumber) && validateDocNumber(formData.affiliationNumber);
  const isEmailValid = validateEmail(formData.email) && formData.email === formData.confirmEmail && formData.email !== 'correo20@gmail.com';
  const isPhoneValid = validatePhone(formData.phone) && formData.phone !== '3051111111' && formData.phone === formData.confirmPhone;
  const isOtpComplete = otp.every(digit => digit !== '');
  const isOtpTimeoutWithoutCode = timer === 0 && otp.every((digit) => digit === '');

  const docTypeOptions = [
    { value: 'cc', label: 'Cédula de ciudadanía' },
    { value: 'ce', label: 'Cédula de extranjería' },
    { value: 'nit', label: 'NIT' },
    { value: 'ti', label: 'Tarjeta de identidad' },
    { value: 'pasaporte', label: 'Pasaporte' },
    { value: 'cd', label: 'Carné diplomático' },
    { value: 'sp', label: 'Salvoconducto permanencia' },
    { value: 'pep', label: 'Permiso especial de permanencia' },
    { value: 'ppt', label: 'Permiso por protección temporal' }
  ];

  const allowedDocTypes = ['cc', 'ce', 'ti', 'pasaporte', 'cd', 'ppt'];
  const docTypeOptionsHSEQ = docTypeOptions.filter(opt => allowedDocTypes.includes(opt.value));
  const docTypeOptionsPerson = docTypeOptionsHSEQ;

  const nextStep = () => {
    if (step === 1 && isStep1Valid) {
      if (formData.docNumber === '111111') {
        setIsFinished(true);
        setIsAlreadyRegisteredShortcut(true);
      } else if (formData.docNumber === '222222') {
        setActiveModal('no_products');
      } else if (formData.docNumber === '444444') {
        setActiveModal('already_done');
      } else {
        setStep(2);
      }
    } else if (step === 2 && isPersonalValid) {
      setStep(formData.isHSEQ ? 3 : 4);
    } else if (step === 3 && isCompanyValid) {
      if (formData.affiliationNumber !== '123456') {
        setActiveModal('affiliation_not_found' as any);
      } else {
        setStep(4);
      }
    } else if (step === 4) {
      if (!emailCodeSent) { 
        setEmailCodeSent(true); 
        setTimer(299); 
        setOtp(['','','','','','']); 
        setOtpError(false);
        setOtpSuccess(false);
      } else if (isOtpComplete) { 
        if (otp.join('') === '123456') {
          setOtpSuccess(true);
          setTimeout(() => {
            setStep(5); 
            setOtp(['','','','','','']); 
            setEmailCodeSent(false); 
            setOtpError(false);
            setOtpSuccess(false);
          }, 1500);
        } else {
          setOtpError(true);
          setOtpSuccess(false);
        }
      }
    } else if (step === 5) {
      if (!phoneCodeSent) { 
        setPhoneCodeSent(true); 
        setTimer(299); 
        setOtp(['','','','','','']); 
        setOtpError(false);
        setOtpSuccess(false);
        // Removed auto-show to avoid being invasive
      } else if (isOtpComplete) { 
        if (otp.join('') === '123456') {
          setOtpSuccess(true);
          setTimeout(() => {
            setStep(6); 
            setOtpError(false);
            setOtpSuccess(false);
          }, 1500);
        } else {
          setOtpError(true);
          setOtpSuccess(false);
        }
      }
    } else if (step === 6 && isPasswordValid && passwordsMatch && formData.acceptTerms && formData.acceptPrivacy) {
      setIsFinished(true);
    }
  };

  const prevStep = () => {
    if (step === 6) setStep(5);
    else if (step === 5) { 
      if (phoneCodeSent) {
        setPhoneCodeSent(false); 
        setOtpSuccess(false);
        setOtpError(false);
      } else {
        setStep(4); 
      }
    }
    else if (step === 4) { 
      if (emailCodeSent) {
        setEmailCodeSent(false); 
        setOtpSuccess(false);
        setOtpError(false);
      } else {
        setStep(formData.isHSEQ ? 3 : 2); 
      }
    }
    else if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  };

  const handleResendCode = () => {
    setTimer(299);
    setOtp(['', '', '', '', '', '']);
    setOtpError(false);
    setOtpSuccess(false);
    setOtpLimitErrorType(null);
    setTimeout(() => {
      document.getElementById('otp-0')?.focus();
    }, 0);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    setOtpError(false);
    setOtpSuccess(false);
    setOtpLimitErrorType(null);
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) document.getElementById(`otp-${index + 1}`)?.focus();
  };

  const triggerOtpLimitError = (type: 'limit1' | 'limit2') => {
    setOtp(['9', '9', '9', '9', '9', '9']);
    setOtpError(true);
    setOtpSuccess(false);
    setOtpLimitErrorType(type);
  };

  const totalStepsInBar = formData.isHSEQ ? 5 : 4;
  let currentDisplayStep = 0;
  if (step === 2) currentDisplayStep = 1;
  else if (step === 3) currentDisplayStep = 2;
  else if (step === 4) currentDisplayStep = formData.isHSEQ ? 3 : 2;
  else if (step === 5) currentDisplayStep = formData.isHSEQ ? 4 : 3;
  else if (step === 6) currentDisplayStep = formData.isHSEQ ? 5 : 4;

  const indicatorLabel = 
    step === 2 ? "Datos básicos" :
    step === 3 ? "Datos básicos de la empresa" :
    step === 4 ? "Validación del correo electrónico" :
    step === 5 ? "Validación del número de celular" :
    step === 6 ? "Creación de contraseña" : "Datos básicos";

  const currentStepTitle = 
    step === 2 ? "Por favor, diligencia tus datos personales básicos." : "";

  const currentStepSubtitle = step === 3 ? "Por favor, diligencia los datos básicos de la empresa." : "";

  if (showHSEQSuccess) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col pt-16" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
        <LoadingHSEQOverlay isVisible={isSendingHSEQ} />
        <SMSTemplateModal 
          isOpen={showSMSTemplate}
          onClose={() => setShowSMSTemplate(false)}
          code="123456"
        />
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <RegistrationLayout>
            <div className="flex flex-col items-center text-center py-8">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-8 border-4 border-white shadow-xl relative">
                <div className="absolute inset-0 rounded-full border-4 border-[#00008F] border-t-transparent animate-spin opacity-20"></div>
                <Mail className="w-12 h-12 text-[#00008F]" />
                <div className="absolute -right-2 -bottom-2 bg-green-500 rounded-full p-1.5 border-4 border-white">
                  <Check className="w-4 h-4 text-white" strokeWidth={4} />
                </div>
              </div>
              <h2 className="title-main text-[#00008F] mb-6">Solicitud HSEQ enviada</h2>
              <p className="text-[#333333] mb-10 max-w-md mx-auto leading-relaxed text-lg">
                Se ha enviado una notificación formal al <span className="font-bold">Representante Legal</span> de tu empresa para la validación de tus permisos.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm flex flex-col items-center gap-3">
                  <div className="p-3 bg-blue-50 rounded-full text-[#00008F]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">Tiempo de respuesta</span>
                  <span className="text-lg font-bold text-[#00008F]">5 días hábiles</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm flex flex-col items-center gap-3">
                  <div className="p-3 bg-orange-50 rounded-full text-[#D75D3D]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">Estado actual</span>
                  <span className="text-lg font-bold text-[#D75D3D]">En revisión</span>
                </div>
              </div>

              <div className="mt-10 w-full">
                <button 
                  onClick={() => window.location.reload()}
                  className="w-fit min-w-[180px] max-w-full h-[52px] px-10 mx-auto bg-[#00008F] text-white rounded-full font-bold tracking-wide text-sm shadow-lg hover:bg-[#0000F7] transition-all flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" /> Ir al inicio de la plataforma
                </button>
              </div>
            </div>
          </RegistrationLayout>
        </div>

        {/* Global Components Wrapper */}
        <EmailTemplateModal 
          isOpen={showEmailTemplate} 
          onClose={() => setShowEmailTemplate(false)} 
          userName={`${formData.firstName} ${formData.lastName}`}
          docType={formData.docType}
          docNumber={formData.docNumber}
          type={emailTemplateType}
          onTypeChange={setEmailTemplateType}
        />

        <AnimatePresence>
          {showEmailPreviewIcons && showEmailOptions && (
            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[150] flex flex-col items-center gap-4">
              <div className="relative group flex flex-col items-center gap-2">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 20 }}
                  className="absolute right-20 top-0 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-[280px] flex flex-col gap-2"
                >
                  <EmailMenuContent 
                    showUserOptions={showUserEmailOptions}
                    onShowUserOptions={() => setShowUserEmailOptions(true)}
                    onBack={() => setShowUserEmailOptions(false)}
                    onSelect={handleEmailSelect}
                  />
                </motion.div>
                
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setShowEmailOptions(!showEmailOptions);
                    setShowUserEmailOptions(false);
                  }}
                  className="w-16 h-16 bg-[#00008F] hover:bg-[#D75D3D] text-white rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 border-4 border-white cursor-pointer"
                >
                  <Mail className="w-8 h-8" />
                </motion.button>
              </div>
            </div>
          )}
          {showEmailPreviewIcons && !showEmailOptions && (
            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[150]">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowEmailOptions(true)}
                className="w-16 h-16 bg-[#00008F] hover:bg-[#D75D3D] text-white rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 border-4 border-white"
              >
                <Mail className="w-8 h-8" />
              </motion.button>
            </div>
          )}
        </AnimatePresence>

        {/* Manual Modal */}
        <AnimatePresence>
          {showManualModal && (
            <ManualModal 
              isOpen={showManualModal} 
              onClose={() => setShowManualModal(false)}
              type={manualModalType}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col pt-16" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
        <LoadingHSEQOverlay isVisible={isSendingHSEQ} />
        <SMSTemplateModal 
          isOpen={showSMSTemplate}
          onClose={() => setShowSMSTemplate(false)}
          code="123456"
        />
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <RegistrationLayout>
            <div className="flex flex-col items-center text-center py-6">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-xl">
                <Check className="w-10 h-10 text-green-500 stroke-[3px]" />
              </div>
              
              <h2 className="title-main text-[#00008F] mb-4">
                {(formData.isHSEQ && !hseqValidationFailed)
                  ? 'Tu solicitud fue enviada exitosamente y está pendiente de aprobación' 
                  : isPreRegisteredHSEQ 
                    ? '¡Solicitud de rol, enviada con éxito!' 
                    : isAlreadyRegisteredShortcut
                      ? <>¡Buenas noticias!<br />Ya te encuentras registrado</>
                      : <>¡Tu registro en la <span className="font-bold">plataforma de asesoría virtual</span> se ha completado con éxito!</>}
              </h2>



              {(formData.isHSEQ && !hseqValidationFailed) && !isAlreadyRegisteredShortcut ? (
                <div className="flex flex-col items-center w-full">
                  <p className="text-[#333333] max-w-md mx-auto leading-relaxed mb-6 text-[16px]">
                    Si eres un usuario HSEQ autorizado, podrás realizar las gestiones asociadas a este rol desde tu perfil, ingresando a la opción "Agregar empresa".
                    <br /><br />
                    Inicia sesión con tu correo y contraseña.
                  </p>

                  <div className="w-full flex flex-col gap-4 mb-8">
                    <button 
                      onClick={() => window.open('https://route-laurel-21486498.figma.site', '_blank')}
                      className="w-full max-w-[220px] h-[52px] mx-auto bg-[#00008F] text-white rounded-full font-bold tracking-wide text-sm shadow-lg hover:bg-[#0000F7] active:bg-[#0000D2] disabled:bg-[#00000026] disabled:text-[#0000004D] transition-all flex items-center justify-center gap-2"
                    >
                      Iniciar sesión
                    </button>
                    <button 
                      onClick={() => window.open('https://arl.axacolpatria.co/portalarl', '_blank')}
                      className="w-full max-w-[220px] h-[52px] mx-auto border-2 border-[#00008F] text-[#00008F] rounded-full font-bold tracking-wide text-sm hover:bg-[#0000F7] hover:text-[#E8EAED] hover:border-transparent active:bg-[#0000D2] active:text-[#E8EAED] active:border-transparent transition-all flex items-center justify-center gap-2"
                    >
                      Seguir en plataforma ARL
                    </button>
                  </div>

                </div>
              ) : isPreRegisteredHSEQ ? (
                <div className="flex flex-col gap-6 text-left mb-10 w-full px-2">
                  <div className="flex gap-4 items-start group">
                    <div className="p-2 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors">
                      <Clock className="w-5 h-5 text-[#D75D3D]" />
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-[#333333] mb-1">Próximo paso:</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        El representante legal ha sido notificado para revisar tu perfil. Este proceso suele tomar <span className="font-bold text-[#00008F]">5 días hábiles.</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start group">
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <Bell className="w-5 h-5 text-[#00008F]" />
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-[#333333] mb-1">Seguimiento:</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Te llegará una notificación a tu correo electrónico registrado. También puedes monitorear el progreso en tiempo real desde la sección <span className="font-bold text-[#00008F]">Perfil.</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start group">
                    <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-[#333333] mb-1">Acceso temporal:</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Mientras se procesa el cambio, puedes seguir navegando y utilizando las funciones estándar con tu <span className="font-bold text-[#00008F]">cuenta de Usuario.</span>
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center w-full">
                  <p className="text-[#333333] max-w-md mx-auto leading-relaxed mb-6 text-[16px]">
                    {isAlreadyRegisteredShortcut 
                      ? (
                        <>
                          Inicia sesión con tu correo y contraseña.<br /><br />
                          Tu cuenta está activa y lista para usar.<br /><br />
                          Si eres usuario HSEQ autorizado, te invitamos a ingresar tus empresas por medio de la opción "agregar empresa" que encontrarás en tu perfil.
                        </>
                      )
                      : (
                        <>
                          {formData.isHSEQ
                            ? 'Inicia sesión con tu correo y contraseña.'
                            : 'Inicia sesión con tu correo electrónico y contraseña y accede a todo el contenido que tenemos disponible para tu empresa.'}
                          {formData.isHSEQ && (<><br /><br />Si eres usuario HSEQ designado, te invitamos a ingresar a tus empresas por medio de la opción "agregar empresa" que encontrarás en tu perfil.</>)}
                          {!formData.isHSEQ && (<><br /><br />Si eres un usuario HSEQ autorizado, podrás realizar las gestiones asociadas a este rol desde tu perfil, ingresando a la opción "Agregar empresa".</>)}
                        </>
                      )
                    }
                  </p>

                  <div className="w-full flex flex-col gap-4 mb-8">
                    <button 
                      onClick={() => window.open('https://route-laurel-21486498.figma.site', '_blank')}
                      className="w-full max-w-[220px] h-[52px] mx-auto bg-[#00008F] text-white rounded-full font-bold tracking-wide text-sm shadow-lg hover:bg-[#0000F7] active:bg-[#0000D2] disabled:bg-[#00000026] disabled:text-[#0000004D] transition-all flex items-center justify-center gap-2"
                    >
                      Iniciar sesión
                    </button>
                    <button 
                      onClick={() => window.open('https://arl.axacolpatria.co/portalarl', '_blank')}
                      className="w-full max-w-[220px] h-[52px] mx-auto border-2 border-[#00008F] text-[#00008F] rounded-full font-bold tracking-wide text-sm hover:bg-[#0000F7] hover:text-[#E8EAED] hover:border-transparent active:bg-[#0000D2] active:text-[#E8EAED] active:border-transparent transition-all flex items-center justify-center gap-2"
                    >
                      Seguir en plataforma ARL
                    </button>
                  </div>

                </div>
              )}
            </div>
          </RegistrationLayout>
        </div>

        <EmailTemplateModal 
          isOpen={showEmailTemplate} 
          onClose={() => setShowEmailTemplate(false)} 
          userName={`${formData.firstName} ${formData.lastName}`}
          docType={formData.docType}
          docNumber={formData.docNumber}
          type={emailTemplateType}
          onTypeChange={setEmailTemplateType}
        />

        <AnimatePresence>
          {showEmailPreviewIcons && <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[150] flex flex-col items-center gap-4">
            <div className="relative group flex flex-col items-center gap-2">
              <AnimatePresence>
                {showEmailOptions && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: 20 }}
                    className="absolute right-20 top-0 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-[280px] flex flex-col gap-2"
                  >
                    <EmailMenuContent 
                      showUserOptions={showUserEmailOptions}
                      onShowUserOptions={() => setShowUserEmailOptions(true)}
                      onBack={() => setShowUserEmailOptions(false)}
                      onSelect={handleEmailSelect}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShowEmailOptions(!showEmailOptions);
                  setShowUserEmailOptions(false);
                }}
                className="w-16 h-16 bg-[#00008F] hover:bg-[#D75D3D] text-white rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 border-4 border-white cursor-pointer"
              >
                <Mail className="w-8 h-8" />
              </motion.button>
            </div>
          </div>}
        </AnimatePresence>

        {/* Manual Modal */}
        <AnimatePresence>
          {showManualModal && (
            <ManualModal 
              isOpen={showManualModal} 
              onClose={() => setShowManualModal(false)}
              type={manualModalType}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col pt-16" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
      <LoadingHSEQOverlay isVisible={isSendingHSEQ} />
      <SMSTemplateModal 
        isOpen={showSMSTemplate}
        onClose={() => setShowSMSTemplate(false)}
        code="123456"
      />
      <Navbar />
      
      {/* Onboarding Tour */}
      <OnboardingTour 
        step={tourStep} 
        onNext={() => setTourStep(2)} 
        onClose={finishTour} 
      />

      {/* Flow Indicator Banner */}
      <div className="fixed top-0 left-0 right-0 z-[110] pointer-events-none flex justify-center pt-2">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          key={activeFlow.id}
          className="pointer-events-auto bg-white shadow-xl rounded-full px-5 py-2.5 flex items-center gap-3 border transition-all duration-500"
          style={{ borderColor: activeFlow.color }}
        >
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: activeFlow.color }}
          >
            {activeFlow.icon}
          </div>
          <div className="flex flex-col pr-2">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60" style={{ color: activeFlow.color }}>
              Flujo Activo {activeFlow.id}/4
            </span>
            <span className="text-sm font-bold text-gray-800 leading-none">
              {activeFlow.name}
            </span>
          </div>
          <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
          <p className="text-[11px] text-gray-500 max-w-[180px] leading-tight hidden sm:block">
            {activeFlow.description}
          </p>
        </motion.div>
      </div>

      {/* Main Content Area with Side Buttons */}
      <div className="flex-1 flex justify-center items-start p-4 relative">
        
        {/* Vertical Test Buttons - Aligned to the Left of the container - ONLY ON STEP 1 */}
        {step === 1 && (
          <div className="hidden lg:flex flex-col gap-2 absolute left-8 top-8 z-[90]">
            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 px-1">Estados</h4>
              <button 
                onClick={() => setActiveModal('service_error')}
                className="w-40 bg-white border border-[#00008F] text-[#00008F] px-3 py-2 rounded-full text-xs font-bold shadow-sm hover:bg-blue-50 transition-all flex items-center gap-2 group"
              >
                <RefreshCw className="w-4 h-4 group-hover:scale-110 transition-transform" /> 
                <span>Error de servicio</span>
              </button>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="w-full flex justify-center">
          <RegistrationLayout>
            <div className="flex flex-col">
              <div className={`${step > 1 ? 'mb-2' : 'mb-8'} text-center`}>
                <h1 className="title-main text-[#00008F] mb-3">{step === 1 ? 'Validación de identidad' : 'Registro de usuarios'}</h1>
                {step === 1 && (
                  <p className="text-[#343C3D] leading-tight font-normal mx-auto max-w-md" style={{ fontSize: '16px' }}>
                    Para mantener tu cuenta protegida, debemos validar tu identidad. Este proceso se realiza una única vez.
                  </p>
                )}
              </div>

              {step > 1 && (
                <div className="mb-6 text-center">
                  <StepIndicator currentStep={currentDisplayStep} totalSteps={totalStepsInBar} label={indicatorLabel} />
                  {currentStepTitle && <p className="text-[#343C3D] mt-3 font-medium text-center" style={{ fontSize: '16px' }}>{currentStepTitle}</p>}
                  {currentStepSubtitle && <p className="text-[#343C3D] mt-1 font-medium text-center" style={{ fontSize: '16px' }}>{currentStepSubtitle}</p>}
                </div>
              )}

              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-[#1A1D21]">Tipo de documento *</span>
                          <Tooltip>
                            Este registro corresponde a una <span className="font-bold">persona natural</span>. Por este motivo, el tipo de documento <span className="font-bold">NIT</span> no está disponible.
                          </Tooltip>
                        </div>
                        <SelectField 
                          label="" 
                          required={false}
                          icon={<User className="w-5 h-5" />} 
                          value={formData.docType} 
                          onChange={(e) => handleInputChange('docType', e.target.value)} 
                          isValid={formData.docType !== ''}
                          options={docTypeOptionsPerson} 
                        />
                      </div>
                      
                      <div className="flex flex-col gap-1 relative group/field">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-[#1A1D21]">Número de documento *</span>
                        </div>
                        <InputField 
                          label="" 
                          required={false}
                          placeholder="Número de identificación" 
                          icon={<IdCard className="w-5 h-5" />} 
                          value={formData.docNumber} 
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            handleInputChange('docNumber', val);
                          }} 
                          onFocus={() => setShowTestShortcuts(true)}
                          onBlur={() => handleBlur('docNumber')} 
                          error={errors.docNumber} 
                          isValid={validateDocNumber(formData.docNumber) && !errors.docNumber} 
                        />
                        
                        {/* Hotspot Guide - Mouse icon that triggers on focus and appears already deployed */}
                        <AnimatePresence>
                          {showTestShortcuts && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                              animate={{ opacity: 1, scale: 1, rotate: 0 }}
                              exit={{ opacity: 0, scale: 0.8, rotate: -10 }}
                              className="absolute -right-12 top-1.5 z-[110]"
                            >
                              <div className="relative group">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setShowTestShortcuts(false);
                                  }}
                                  className="w-10 h-10 bg-[#00008F] rounded-full shadow-lg flex items-center justify-center cursor-pointer text-white transition-all"
                                >
                                  <MousePointerClick className="w-5 h-5" />
                                </motion.button>

                                <motion.div
                                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                  className="absolute left-1/2 -translate-x-1/2 top-12 w-[320px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden"
                                >
                                  <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Escenarios de prueba</span>
                                    <button onClick={() => setShowTestShortcuts(false)} className="text-gray-400 hover:text-gray-600">
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                  <div className="p-2 flex flex-col gap-1">
                                    {[
                                      { code: '101010', title: 'Registro normal', desc: 'Lleva al flujo de trabajador y rol HSEQ' },
                                      { code: '111111', title: 'Ya registrado', desc: 'Sigue flujo y muestra que ya esta registrado' },
                                      { code: '222222', title: 'Sin productos', desc: 'Muestra modal con mensaje no tiene productos' },
                                      { code: '333333', title: 'Registro rol independiente', desc: 'Registro sin selección de rol' }
                                    ].map((item) => (
                                      <button
                                        key={item.code}
                                        onClick={() => {
                                          handleInputChange('docNumber', item.code);
                                          setShowTestShortcuts(false);
                                        }}
                                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 transition-colors group text-left cursor-pointer"
                                      >
                                        <div className="flex flex-col">
                                          <span className="text-[13px] font-bold text-gray-800">{item.title}</span>
                                          <span className="text-[11px] text-gray-500 leading-tight">{item.desc}</span>
                                        </div>
                                        <span className="font-mono text-[12px] font-bold text-[#00008F] bg-blue-100/50 px-2 py-1 rounded-lg border border-blue-100 group-hover:bg-[#00008F] group-hover:text-white transition-colors">
                                          {item.code}
                                        </span>
                                      </button>
                                    ))}
                                  </div>
                                  <div className="p-3 bg-blue-50/50 flex items-center gap-2">
                                    <Zap className="w-3.5 h-3.5 text-[#00008F]" />
                                    <p className="text-[10px] text-[#00008F] font-medium leading-none">Haz clic para autocompletar</p>
                                  </div>
                                </motion.div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ) : step === 2 ? (
                  <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-4">
                    <ReadOnlyField 
                      label="Tipo de documento" 
                      value={docTypeOptions.find(opt => opt.value === formData.docType)?.label || formData.docType} 
                      icon={<User className="w-5 h-5" />} 
                    />
                    <ReadOnlyField 
                      label="Número de documento" 
                      value={formData.docNumber} 
                      icon={<IdCard className="w-5 h-5" />} 
                    />
                    
                    <InputField 
                      label="Nombres" 
                      required 
                      placeholder="Escribe tu nombre" 
                      icon={<User className="w-5 h-5" />} 
                      value={formData.firstName} 
                      onChange={(e) => handleInputChange('firstName', e.target.value)} 
                      onBlur={() => handleBlur('firstName')}
                      isValid={validateName(formData.firstName)} 
                    />
                    <InputField 
                      label="Apellidos" 
                      required 
                      placeholder="Escribe tus apellidos" 
                      icon={<User className="w-5 h-5" />} 
                      value={formData.lastName} 
                      onChange={(e) => handleInputChange('lastName', e.target.value)} 
                      onBlur={() => handleBlur('lastName')}
                      isValid={validateName(formData.lastName)} 
                    />
                    
                    {/* Radio Buttons para seleccionar rol - Horizontal */}
                    {formData.docNumber !== '333333' && (
                      <div className="flex flex-col gap-3 mt-2 pb-4">
                        <label className="text-sm font-semibold text-[#1A1D21]">Selecciona tu rol *</label>
                        <div className="flex gap-6 items-center">
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                              type="radio"
                              name="userRole"
                              value="worker"
                              checked={formData.userRole === 'worker'}
                              onChange={(e) => {
                                handleInputChange('userRole', e.target.value);
                                handleInputChange('isHSEQ', false);
                              }}
                              className="peer sr-only"
                            />
                            <div className="relative w-7 h-7 rounded-full border-2 border-[#C7CAD1] bg-[#F8FAFF] peer-hover:border-[#0000F7] peer-hover:bg-[#F0F6FF] peer-focus-visible:ring-2 peer-focus-visible:ring-[#0000F7] peer-focus-visible:ring-offset-2 transition-colors">
                              {formData.userRole === 'worker' && (
                                <span className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00008F] group-hover:bg-[#0000F7] transition-colors" />
                              )}
                            </div>
                            <span className="flex items-center gap-1.5 text-sm text-gray-700 group-hover:text-[#00008F] transition-colors">
                              <span>Trabajador</span>
                              <Tooltip text="Eres un usuario trabajador si estás afiliado a ARL AXA COLPATRIA por tu empleador y no tienes ninguna delegación para gestionar temas de seguridad y salud en el trabajo a su nombre." className="!ml-0" />
                            </span>
                          </label>
                          
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                              type="radio"
                              name="userRole"
                              value="hseq"
                              checked={formData.userRole === 'hseq'}
                              onChange={(e) => {
                                handleInputChange('userRole', e.target.value);
                                handleInputChange('isHSEQ', true);
                              }}
                              className="peer sr-only"
                            />
                            <div className="relative w-7 h-7 rounded-full border-2 border-[#C7CAD1] bg-[#F8FAFF] peer-hover:border-[#0000F7] peer-hover:bg-[#F0F6FF] peer-focus-visible:ring-2 peer-focus-visible:ring-[#0000F7] peer-focus-visible:ring-offset-2 transition-colors">
                              {formData.userRole === 'hseq' && (
                                <span className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00008F] group-hover:bg-[#0000F7] transition-colors" />
                              )}
                            </div>
                            <span className="flex items-center gap-1.5 text-sm text-gray-700 group-hover:text-[#00008F] transition-colors">
                              <span>Soy usuario HSEQ</span>
                              <Tooltip text="Eres un usuario HSEQ si estás designado por la empresa para gestionar temas de seguridad y salud en el trabajo a su nombre." className="!ml-0" />
                            </span>
                          </label>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : step === 3 ? (
                  <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#1A1D21]">Tipo de documento de la empresa *</span>
                      </div>
                      <SelectField 
                        label="" 
                        required={false}
                        icon={<IdCard className="w-5 h-5" />} 
                        options={docTypeOptionsHSEQ} 
                        value={formData.companyDocType} 
                        onChange={(e)=>handleInputChange('companyDocType', e.target.value)} 
                        isValid={formData.companyDocType !== ''}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#1A1D21]">Número de documento de la empresa *</span>
                        <Tooltip text="Digita el número de identificación sin puntos, sin comas y sin el digito de verificación en caso de ser NIT." />
                      </div>
                      <InputField
                        label=""
                        required={false}
                        placeholder="Número de identificación"
                        icon={<IdCard className="w-5 h-5" />}
                        value={formData.companyDocNumber}
                        onChange={(e) => {
                          handleInputChange('companyDocNumber', e.target.value);
                        }}
                        onBlur={() => handleBlur('companyDocNumber')}
                        error={errors.companyDocNumber}
                        isValid={validateCompanyDocNumber(formData.companyDocNumber) && !errors.companyDocNumber}
                      />
                    </div>
                    <div className="relative">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-[#1A1D21]">Número de afiliación de la empresa *</span>
                          <Tooltip text="Verifica el número de la afiliación con la empresa o consúltalo en el Portal Transaccional ARL, opción Certificados" />
                        </div>
                        <InputField
                          label=""
                          required={false}
                          placeholder="Número de identificación"
                          icon={<FileText className="w-5 h-5" />}
                          value={formData.affiliationNumber}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            handleInputChange('affiliationNumber', val);
                          }}
                          onFocus={() => setAffiliationFocused(true)}
                          onBlur={() => {
                            handleBlur('affiliationNumber');
                            setAffiliationFocused(false);
                          }}
                          isValid={validateDocNumber(formData.affiliationNumber)}
                        />
                      </div>
                      
                      <AnimatePresence>
                        {affiliationFocused && formData.isHSEQ && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            className="mt-2 bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-start gap-3 shadow-sm"
                          >
                            <div className="bg-white p-1.5 rounded-lg shadow-xs shrink-0">
                              <Info className="w-4 h-4 text-[#00008F]" />
                            </div>
                            <div>
                              <p className="text-[11px] font-bold text-[#00008F] leading-tight mb-1 uppercase tracking-wider">Atajo de prueba HSEQ</p>
                              <p className="text-[12px] text-gray-600 leading-snug">
                                Para continuar con este flujo especializado, ingresa el número <span className="font-bold text-[#00008F] bg-white px-2 py-0.5 rounded border border-blue-100 shadow-sm">123456</span>.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ) : step === 4 ? (
                  <motion.div key="step4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-4">
                    {!emailCodeSent && (
                      <div className="flex items-center justify-between">
                        <InfoBanner text={<>Para <span className="font-bold">verificar tu identidad</span> enviaremos un código de seguridad a tu correo electrónico.</>} />
                        <Tooltip text="Para probar validaciones de correo, intenta con: correo20@gmail.com. Código de prueba: 123456." />
                      </div>
                    )}
                    {!emailCodeSent ? (
                      <>
                        <InputField 
                          label="Correo electrónico" 
                          required 
                          placeholder="tucorreo@dominio.com" 
                          icon={<Mail className="w-5 h-5" />} 
                          value={formData.email} 
                          onChange={(e) => handleInputChange('email', e.target.value.toLowerCase())} 
                          onBlur={() => handleBlur('email')}
                          error={errors.email}
                          isValid={validateEmail(formData.email) && !errors.email} 
                        />
                        <InputField 
                          label="Confirmar correo electrónico" 
                          required 
                          placeholder="tucorreo@dominio.com" 
                          icon={<Mail className="w-5 h-5" />} 
                          value={formData.confirmEmail} 
                          onChange={(e) => handleInputChange('confirmEmail', e.target.value.toLowerCase())} 
                          onBlur={() => handleBlur('confirmEmail')}
                          error={errors.confirmEmail}
                          isValid={validateEmail(formData.confirmEmail) && formData.email === formData.confirmEmail && !errors.confirmEmail} 
                        />
                      </>
                    ) : (
                      <div className="flex flex-col gap-6">
                        <p className="text-sm text-gray-800 text-center">Ingresa el código que hemos enviado a tu correo electrónico.</p>
                        <div className="flex items-center gap-3 relative justify-center">
                          <div className="flex justify-between gap-2 max-w-[320px]">
                            {otp.map((digit, idx) => (
                              <input 
                                key={idx} 
                                id={`otp-${idx}`} 
                                type="text" 
                                maxLength={1} 
                                value={digit} 
                                onChange={(e) => handleOtpChange(idx, e.target.value)} 
                                className={`w-10 h-12 md:w-11 md:h-13 border rounded text-center text-xl font-bold outline-none transition-all ${otpError ? 'border-red-500 bg-red-50' : digit !== '' ? 'border-green-500' : 'border-gray-300 focus:border-[#00008F]'}`} 
                              />
                            ))}
                          </div>
                          
                          {isOtpComplete && !otpError && otpSuccess && <Check className="w-6 h-6 text-green-500 flex-shrink-0" />}
                          {otpError && <X className="w-6 h-6 text-red-500 flex-shrink-0" />}
                        </div>
                        {otpError && !otpLimitErrorType && <p className="text-[#880727] text-sm font-bold mt-[-15px]">Verifica el código y digítalo de nuevo</p>}
                        {isOtpTimeoutWithoutCode && (
                          <p className="text-[#880727] text-sm font-bold mt-[-15px]">No hemos recibido tu código. Solicita el envío nuevamente.</p>
                        )}
                        {otpLimitErrorType === 'limit1' && (
                          <p className="text-[#880727] text-sm font-bold mt-[-15px]">¡Lo sentimos! Has superado el límite de solicitudes para enviarte el código OTP. Por favor, inténtalo nuevamente en 30 minutos.</p>
                        )}
                        {otpLimitErrorType === 'limit2' && (
                          <p className="text-[#880727] text-sm font-bold mt-[-15px]">¡Lo sentimos! Has superado el límite de intentos para ingresar el código OTP. Por favor, solicita un código nuevo.</p>
                        )}
                        {otpSuccess && <p className="text-green-600 text-sm font-bold mt-[-15px]">✓ Código validado correctamente</p>}
                        <div className="flex flex-col gap-2 mt-2">
                          <div className="flex items-center gap-2 relative group">
                            <span className="text-[13px] font-bold text-gray-700">¿No has recibido el código?</span>
                            <button 
                              onClick={handleResendCode}
                              disabled={timer > 0}
                              className={`text-[13px] font-bold transition-colors relative ${
                                timer > 0 
                                  ? 'text-gray-400 cursor-not-allowed' 
                                  : 'text-[#00008F] hover:text-[#000070] hover:underline cursor-pointer'
                              }`}
                            >
                              Reenviar código
                            </button>
                            {timer > 0 && (
                              <div className="invisible group-hover:visible absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg">
                                Debes esperar hasta que se reinicie el conteo
                                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">Tiempo restante: <span className="text-[#D75D3D] font-bold">{Math.floor(timer/60)}:{ (timer%60).toString().padStart(2, '0') } min</span></p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : step === 5 ? (
                  <motion.div key="step5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-4">
                    {!phoneCodeSent && (
                      <InfoBanner text={<>Para <span className="font-bold">verificar tu identidad</span> enviaremos un código de seguridad a tu número de celular. Ten en cuenta que debes ingresar el mismo número registrado al momento de autenticarte por primera vez.</>} />
                    )}
                    {!phoneCodeSent ? (
                      <>
                        <InputField 
                          label="Número de celular" 
                          required 
                          placeholder="Ej: 3103263027" 
                          icon={<Smartphone className="w-5 h-5" />} 
                          type="text"
                          autoComplete="tel-national"
                          value={formData.phone} 
                          onChange={(e) => handleInputChange('phone', e.target.value)} 
                          onBlur={() => handleBlur('phone')}
                          error={errors.phone}
                          isValid={validatePhone(formData.phone) && !errors.phone} 
                        />
                        <InputField 
                          label="Confirmar número de celular" 
                          required 
                          placeholder="Ej: 3103263027" 
                          icon={<Smartphone className="w-5 h-5" />} 
                          type="text"
                          autoComplete="tel-national"
                          value={formData.confirmPhone} 
                          onChange={(e) => handleInputChange('confirmPhone', e.target.value)} 
                          onBlur={() => handleBlur('confirmPhone')}
                          error={errors.confirmPhone}
                          isValid={validatePhone(formData.confirmPhone) && formData.phone === formData.confirmPhone && !errors.confirmPhone} 
                        />
                      </>
                    ) : (
                      <div className="flex flex-col gap-6">
                        <p className="text-sm text-gray-800 text-center">Ingresa el código que hemos enviado a tu número de celular</p>
                        <div className="flex items-center gap-3 relative justify-center">
                          <div className="flex justify-between gap-2 max-w-[320px]">
                            {otp.map((digit, idx) => (
                              <input 
                                key={idx} 
                                id={`otp-${idx}`} 
                                type="text" 
                                maxLength={1} 
                                value={digit} 
                                onChange={(e) => handleOtpChange(idx, e.target.value)} 
                                className={`w-10 h-12 md:w-11 md:h-13 border rounded text-center text-xl font-bold outline-none transition-all ${otpError ? 'border-red-500 bg-red-50' : digit !== '' ? 'border-green-500' : 'border-gray-300 focus:border-[#00008F]'}`} 
                              />
                            ))}
                          </div>
                          
                          {isOtpComplete && !otpError && otpSuccess && <Check className="w-6 h-6 text-green-500 flex-shrink-0" />}
                          {otpError && <X className="w-6 h-6 text-red-500 flex-shrink-0" />}
                        </div>
                        {otpError && !otpLimitErrorType && <p className="text-[#880727] text-sm font-bold mt-[-15px]">Verifica el código y digítalo de nuevo</p>}
                        {isOtpTimeoutWithoutCode && (
                          <p className="text-[#880727] text-sm font-bold mt-[-15px]">No hemos recibido tu código. Solicita el envío nuevamente.</p>
                        )}
                        {otpLimitErrorType === 'limit1' && (
                          <p className="text-[#880727] text-sm font-bold mt-[-15px]">¡Lo sentimos! Has superado el límite de solicitudes para enviarte el código OTP. Por favor, inténtalo nuevamente en 30 minutos.</p>
                        )}
                        {otpLimitErrorType === 'limit2' && (
                          <p className="text-[#880727] text-sm font-bold mt-[-15px]">¡Lo sentimos! Has superado el límite de intentos para ingresar el código OTP. Por favor, solicita un código nuevo.</p>
                        )}
                        {otpSuccess && <p className="text-green-600 text-sm font-bold mt-[-15px]">✓ Código validado correctamente</p>}
                        <div className="flex flex-col gap-2 mt-2">
                          <div className="flex items-center gap-2 relative group">
                            <span className="text-[13px] font-bold text-gray-700">¿No has recibido el código?</span>
                            <button 
                              onClick={handleResendCode}
                              disabled={timer > 0}
                              className={`text-[13px] font-bold transition-colors relative ${
                                timer > 0 
                                  ? 'text-gray-400 cursor-not-allowed' 
                                  : 'text-[#00008F] hover:text-[#000070] hover:underline cursor-pointer'
                              }`}
                            >
                              Reenviar código
                            </button>
                            {timer > 0 && (
                              <div className="invisible group-hover:visible absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg">
                                Debes esperar hasta que se reinicie el conteo
                                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">Tiempo restante: <span className="text-[#D75D3D] font-bold">{Math.floor(timer/60)}:{ (timer%60).toString().padStart(2, '0') } min</span></p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div key="step6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="relative flex flex-col gap-5">
                    <p className="text-sm text-gray-600 mb-1 font-normal text-center">
                      Para proteger tu cuenta, asigna una contraseña única y segura.
                    </p>
                    <div className="relative">
                      <div className="relative">
                        <InputField label="Contraseña" required type={showPassword ? "text" : "password"} placeholder="********" icon={<Lock className="w-5 h-5" />} value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} onFocus={() => setPasswordFocused(true)} onBlur={() => setPasswordFocused(false)} isValid={isPasswordValid} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[38px] text-gray-400">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                      </div>
                      
                      <AnimatePresence>
                        {passwordFocused && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mt-2">
                              <h3 className="text-[14px] font-bold text-gray-800 mb-2 leading-tight">
                                Tu contraseña debe cumplir con las siguientes características:
                              </h3>
                              <div className="h-px bg-gray-100 w-full mb-4" />
                              
                              <div className="space-y-4">
                                <div>
                                  <p className="text-[14px] font-bold text-gray-800 mb-2">Debe contener:</p>
                                  <PasswordRequirement met={passReqs.length} text="Longitud mínima de 10 caracteres" />
                                  <PasswordRequirement met={passReqs.upper} text="Una letra en mayúscula" />
                                  <PasswordRequirement met={passReqs.lower} text="Una letra en minúscula" />
                                  <PasswordRequirement met={passReqs.number} text="Un número" />
                                  <PasswordRequirement met={passReqs.special} text="Un carácter especial #?!@$%*+-=_" />
                                </div>

                                <div>
                                  <p className="text-[14px] font-bold text-gray-800 mb-2">No debe contener:</p>
                                  <PasswordRequirementNoStrike met={passReqs.noSequence} text="Secuencias númericas de más de tres digitos ( ej: 1234, 4567, 6789)" />
                                  <PasswordRequirementNoStrike met={passReqs.noDoc} text="Tu número de documento" />
                                  <PasswordRequirementNoStrike met={passReqs.noNames} text="Tus nombres o apellidos" />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="relative">
                      <InputField 
                        label="Confirmar contraseña" 
                        required 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="********" 
                        icon={<Lock className="w-5 h-5" />} 
                        value={formData.confirmPassword} 
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)} 
                        onBlur={() => handleBlur('confirmPassword')}
                        isValid={passwordsMatch} 
                        error={errors.confirmPassword}
                      />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-[38px] text-gray-400">{showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                    </div>

                    <div className="flex flex-col gap-4 mt-2">
                      <CustomCheckbox 
                        checked={formData.acceptTerms} 
                        onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                      >
                        <span className="text-sm text-gray-700">Acepto <span className="text-[#00008F] font-bold">Términos y condiciones</span></span>
                      </CustomCheckbox>
                      <CustomCheckbox 
                        checked={formData.acceptPrivacy} 
                        onChange={() => {
                          if (!formData.acceptPrivacy) {
                            setShowPrivacyModal(true);
                          } else {
                            handleInputChange('acceptPrivacy', false);
                          }
                        }}
                      >
                        <span className="text-sm text-gray-700">
                          Autorizo el tratamiento de mis datos personales para los procesos de registro y autenticación. Consulta la política <button type="button" onClick={(e) => { e.preventDefault(); setShowPrivacyModal(true); }} className="text-[#00008F] font-bold">aquí.</button>
                        </span>
                      </CustomCheckbox>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-8 flex flex-col gap-5">
              <button
                onClick={nextStep}
                disabled={
                  step === 1 ? !isStep1Valid : 
                  step === 2 ? !isPersonalValid : 
                  step === 3 ? !isCompanyValid :
                  step === 4 ? (!emailCodeSent ? !isEmailValid : !isOtpComplete) : 
                  step === 5 ? (!phoneCodeSent ? !isPhoneValid : !isOtpComplete) :
                  !(isPasswordValid && passwordsMatch && formData.acceptTerms && formData.acceptPrivacy)
                }
                className="btn-cta btn-cta-primary w-fit min-w-[180px] max-w-full px-10 mx-auto"
              >
                {(step === 4 && !emailCodeSent) || (step === 5 && !phoneCodeSent) ? 'Enviar código' : step === 6 ? 'Finalizar registro' : 'Continuar'}
              </button>
              
              <div className="flex items-center justify-between w-full px-1">
                <button 
                  onClick={prevStep} 
                  className={`text-[14px] font-bold text-[#E3000A] flex items-center gap-2 hover:translate-x-[-2px] transition-all duration-200 ${step === 1 ? 'invisible' : 'visible'}`}
                >
                  <ArrowLeft className="w-4 h-4" /> Volver
                </button>
                <button 
                  onClick={() => window.open('https://arl.axacolpatria.co/portalarl', '_blank')}
                  className="text-[14px] font-bold text-[#00008F] flex items-center gap-2 hover:translate-x-[2px] transition-all duration-200"
                >
                  Ir a portal ARL <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </RegistrationLayout>
      </div>
    </div>
      
      <PrivacyModal 
        isOpen={showPrivacyModal} 
        onClose={() => setShowPrivacyModal(false)} 
        onAccept={() => handleInputChange('acceptPrivacy', true)} 
      />
      
      <StatusModals 
        type={activeModal} 
        onClose={() => setActiveModal(null)} 
        onAction={(action) => {
          if (action === "Corregir datos") {
            // El modal ya se cierra por el onClose interno, pero aseguramos navegación si fuera necesario
            // En este caso el usuario ya está en el paso 3
          } else if (action === "Continuar registro como trabajador") {
            setHseqValidationFailed(true);
            setStep(4);
          }
        }}
      />

      <EmailTemplateModal 
        isOpen={showEmailTemplate} 
        onClose={() => setShowEmailTemplate(false)} 
        userName={`${formData.firstName} ${formData.lastName}`}
        docType={formData.docType}
        docNumber={formData.docNumber}
        type={emailTemplateType}
        onTypeChange={setEmailTemplateType}
      />

      <AnimatePresence>
        {showEmailPreviewIcons && ((step === 4 && emailCodeSent) || (step === 5 && phoneCodeSent)) && (
          <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[150] flex flex-col items-center gap-4">
            <motion.button 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (step === 4) {
                  setEmailTemplateType('otp');
                  setShowEmailTemplate(true);
                } else if (step === 5) {
                  setShowSMSTemplate(true);
                }
              }}
              className="w-16 h-16 bg-white text-[#00008F] rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 border-4 border-blue-50 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#00008F]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              {step === 4 ? <Mail className="w-8 h-8 relative z-10" /> : <Smartphone className="w-8 h-8 relative z-10" />}
              {step === 5 && (
                <div className="absolute top-2 right-2 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </div>
              )}
            </motion.button>
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg border border-blue-50">
              <span className="text-[10px] font-bold text-[#00008F] uppercase tracking-widest whitespace-nowrap">
                {step === 4 ? 'Ver correo' : 'Ver mensaje'}
              </span>
            </div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEmailPreviewIcons && (isFinished || isPreRegisteredHSEQ || showHSEQSuccess) && (
          <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[150] flex flex-col items-center gap-4">
            <div className="relative group flex flex-col items-center gap-2">
              <AnimatePresence>
                {showEmailOptions && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: 20 }}
                    className="absolute right-20 top-0 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-[280px] flex flex-col gap-2"
                  >
                    <EmailMenuContent 
                      showUserOptions={showUserEmailOptions}
                      onShowUserOptions={() => setShowUserEmailOptions(true)}
                      onBack={() => setShowUserEmailOptions(false)}
                      onSelect={handleEmailSelect}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShowEmailOptions(!showEmailOptions);
                  setShowUserEmailOptions(false);
                }}
                className="w-16 h-16 bg-[#00008F] hover:bg-[#D75D3D] text-white rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 border-4 border-white cursor-pointer"
              >
                <Mail className="w-8 h-8" />
              </motion.button>
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg border border-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] font-bold text-[#00008F] uppercase tracking-widest whitespace-nowrap">Opciones de Correo</span>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {((step === 4 && emailCodeSent) || (step === 5 && phoneCodeSent)) && (
        <div className="fixed bottom-6 right-6 z-[220] flex items-center gap-2">
          <button
            onClick={() => setTimer(3)}
            disabled={timer <= 3}
            className={`flex items-center gap-1.5 px-3 h-12 rounded-full text-white shadow-xl border-2 border-white transition-colors ${
              timer <= 3 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#880727] hover:bg-[#6b0520] cursor-pointer'
            }`}
            title="Llevar contador a 3 segundos"
          >
            <Clock className="w-4 h-4" />
            <span className="text-[11px] font-bold">tiempo agotado</span>
          </button>
          <button
            onClick={() => triggerOtpLimitError('limit1')}
            className="h-12 px-3 rounded-full bg-[#00008F] text-white shadow-xl border-2 border-white hover:bg-[#000070] transition-colors flex items-center justify-center text-[11px] font-bold"
            title="Simular límite de solicitudes OTP"
          >
            Límite 1
          </button>
          <button
            onClick={() => triggerOtpLimitError('limit2')}
            className="h-12 px-3 rounded-full bg-[#00008F] text-white shadow-xl border-2 border-white hover:bg-[#000070] transition-colors flex items-center justify-center text-[11px] font-bold"
            title="Simular límite de intentos OTP"
          >
            Límite 2
          </button>
        </div>
      )}

      {/* Manual Modal */}
      <AnimatePresence>
        {showManualModal && (
          <ManualModal 
            isOpen={showManualModal} 
            onClose={() => setShowManualModal(false)}
            type={manualModalType}
          />
        )}
      </AnimatePresence>

      {isDevEnvironment && <DeveloperInspector />}

      {/* Botón Estados de componentes */}
      <button
        onClick={() => setShowComponentStates(true)}
        title="Ver estados de componentes para Figma"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[290] flex flex-col items-center gap-1.5 bg-[#00008F] hover:bg-[#0000C8] text-white px-2 py-4 rounded-l-xl shadow-xl transition-all duration-200 group"
      >
        <Layers className="w-4 h-4" />
        <span
          className="text-[9px] font-bold uppercase tracking-widest"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Estados
        </span>
      </button>

      {/* Modal estados de componentes */}
      <AnimatePresence>
        {showComponentStates && (
          <ComponentStatesModal onClose={() => setShowComponentStates(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
