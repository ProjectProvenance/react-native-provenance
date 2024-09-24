import { PixelRatio } from 'react-native';

const minScale = 0.5;
export const maxScale = 1.5;
const fontScale = () =>
  Math.max(Math.min(PixelRatio.getFontScale(), maxScale), minScale);
export const scaled = (dimention: number) =>
  PixelRatio.roundToNearestPixel(fontScale() * dimention);
