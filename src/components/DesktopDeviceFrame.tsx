import React, { useState, useEffect, useRef, useCallback } from 'react';

interface DesktopDeviceFrameProps {
  children: React.ReactNode;
}

const PHONE_WIDTH = 393;
const PHONE_HEIGHT = 852;
const SHELL_PADDING = 12; // p-3 = 12px
const BASE_WIDTH = PHONE_WIDTH + SHELL_PADDING * 2; // 417px
const BASE_HEIGHT = PHONE_HEIGHT + SHELL_PADDING * 2; // 876px

export const DesktopDeviceFrame: React.FC<DesktopDeviceFrameProps> = ({ children }) => {
  // 1. Detect if this window is already nested inside an iframe
  const isInsideIframe = typeof window !== 'undefined' && window.self !== window.top;

  // 2. Detect screen width with a (min-width: 768px) media query
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(min-width: 768px)').matches;
  });

  // Calculate dynamic auto-scale to ensure 100% of the phone frame fits on any screen
  const calculateFitScale = useCallback(() => {
    if (typeof window === 'undefined') return 1;
    // Leave 48px vertical safety margin (24px top, 24px bottom) so bottom bezel never cuts off
    const marginY = 48;
    const marginX = 48;
    const availableH = window.innerHeight - marginY;
    const availableW = window.innerWidth - marginX;

    const scaleH = availableH / BASE_HEIGHT;
    const scaleW = availableW / BASE_WIDTH;

    // Must fit both dimensions, never exceed 1 (100% native size), minimum 0.35
    const fitScale = Math.min(1, scaleH, scaleW);
    return Math.max(0.35, fitScale);
  }, []);

  // 3. Scale state (defaults immediately to auto-fit)
  const [scale, setScale] = useState<number>(calculateFitScale);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Monitor window resize and visualViewport zoom changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(min-width: 768px)');
    
    const handleResize = () => {
      const desktop = mql.matches;
      setIsDesktop(desktop);
      if (!isInsideIframe && desktop) {
        setScale(calculateFitScale());
      }
    };

    // Run immediately on mount
    handleResize();

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    mql.addEventListener('change', handleResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      mql.removeEventListener('change', handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
    };
  }, [isInsideIframe, calculateFitScale]);

  // Bi-directional history synchronization: Desktop browser Back/Forward controls
  useEffect(() => {
    if (isInsideIframe || !isDesktop) return;

    const handlePopState = () => {
      const fullPath = window.location.pathname + window.location.search + window.location.hash;
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          iframeRef.current.contentWindow.location.replace(fullPath);
        } catch {
          iframeRef.current.src = fullPath;
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isInsideIframe, isDesktop]);

  // Prevent any parent desktop window scrolling triggered by child iframes
  useEffect(() => {
    if (isInsideIframe || !isDesktop) return;
    const lockDesktopScroll = () => {
      if (window.scrollY !== 0 || window.scrollX !== 0) {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('scroll', lockDesktopScroll, { passive: true });
    return () => window.removeEventListener('scroll', lockDesktopScroll);
  }, [isInsideIframe, isDesktop]);

  // ON MOBILE (< 768px) OR INSIDE IFRAME: Render children directly with zero wrapper
  if (isInsideIframe || !isDesktop) {
    return <>{children}</>;
  }

  // DESKTOP TOP-LEVEL: 1:1 iPhone Viewport Iframe (393px × 852px)
  const initialPath = (typeof window !== 'undefined')
    ? (window.location.pathname + window.location.search + window.location.hash) || '/'
    : '/';

  return (
    <div className="fixed inset-0 w-screen h-screen bg-slate-950 flex items-center justify-center p-3 select-none overflow-hidden z-50">
      
      {/* Outer Titanium Phone Shell with dynamic auto-fit scaling around center */}
      <div 
        className="relative rounded-[54px] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1)] ring-1 ring-slate-900/80 transition-transform duration-150 shrink-0"
        style={{
          width: `${BASE_WIDTH}px`,
          height: `${BASE_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {/* Dynamic Island Pill / Speaker Indicator */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-30 pointer-events-none flex items-center justify-end pr-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800/80" />
        </div>

        {/* Inner Phone Screen Container (Exact Standard iPhone Viewport: 393px × 852px) */}
        <div className="relative rounded-[42px] overflow-hidden bg-background shadow-inner flex flex-col w-full h-full">
          {/* The Isolated Viewport Iframe */}
          <iframe
            ref={iframeRef}
            src={initialPath}
            title="Maxim Hygiene Mobile App Preview"
            className="w-full h-full border-0 select-auto bg-background no-scrollbar"
            style={{
              colorScheme: 'light',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          />
        </div>
      </div>

    </div>
  );
};
