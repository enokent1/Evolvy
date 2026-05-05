import iconMap from "./iconMap";
import { IconData } from "@/types";

export function getIcon(iconKey: string): string {
  return iconMap[iconKey]?.icon || "📝";
}

export function getAllIconKeys(): string[] {
  return Object.keys(iconMap);
}

export function getAllIcons(): string[] {
  return Object.values(iconMap).map((item: IconData) => item.icon);
}
