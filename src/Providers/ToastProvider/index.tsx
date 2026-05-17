import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type ToastVariant = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastApi {
  show: (message: string, variant?: ToastVariant, durationMs?: number) => void;
  success: (message: string, durationMs?: number) => void;
  error: (message: string, durationMs?: number) => void;
  info: (message: string, durationMs?: number) => void;
}

const defaultApi: ToastApi = {
  show: () => null,
  success: () => null,
  error: () => null,
  info: () => null,
};

const ToastContext = createContext<ToastApi>(defaultApi);

const DEFAULT_DURATION = 3000;

const variantClasses: Record<ToastVariant, string> = {
  success: "border-success/50 bg-surface-alt text-success",
  error: "border-danger/50 bg-surface-alt text-danger",
  info: "border-text/30 bg-surface-alt text-text",
};

interface Props {
  children: ReactNode;
}

const ToastProvider = ({ children }: Props) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeoutsRef = useRef<Record<number, ReturnType<typeof setTimeout>>>({});
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    if (timeoutsRef.current[id]) {
      clearTimeout(timeoutsRef.current[id]);
      delete timeoutsRef.current[id];
    }
  }, []);

  const show = useCallback(
    (
      message: string,
      variant: ToastVariant = "info",
      durationMs: number = DEFAULT_DURATION,
    ) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, message, variant }]);
      timeoutsRef.current[id] = setTimeout(() => dismiss(id), durationMs);
    },
    [dismiss],
  );

  useEffect(() => {
    return () => {
      Object.values(timeoutsRef.current).forEach(clearTimeout);
    };
  }, []);

  const api: ToastApi = {
    show,
    success: (message, durationMs) => show(message, "success", durationMs),
    error: (message, durationMs) => show(message, "error", durationMs),
    info: (message, durationMs) => show(message, "info", durationMs),
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-5 left-1/2 z-50 flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4"
      >
        {toasts.map((toast) => (
          <button
            type="button"
            key={toast.id}
            onClick={() => dismiss(toast.id)}
            className={`pointer-events-auto w-full rounded-lg border px-4 py-3 text-sm shadow-lg transition-opacity ${variantClasses[toast.variant]}`}
          >
            {toast.message}
          </button>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
export default ToastProvider;
