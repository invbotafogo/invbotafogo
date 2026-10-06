/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID: string;
  readonly VITE_EMAILJS_TEMPLATE_ID: string;
  readonly VITE_EMAILJS_PUBLIC_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Hash SHA-256 do código da Central INVB, posto no build pelo vite.config.ts. */
declare const __CODIGO_CENTRAL_SHA256__: string;
