import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { TrustBadge } from '@provenance/react-native-provenance';

import { Image, Pressable } from 'react-native';

import { examples, defaultExample } from './initialize';
import { OptionsSwitch } from './OptionsSwitch';

const variants = {
  Tick: 0,
  ProofPoint: 0,
};

export default function App() {
  const [currentExample, setCurrentExample] =
    React.useState<string>(defaultExample);
  const example = examples[currentExample];

  const [currentVariant, setCurrentVariant] =
    React.useState<string>('ProofPoint');

  if (!example) {
    return (
      <Text>
        No available design found. {currentExample}. Check your .env file for
        correct bundles definitions.
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.headerImage}
        source={require('../assets/organic-apple.jpg')}
      />
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

        <TrustBadge
          sku={example.sku}
          overlayHeight={'80%'}
          variant={currentVariant}
        />

        <View>
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
          <OptionsSwitch
            label={'Example'}
            options={examples}
            currentOption={currentExample}
            onChosen={setCurrentExample}
          />

          <OptionsSwitch
            label={'Variant'}
            options={variants}
            currentOption={currentVariant}
            onChosen={setCurrentVariant}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
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
});
