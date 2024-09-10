import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { ofSize } from '../../utils';

export function Status({ size = 24 }: { size?: number }) {
  const sizeProps = ofSize(size);
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
