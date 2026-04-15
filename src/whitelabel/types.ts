export type ThemeTokenMap = Record<`--${string}`, string>;

export interface WhiteLabelApiTheme {
  primary: string;
  primaryLight: string;
  secondary?: string;
  secondaryLight?: string;
  textPrimary?: string;
}

export interface WhiteLabelApiTypography {
  fontFamily: string;
  fontUrl?: string;
}

export interface WhiteLabelApiResponse {
  platform: string;
  brandName: string;
  logoUrl: string;
  adminPanelLabel?: string;
  typography: WhiteLabelApiTypography;
  theme: WhiteLabelApiTheme;
}

export interface WhiteLabelTypography {
  fontFamily: string;
  fontUrl?: string;
}

export interface WhiteLabelAssets {
  logo: string;
  logoAlt: string;
  displayName: string;
  adminPanelLabel: string;
}

export interface WhiteLabelConfig {
  platform: string;
  typography: WhiteLabelTypography;
  assets: WhiteLabelAssets;
  tokens: ThemeTokenMap;
}
