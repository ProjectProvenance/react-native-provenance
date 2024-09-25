import { PixelRatio } from 'react-native';

const minScale = 0.5;
export const maxScale = 1.5;
const fontScale = (currentScale?: number) =>
  Math.max(
    Math.min(currentScale ?? PixelRatio.getFontScale(), maxScale),
    minScale
  );

export const scaled = (dimension: number, currentScale?: number) =>
  PixelRatio.roundToNearestPixel(fontScale(currentScale) * dimension);
