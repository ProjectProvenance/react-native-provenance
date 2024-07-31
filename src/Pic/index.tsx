import { Image, StyleSheet, View } from 'react-native';
import React from 'react';

export function Pic() {
  return (
    <View>
      <Image source={require('../assets/sample.jpg')} style={style.img}></Image>

      {/* <Image
            source={require('@/assets/sample.jpg')}
            style={style.img}
        ></Image> */}
    </View>
  );
}

const style = StyleSheet.create({
  img: {
    width: 64,
    height: 64,
    backgroundColor: 'gray',
  },
});
