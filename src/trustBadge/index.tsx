import * as React from 'react';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  useColorScheme,
  Animated,
  Easing,
  useWindowDimensions,
} from 'react-native';
import { Tick } from './Tick';
import {
  Bundle,
  loadingHeight as bundleLoadingHeight,
  minModalHeight,
} from '../bundle';
import { ProofPoint } from './ProofPoint';

type TrustBadgeProps = {
  bundleId: string;
  sku: string;
  onPress?: () => void;
  overlay?: boolean; // when false no default modal will be used, instead Client app needs to instantiate Bundle directly
  overlayHeight?: number | string; // when provided this height will be used to set overlay height when ProofPoint details modal is shown. Should be above 530
  variant?: string;
};

const supportedVariants = ['Tick', 'ProofPoint'];

export default function TrustBadge({
  bundleId,
  sku,
  onPress,
  overlay = true,
  overlayHeight,
  variant = 'Tick',
}: TrustBadgeProps) {
  const [showWebview, setShowWebview] = React.useState(false);
  const { height } = useWindowDimensions();

  if (typeof overlayHeight === 'string') {
    if (!overlayHeight.match(/\d{1,3}%/))
      throw new Error(
        `overlayHeight value is invalid. It should be correct percentage value`
      );

    overlayHeight =
      (parseInt(overlayHeight.replace('%', ''), 10) / 100) * height;
  }

  if (overlayHeight && overlayHeight <= minModalHeight) {
    throw new Error(
      `The current value: ${overlayHeight} of overlayHeight is invalid. It should be bigger than ${minModalHeight}`
    );
  }

  if (!supportedVariants.includes(variant))
    throw new Error(
      `Trust badge variant "${variant}" is invalid. Please pass one of ${supportedVariants.join(',')}`
    );

  // get theme info
  const colorScheme = useColorScheme() ?? 'light';
  const [containerHeight, setContainerHeight] =
    React.useState(bundleLoadingHeight);
  const toggleBundle = () => {
    setShowWebview(!showWebview);
  };

  const handleTrustBadgePress = () => {
    if (onPress) onPress();

    if (overlay) toggleBundle();
  };

  // animating for container
  const growAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (showWebview) {
      Animated.timing(growAnim, {
        toValue: containerHeight,
        easing: Easing.ease,
        duration: 350,
        useNativeDriver: false,
      }).start();
    }
  }, [growAnim, containerHeight, showWebview]);

  const trustBadgeHeight =
    variant === 'Tick' ? Tick.getHeight() : ProofPoint.getHeight();

  return (
    <View style={{ flexBasis: trustBadgeHeight }}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={handleTrustBadgePress}>
          {variant === 'Tick' ? <Tick /> : <ProofPoint />}
        </TouchableOpacity>

        {overlay && (
          <Modal
            visible={showWebview}
            transparent={true}
            onRequestClose={() => setShowWebview(!showWebview)}
            animationType="slide"
          >
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <TouchableOpacity onPress={toggleBundle} style={{ flex: 1 }} />
              <Animated.View
                style={{ ...styles.modalContainer, height: growAnim }}
              >
                {showWebview && (
                  <Bundle
                    bundleId={bundleId}
                    sku={sku}
                    onResized={(newSize: number) => setContainerHeight(newSize)}
                    onModalShown={() =>
                      overlayHeight && setContainerHeight(overlayHeight)
                    }
                    colorScheme={colorScheme}
                  />
                )}
              </Animated.View>
            </View>
          </Modal>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    height: bundleLoadingHeight,
    borderTopWidth: 1,
    borderColor: '#EDEDED',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 3,
  },
});
