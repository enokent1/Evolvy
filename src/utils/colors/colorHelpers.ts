import colorMap from "./colorMap";
import { ColorData } from "@/types";

export function getColorData(colorKey: string): ColorData {
  return colorMap[colorKey] || colorMap["blue-400"];
}

export function getBorderClass(colorKey: string): string {
  return colorMap[colorKey].borderClass || colorMap["blue-400"].borderClass;
}

export function getBgClass(colorKey: string): string {
  return colorMap[colorKey].bgClass || colorMap["blue-400"].bgClass;
}

export function getBgLightClass(colorKey: string): string {
  return colorMap[colorKey].bgLightClass || colorMap["blue-400"].bgLightClass;
}
