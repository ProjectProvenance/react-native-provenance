import { useWindowDimensions } from 'react-native';
import { scaled } from '../utils/scaling';

export const useScaled = () => {
  const { fontScale } = useWindowDimensions();

  const scaledUpToFontSize = (dimention: number) =>
    scaled(dimention, fontScale);

  return { scaled: scaledUpToFontSize };
};
