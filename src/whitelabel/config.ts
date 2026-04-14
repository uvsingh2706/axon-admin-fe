import logo from "@/assets/images/logo.webp";
import type {
  ThemeTokenMap,
  WhiteLabelApiResponse,
  WhiteLabelConfig,
} from "./types";
const urbanistFontUrl =
  "https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap";

const FALLBACK_CONFIG: WhiteLabelConfig = {
  platform: "axon",
  typography: {
    fontFamily: "'Urbanist', sans-serif",
    fontUrl: urbanistFontUrl,
  },
  assets: {
    logo,
    logoAlt: "Axon Energies",
    displayName: "Axon Energies",
    adminPanelLabel: "Administrator Panel",
  },
  tokens: {
    "--color-primary-700": "#FF6A00",
    "--color-primary-50": "#FFF3EB",
    "--primary": "#FF6A00",
    "--sidebar-primary": "#FF6A00",
    "--ring": "#FF6A00",
  },
};




const MOCK_WHITE_LABEL_API_RESPONSE: WhiteLabelApiResponse = {
  platform: "demo",
  brandName: "Acme EV",
  logoUrl: "https://dummyimage.com/240x80/2563eb/ffffff.png&text=Acme+EV",
  adminPanelLabel: "Administrator Panel",
  typography: {
    fontFamily: "'Urbanist', sans-serif",
    fontUrl: urbanistFontUrl,
  },
  theme: {
    primary: "#2563EB",
    primaryLight: "#DBEAFE",
    secondary: "#2A3F78",
    secondaryLight: "#EFF4FF",
    textPrimary: "#1F1F1F",
  },
};

function mapApiThemeToTokens(theme: WhiteLabelApiResponse["theme"]): ThemeTokenMap {
  const tokens: ThemeTokenMap = {
    "--color-primary-700": theme.primary,
    "--color-primary-50": theme.primaryLight,
    "--primary": theme.primary,
    "--sidebar-primary": theme.primary,
    "--ring": theme.primary,
  };

  if (theme.secondary) {
    tokens["--color-secondary-700"] = theme.secondary;
  }
  if (theme.secondaryLight) {
    tokens["--color-secondary-50"] = theme.secondaryLight;
  }
  if (theme.textPrimary) {
    tokens["--color-text-950"] = theme.textPrimary;
    tokens["--foreground"] = theme.textPrimary;
  }

  return tokens;
}

function mapApiResponseToWhiteLabelConfig(
  apiResponse: WhiteLabelApiResponse
): WhiteLabelConfig {
  return {
    platform: apiResponse.platform,
    typography: {
      fontFamily: apiResponse.typography.fontFamily,
      fontUrl: apiResponse.typography.fontUrl,
    },
    assets: {
      logo: apiResponse.logoUrl,
      logoAlt: apiResponse.brandName,
      displayName: apiResponse.brandName,
      adminPanelLabel: apiResponse.adminPanelLabel ?? "Administrator Panel",
    },
    tokens: mapApiThemeToTokens(apiResponse.theme),
  };
}

export function getWhiteLabelConfig(): WhiteLabelConfig {
  try {
    // return mapApiResponseToWhiteLabelConfig(MOCK_WHITE_LABEL_API_RESPONSE);
    return FALLBACK_CONFIG;
  } catch {
    return FALLBACK_CONFIG;
  }
}
