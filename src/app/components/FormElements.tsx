import React from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ReactNode;
  isValid?: boolean;
  error?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  isValid,
  error,
  className,
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [showStrongFocus, setShowStrongFocus] = React.useState(false);
  const focusTimerRef = React.useRef<number | null>(null);

  const clearFocusTimer = React.useCallback(() => {
    if (focusTimerRef.current !== null) {
      window.clearTimeout(focusTimerRef.current);
      focusTimerRef.current = null;
    }
  }, []);

  const startStrongFocusPhase = React.useCallback(() => {
    setShowStrongFocus(true);
    clearFocusTimer();
    focusTimerRef.current = window.setTimeout(() => {
      setShowStrongFocus(false);
      focusTimerRef.current = null;
    }, 1800);
  }, [clearFocusTimer]);

  React.useEffect(() => {
    return () => {
      clearFocusTimer();
    };
  }, [clearFocusTimer]);

  return (
    <div data-component="InputField" className="flex flex-col gap-2 w-full" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
      {label && (
        <label className="text-sm font-semibold text-[#1A1D21]">
          {label}{props.required && ' *'}
        </label>
      )}
      <div
        className={cn(
          "flex items-stretch h-11 border rounded-[8px] overflow-hidden transition-all duration-200",
          error
            ? "border-[#880727]"
            : (isFocused
              ? (showStrongFocus ? "ring-2 ring-offset-2 ring-[#00008F] border-gray-300" : "border-[#00008F]")
              : "border-gray-300"),
          isValid && !error && "border-green-600",
          props.disabled && "bg-gray-50 border-gray-200"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center w-12 h-11 text-white transition-colors duration-200",
            error ? "bg-[#880727]" : (isValid ? "bg-green-600" : (isFocused ? "bg-[#00008F]" : (props.disabled ? "bg-gray-400" : "bg-gray-200 text-gray-500")))
          )}
        >
          {icon}
        </div>
        <div className={cn("flex-1 h-11 flex items-center px-3 relative", props.disabled ? "bg-gray-50" : "bg-white")}>
          <input
            {...props}
            onFocus={(e) => {
              setIsFocused(true);
              startStrongFocusPhase();
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              setShowStrongFocus(false);
              clearFocusTimer();
              props.onBlur?.(e);
            }}
            onChange={(e) => {
              if (showStrongFocus) {
                setShowStrongFocus(false);
                clearFocusTimer();
              }
              props.onChange?.(e);
            }}
            className={cn(
              "w-full h-full outline-none text-[15px] font-normal text-[#1A1D21] placeholder:text-[#606776] bg-transparent",
              props.disabled && "text-gray-500 cursor-not-allowed",
              className
            )}
          />
          {error ? (
            <AlertCircle className="w-5 h-5 text-[#880727] ml-2 flex-shrink-0" />
          ) : (
            isValid && (
              <Check className="w-5 h-5 text-green-600 ml-2 flex-shrink-0" />
            )
          )}
        </div>
      </div>
      {error && <span className="text-sm text-[#880727] font-medium">{error}</span>}
    </div>
  );
};

