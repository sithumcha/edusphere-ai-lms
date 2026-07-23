import React, { createContext, useState, useContext } from 'react';
import { CheckCircle2, AlertCircle, Info, Sparkles, X } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success', duration = 3500) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Floating Toast Notification Container */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          pointerEvents: 'none'
        }}
      >
        {toasts.map((t) => {
          const isSuccess = t.type === 'success';
          const isInfo = t.type === 'info';

          return (
            <div
              key={t.id}
              style={{
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 18px',
                borderRadius: '16px',
                background: isSuccess
                  ? 'linear-gradient(135deg, #065f46, #047857)'
                  : isInfo
                  ? 'linear-gradient(135deg, #4338ca, #3730a3)'
                  : 'linear-gradient(135deg, #b91c1c, #991b1b)',
                color: '#ffffff',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.2)',
                fontSize: '0.88rem',
                fontWeight: 700,
                minWidth: '280px',
                animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {isSuccess ? (
                <CheckCircle2 size={20} color="#a7f3d0" />
              ) : isInfo ? (
                <Sparkles size={20} color="#c7d2fe" />
              ) : (
                <AlertCircle size={20} color="#fecaca" />
              )}

              <span style={{ flex: 1 }}>{t.message}</span>

              <button
                onClick={() => removeToast(t.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  opacity: 0.7,
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
