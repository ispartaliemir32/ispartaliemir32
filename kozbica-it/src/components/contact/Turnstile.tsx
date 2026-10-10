"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

type TurnstileRenderOptions = {
  sitekey: string;
  action?: string;
  theme?: "light" | "dark" | "auto";
  language?: string;
  size?: "normal" | "flexible" | "compact";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: (code?: string) => boolean | void;
  "timeout-callback"?: () => void;
  "refresh-expired"?: "auto" | "manual" | "never";
  "response-field"?: boolean;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string | undefined;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let scriptPromise: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("turnstile-missing")));
    script.onerror = () => {
      scriptPromise = null;
      script.remove();
      reject(new Error("turnstile-load-failed"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export type TurnstileHandle = { reset: () => void };

type Props = {
  siteKey: string;
  onToken: (token: string) => void;
  onExpire: () => void;
  onError: (reason: "load" | "challenge") => void;
};

/** Cloudflare Turnstile-widget (expliciete rendering). Het token wordt server-side geverifieerd. */
export const Turnstile = forwardRef<TurnstileHandle, Props>(function Turnstile({ siteKey, onToken, onExpire, onError }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const callbacks = useRef({ onToken, onExpire, onError });

  useEffect(() => {
    callbacks.current = { onToken, onExpire, onError };
  }, [onToken, onExpire, onError]);

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetIdRef.current && window.turnstile) window.turnstile.reset(widgetIdRef.current);
    },
  }));

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then((api) => {
        if (cancelled || !containerRef.current || widgetIdRef.current) return;
        widgetIdRef.current =
          api.render(containerRef.current, {
            sitekey: siteKey,
            action: "contact",
            theme: "light",
            language: "nl",
            size: "flexible",
            "response-field": false,
            "refresh-expired": "auto",
            callback: (token) => callbacks.current.onToken(token),
            "expired-callback": () => callbacks.current.onExpire(),
            "timeout-callback": () => callbacks.current.onExpire(),
            "error-callback": () => {
              callbacks.current.onError("challenge");
              // false = Turnstile probeert het zelf opnieuw (retry: auto)
              return false;
            },
          }) ?? null;
      })
      .catch(() => {
        if (!cancelled) callbacks.current.onError("load");
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  return <div ref={containerRef} className="min-h-[65px] w-full" />;
});
