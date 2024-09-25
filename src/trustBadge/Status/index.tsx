import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { ofSize } from '../../utils';
import { useScaled } from '../../hooks/useScaled';

export function Status({ size = 24 }: { size?: number }) {
  const { scaled } = useScaled();
  const sizeProps = ofSize(scaled(size));
  const tick = StyleSheet.compose(styles.tick, sizeProps);

  return (
    <View style={tick}>
      <Image source={require('./img/checked.png')} style={sizeProps} />
    </View>
  );
}

const defaultSize = ofSize(24);
const styles = StyleSheet.create({
  tick: {
    backgroundColor: '#08856C',
    ...defaultSize,
  },
});
