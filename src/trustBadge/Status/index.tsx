import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

export function Status() {
  return (
    <View style={styles.tick}>
      <Image
        source={require('./img/checked.png')}
        style={styles.tickImage}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  tick: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#08856C',
  },
  tickImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
