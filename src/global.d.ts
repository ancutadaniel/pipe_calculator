declare global {
  interface Window {
    electron?: {
      getAppVersion: () => Promise<string>;
    };
    process?: {
      type?: string;
    };
  }
}

export {};