export const SelectField: React.FC<InputFieldProps & { options: { value: string; label: string }[] }> = ({
  label,
  icon,
  isValid,
  error,
  options,
  ...props
}) => {
  const { onFocus, onBlur, onChange, disabled, value, required } = props;
  const [isFocused, setIsFocused] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [showStrongFocus, setShowStrongFocus] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const focusTimerRef = React.useRef<number | null>(null);

  const clearFocusTimer = React.useCallback(() => {
    if (focusTimerRef.current !== null) {
      window.clearTimeout(focusTimerRef.current);
      focusTimerRef.current = null;
    }
  }, []);

  const startStrongFocusPhase = React.useCallback(() => {
    setShowStrongFocus(true);
    clearFocusTimer();
    focusTimerRef.current = window.setTimeout(() => {
      setShowStrongFocus(false);
      focusTimerRef.current = null;
    }, 1800);
  }, [clearFocusTimer]);

  React.useEffect(() => () => clearFocusTimer(), [clearFocusTimer]);

  // Cierra al hacer clic fuera
  React.useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
        setShowStrongFocus(false);
        clearFocusTimer();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, clearFocusTimer]);

  const selectedOption = options.find(o => o.value === value);
  const hasValue = !!selectedOption;

  const handleSelect = (optValue: string) => {
    onChange?.({ target: { value: optValue } } as any);
    setIsOpen(false);
    setIsFocused(false);
    setShowStrongFocus(false);
    clearFocusTimer();
  };

  const toggleOpen = () => {
    if (disabled) return;
    if (!isOpen) {
      setIsFocused(true);
      startStrongFocusPhase();
      onFocus?.({} as any);
    }
    setIsOpen(v => !v);
  };

  return (
    <div
      data-component="SelectField"
      className="flex flex-col gap-2 w-full"
      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
    >
      {label && (
        <label className="text-sm font-semibold text-[#1A1D21]">
          {label}{required && ' *'}
        </label>
      )}

      {/* Contenedor relativo para anclar el dropdown */}
      <div ref={containerRef} className="relative">
        {/* Trigger */}
        <div
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleOpen(); }
            if (e.key === 'Escape') { setIsOpen(false); setIsFocused(false); }
          }}
          onClick={toggleOpen}
          className={cn(
            "flex items-stretch h-11 border rounded-[8px] overflow-hidden transition-all duration-200 cursor-pointer select-none",
            error
              ? "border-[#880727]"
              : isFocused
                ? (showStrongFocus ? "ring-2 ring-offset-2 ring-[#00008F] border-gray-300" : "border-[#00008F]")
                : "border-gray-300",
            isValid && !error && "border-green-600",
            disabled && "bg-gray-50 border-gray-200 cursor-not-allowed"
          )}
        >
          {/* Ícono izquierdo */}
          <div className={cn(
            "flex items-center justify-center w-12 h-11 text-white transition-colors duration-200 flex-shrink-0",
            error ? "bg-[#880727]" : isValid ? "bg-green-600" : isFocused ? "bg-[#00008F]" : disabled ? "bg-gray-400" : "bg-gray-200 text-gray-500"
          )}>
            {icon}
          </div>

          {/* Valor / placeholder */}
          <div className={cn("flex-1 h-11 flex items-center justify-between px-3", disabled ? "bg-gray-50" : "bg-white")}>
            <span className={cn("text-[15px] font-normal truncate", hasValue ? "text-[#1A1D21]" : "text-[#606776]")}>
              {hasValue ? selectedOption!.label : 'Seleccionar'}
            </span>
            <div className="flex items-center gap-1 ml-2 flex-shrink-0">
              {error && <AlertCircle className="w-5 h-5 text-[#880727]" />}
              {!error && isValid && <Check className="w-5 h-5 text-green-600" />}
              <svg
                className={cn("w-4 h-4 text-gray-400 transition-transform duration-200", isOpen && "rotate-180")}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Lista desplegable — mismo ancho que el trigger */}
        {isOpen && !disabled && (
          <div
            role="listbox"
            className="absolute top-full left-0 right-0 z-[200] mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-y-auto max-h-64"
          >
            {options.map((opt, i) => {
              const isSelected = opt.value === value;
              return (
                <div
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onMouseDown={(e) => { e.preventDefault(); handleSelect(opt.value); }}
                  className={cn(
                    "relative flex items-center h-10 px-4 cursor-pointer text-[14px] transition-colors",
                    isSelected ? "bg-[#EEF5FF] font-semibold text-[#00008F]" : "text-[#374151] hover:bg-gray-50",
                    i < options.length - 1 && "border-b border-gray-50"
                  )}
                >
                  <span className="flex-1">{opt.label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {error && <span className="text-sm text-[#880727] font-medium">{error}</span>}
    </div>
  );
};