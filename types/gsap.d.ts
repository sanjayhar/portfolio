// Type shims for dynamically imported GSAP sub-modules.
// These are resolved at runtime once the package is installed;
// this file prevents TypeScript from erroring in CI / sandbox environments.

declare module "gsap/ScrollTrigger" {
  export const ScrollTrigger: {
    getAll: () => Array<{ vars: Record<string, unknown>; kill: () => void }>;
    // allow any other static calls
    [key: string]: unknown;
  };
}

declare module "gsap" {
  export const gsap: {
    registerPlugin: (...args: unknown[]) => void;
    set: (targets: unknown, vars: Record<string, unknown>) => void;
    to: (targets: unknown, vars: Record<string, unknown>) => { kill: () => void };
    from: (targets: unknown, vars: Record<string, unknown>) => { kill: () => void };
    timeline: (vars?: Record<string, unknown>) => unknown;
    [key: string]: unknown;
  };
}

// React Three Fiber extends JSX.IntrinsicElements with Three.js primitives.
// Once R3F is installed this is handled automatically; this shim silences
// the "does not exist on JSX.IntrinsicElements" errors in the sandbox.
declare namespace JSX {
  interface IntrinsicElements {
    mesh: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, unknown>;
    group: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, unknown>;
    boxGeometry: Record<string, unknown>;
    icosahedronGeometry: Record<string, unknown>;
    torusGeometry: Record<string, unknown>;
    octahedronGeometry: Record<string, unknown>;
    meshStandardMaterial: Record<string, unknown>;
    ambientLight: Record<string, unknown>;
    pointLight: Record<string, unknown>;
  }
}
