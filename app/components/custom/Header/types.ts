import { ReactNode } from "react";

export interface NavLinkType {
  label: string;
  path: string;
  isBold?: boolean;
}

export interface IconNavLinkType {
  icon: ReactNode;
  path: string;
}

export interface FeatureLinkType {
  label: string;
  path: string;
  icon: ReactNode;
}
