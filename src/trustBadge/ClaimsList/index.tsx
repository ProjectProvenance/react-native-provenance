import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  type ImageSourcePropType,
  Text,
} from 'react-native';

import { ofSize } from '../../utils';

const logoImage = require('./img/logo.png');

const iconSize = 34;
const iconOverlap = 8;
const borderWidth = 2;

export function ClaimsList() {
  return (
    <View style={styles.container}>
      <View style={styles.claimsList}>
        <Icon index={0} image={logoImage} />
        <Icon
          index={1}
          image={
            'https://res.cloudinary.com/provenance/image/upload/c_scale,f_auto,w_64/6v6mhfd5n93zoip8dvidzkw0kumo'
          }
        />
        <ClaimsToSee amount={8} />
      </View>
    </View>
  );
}

type IconPorps = {
  index: number;
  image: ImageSourcePropType | string;
};

function Icon({ index, image }: IconPorps) {
  const imageProps: any = {
    style: styles.image,
  };
  if (typeof image === 'string') {
    imageProps.src = image;
  } else {
    imageProps.source = image;
  }

  return (
    <View style={StyleSheet.compose(styles.icon, { zIndex: 4 - index })}>
      <Image {...imageProps} />
    </View>
  );
}

type ClaimsToSeeProps = {
  amount: number;
};

function ClaimsToSee({ amount }: ClaimsToSeeProps) {
  return (
    <View style={styles.icon}>
      <Text style={styles.claimsToSeeAmount} allowFontScaling={false}>
        +{amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: iconSize,
  },
  claimsList: {
    flex: 1,
    flexGrow: 0,
    flexShrink: 0,
    minWidth: iconSize,
    maxWidth: 80,
    flexDirection: 'row',
    paddingLeft: 4,
  },
  icon: {
    borderWidth: borderWidth,
    borderColor: '#EDEDED',
    backgroundColor: '#FFFFFF',
    ...ofSize(iconSize),
    marginLeft: -iconOverlap,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: ofSize(iconSize).borderRadius,
  },
  claimsToSeeAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0A3942',
    lineHeight: 15,
    textAlign: 'center',
  },
});
