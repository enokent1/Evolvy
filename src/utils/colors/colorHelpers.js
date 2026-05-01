import colorMap from "./colorMap";

export function getColorData(colorKey) {
  return colorMap[colorKey] || colorMap["blue-400"];
}

export function getBorderClass(colorKey) {
  return colorMap[colorKey].borderClass || colorMap["blue-400"].borderClass;
}

export function getBgClass(colorKey) {
  return colorMap[colorKey].bgClass || colorMap["blue-400"].bgClass;
}

export function getBgLightClass(colorKey) {
  return colorMap[colorKey].bgLightClass || colorMap["blue-400"].bgLightClass;
}
