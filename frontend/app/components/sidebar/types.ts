import { type ReactElement } from "react";

export type SidebarLink = {
  id: string;
  kind: "link";
  label: string;
  to: string;
  icon: ReactElement;
  badge?: string;
};

export type SidebarGroup = {
  id: string;
  kind: "group";
  label: string;
  icon: ReactElement;
  submenuId: string;
  children: Array<{ id: string; label: string; to: string }>;
};

export type SidebarItem = SidebarLink | SidebarGroup;

export type SidebarSection = {
  id: string;
  className: string;
  items: SidebarItem[];
};
