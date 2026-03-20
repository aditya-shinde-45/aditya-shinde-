import React, { useEffect } from 'react';
import resumePdf from '../assets/Aditya-Shinde SDE & Devops engineer.pdf';

interface ResumeViewerProps {
  onClose: () => void;
}

const ResumeViewer: React.FC<ResumeViewerProps> = ({ onClose }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <>
      {/* ── Mobile: full-screen (below lg) ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Resume Viewer"
        className="lg:hidden"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #E0F2FE 0%, #ffffff 60%, #F3E8FF 100%)',
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
        }}
      >
        <TopBar onClose={onClose} />
        <PdfArea />
      </div>

      {/* ── Desktop: centered modal overlay (lg+) ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Resume Viewer"
        className="hidden lg:flex"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(15, 23, 42, 0.55)',
          backdropFilter: 'blur(6px)',
        }}
        onClick={onClose}
      >
        {/* Modal card — stop click propagation so clicking inside doesn't close */}
        <div
          onClick={e => e.stopPropagation()}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '90vw',
            maxWidth: '960px',
            height: '90vh',
            borderRadius: '20px',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #E0F2FE 0%, #ffffff 60%, #F3E8FF 100%)',
            boxShadow: '0 24px 80px 0 rgba(0,0,0,0.25)',
            border: '1px solid #e2e8f0',
          }}
        >
          <TopBar onClose={onClose} />
          <PdfArea />
        </div>
      </div>
    </>
  );
};

/* ── Shared sub-components ── */

const TopBar: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 16px',
      borderBottom: '1px solid #e2e8f0',
      background: 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(12px)',
      flexShrink: 0,
      minHeight: '52px',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #0EA5E9, #A78BFA)',
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontWeight: 600,
          color: '#1e293b',
          fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        Aditya Shinde — Resume
      </span>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
      <a
        href={resumePdf}
        download="Aditya-Shinde-Resume.pdf"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '7px 14px',
          borderRadius: '12px',
          border: '2px solid #0EA5E9',
          color: '#0EA5E9',
          fontWeight: 600,
          fontSize: 'clamp(0.7rem, 2vw, 0.875rem)',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          transition: 'background 0.2s, color 0.2s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.background = '#0EA5E9';
          (e.currentTarget as HTMLAnchorElement).style.color = '#fff';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
          (e.currentTarget as HTMLAnchorElement).style.color = '#0EA5E9';
        }}
      >
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
        </svg>
        <span>Download</span>
      </a>

      <button
        onClick={onClose}
        aria-label="Close resume viewer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          border: 'none',
          background: '#f1f5f9',
          color: '#64748b',
          cursor: 'pointer',
          flexShrink: 0,
          transition: 'background 0.2s, color 0.2s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = '#fee2e2';
          (e.currentTarget as HTMLButtonElement).style.color = '#ef4444';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = '#f1f5f9';
          (e.currentTarget as HTMLButtonElement).style.color = '#64748b';
        }}
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
);

const PdfArea: React.FC = () => (
  <div
    style={{
      flex: 1,
      overflow: 'hidden',
      padding: 'clamp(6px, 2vw, 20px)',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div
      style={{
        flex: 1,
        borderRadius: 'clamp(8px, 2vw, 16px)',
        overflow: 'hidden',
        boxShadow: '0 8px 40px 0 rgba(0,0,0,0.10)',
        border: '1px solid #e2e8f0',
        background: '#fff',
      }}
    >
      <iframe
        src={`${resumePdf}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
        title="Aditya Shinde Resume"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
      />
    </div>
  </div>
);

export default ResumeViewer;
