import iconMap from "./iconMap";

export function getIcon(iconKey) {
  return iconMap[iconKey]?.icon || "📝";
}

export function getAllIconKeys() {
  return Object.keys(iconMap);
}

export function getAllIcons() {
  return Object.values(iconMap).map((item) => item.icon);
}
