import defaultLogo from "@/assets/images/logo.webp";

type BrandTheme = {
  displayName: string;
  logo: {
    src: string;
    alt: string;
  };
  typography: {
    fontFamily: string;
  };
  cssVariables: Record<string, string>;
};

const fallbackBrand: BrandTheme = {
  displayName: "Axon Energies",
  logo: {
    src: defaultLogo,
    alt: "Axon Energies",
  },
  typography: {
    fontFamily: "'Urbanist', sans-serif",
  },
  cssVariables: {
    "--primary": "#FF6A00",
    "--ring": "#FF6A00",
    "--sidebar-primary": "#FF6A00",
    "--sidebar-ring": "#FF6A00",
    "--color-primary-700": "#FF6A00",
    "--color-primary-600": "#FF7614",
    "--color-primary-50": "#FFF3EB",
  },
};

const brandByPlatform: Record<string, Partial<BrandTheme>> = {
  axon: {},
  demo: {
    displayName: "Demo Mobility",
    cssVariables: {
      "--primary": "#0A84FF",
      "--ring": "#0A84FF",
      "--sidebar-primary": "#0A84FF",
      "--sidebar-ring": "#0A84FF",
      "--color-primary-700": "#0A84FF",
      "--color-primary-600": "#0064D6",
      "--color-primary-50": "#EAF4FF",
    },
  },
};

const env = import.meta.env;
const platform = (env.VITE_PLATFORM ?? "axon").toLowerCase();
const platformBrand = brandByPlatform[platform] ?? {};

const envLogo = env.VITE_BRAND_LOGO_URL;
const envDisplayName = env.VITE_BRAND_DISPLAY_NAME;
const envFontFamily = env.VITE_BRAND_FONT_FAMILY;
const envPrimary = env.VITE_BRAND_PRIMARY_COLOR;
const envPrimaryLight = env.VITE_BRAND_PRIMARY_LIGHT_COLOR;

export const brandTheme: BrandTheme = {
  ...fallbackBrand,
  ...platformBrand,
  displayName: envDisplayName ?? platformBrand.displayName ?? fallbackBrand.displayName,
  logo: {
    ...fallbackBrand.logo,
    ...platformBrand.logo,
    src: envLogo ?? platformBrand.logo?.src ?? fallbackBrand.logo.src,
    alt: envDisplayName ?? platformBrand.displayName ?? fallbackBrand.logo.alt,
  },
  typography: {
    ...fallbackBrand.typography,
    ...platformBrand.typography,
    fontFamily:
      envFontFamily ??
      platformBrand.typography?.fontFamily ??
      fallbackBrand.typography.fontFamily,
  },
  cssVariables: {
    ...fallbackBrand.cssVariables,
    ...(platformBrand.cssVariables ?? {}),
    ...(envPrimary ? { "--primary": envPrimary, "--ring": envPrimary, "--sidebar-primary": envPrimary, "--sidebar-ring": envPrimary, "--color-primary-700": envPrimary } : {}),
    ...(envPrimaryLight ? { "--color-primary-50": envPrimaryLight } : {}),
  },
};

export const activePlatform = platform;
