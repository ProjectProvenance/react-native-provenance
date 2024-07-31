import * as React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Pic, TrustBadge } from '@provenance/react-native-provenance';

import { Image, Pressable } from 'react-native';

import { designs, defaultDesign } from './initialize';

const appleImage = require('../assets/organic-apple.jpg');

export default function App() {
  const [currentDesign, setCurrentDesign] =
    React.useState<string>(defaultDesign);
  const design = designs[currentDesign];

  if (!design) {
    return (
      <Text>
        No available design found. {currentDesign}. Check your .env file for
        correct bundles definitions.
      </Text>
    );
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <Image style={styles.headerImage} source={appleImage} />
      <View style={styles.productInfoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.textTitle}>Organic apple</Text>
          <Text style={styles.price}>£1.99</Text>
        </View>

        <View>
          <Pressable style={styles.button}>
            <Text style={styles.buttonLabel}>Add to Basket</Text>
          </Pressable>
        </View>

        <TrustBadge bundleId={design.bundleId} sku={design.sku} />

        <View>
          <Pic />
          <Text>
            Indulge in the pure essence of nature with our premium organic
            apples. Grown in lush, pesticide-free orchards, each apple is
            handpicked to ensure the highest quality and freshness. Bursting
            with crisp sweetness and vibrant flavor, our organic apples are a
            testament to sustainable farming practices that nurture the earth.
            Perfect for a healthy snack or a delightful addition to your
            favorite recipes, savor the taste of purity with every bite. Enjoy
            the wholesome goodness and nutritional benefits of apples just as
            nature intended.
          </Text>
        </View>
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.controls}>
          <Text style={styles.controlsText}>Bundle design:</Text>
          {Object.keys(designs).map((key: string) => {
            return (
              <TouchableOpacity onPress={() => setCurrentDesign(key)} key={key}>
                <Text
                  style={{
                    ...styles.controlsText,
                    ...styles.controlsSwitcher,
                    fontWeight: key === currentDesign ? 'bold' : '400',
                  }}
                >
                  {key}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 300,
  },
  productInfoContainer: {
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    fontStyle: 'italic',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#dbdbdb',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 32,
    paddingLeft: 1,
    paddingRight: 1,
    paddingTop: 0.5,
    paddingBottom: 0.5,
    backgroundColor: 'black',
    marginVertical: 8,
  },
  buttonLabel: {
    color: 'white',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  controls: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 20,
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
  },
  controlsText: {
    color: 'lightgray',
  },
  controlsSwitcher: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'lightgray',
    color: 'white',
    backgroundColor: 'lightgray',
    paddingVertical: 1,
    paddingHorizontal: 4,
    marginStart: 4,
  },
});
