import * as React from 'react';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  useColorScheme,
  Animated,
  Easing,
} from 'react-native';
import { Tick, height as trustBadgeHeight } from './Tick';
import { Bundle, loadingHeight as bundleLoadingHeight } from '../bundle';

type TrustBadgeProps = {
  bundleId: string;
  sku: string;
  onPress?: () => void;
  overlay?: boolean; // when false no default modal will be used, instead Client app needs to instantiate Bundle directly
};

export default function TrustBadge({
  bundleId,
  sku,
  onPress,
  overlay = true,
}: TrustBadgeProps) {
  const [showWebview, setShowWebview] = React.useState(false);

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

  return (
    <View style={{ height: trustBadgeHeight }}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={handleTrustBadgePress}>
          <Tick />
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
