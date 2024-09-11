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

type ClaimsListProps = {
  claimsIcons: string[];
};

export function ClaimsList({ claimsIcons }: ClaimsListProps) {
  const showableIcons = claimsIcons.filter(
    (v) => v.startsWith('http://') || v.startsWith('https://')
  );
  const maxIconsToShow =
    showableIcons.length > 3 || claimsIcons.length > showableIcons.length
      ? 2
      : 3;
  const iconsToShow = showableIcons.slice(0, maxIconsToShow);
  const iconsNotShown = claimsIcons.length - iconsToShow.length;

  let placesToShow = 0;
  if (iconsNotShown > 0) placesToShow++;
  if (iconsToShow.length === 0) placesToShow++;
  placesToShow = Math.min(3, placesToShow + iconsToShow.length);
  let width = Math.max((iconSize - iconOverlap) * placesToShow, iconSize);

  return (
    <View style={{ ...styles.container, width }} testID="ClaimsListContainer">
      <View style={styles.claimsList}>
        {iconsToShow.length === 0 && (
          <Icon
            index={0}
            image={logoImage}
            accessibilityLabel={'Provenance logo'}
          />
        )}

        {iconsToShow.map((icon, index) => (
          <Icon image={icon} index={index} key={index} />
        ))}

        {iconsNotShown > 0 && <ClaimsToSee amount={iconsNotShown} />}
      </View>
    </View>
  );
}

type IconPorps = {
  index: number;
  image: ImageSourcePropType | string;
  accessibilityLabel?: string;
};

function Icon({ index, image, accessibilityLabel = 'Claim icon' }: IconPorps) {
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
      <Image {...imageProps} accessibilityLabel={accessibilityLabel} />
    </View>
  );
}

type ClaimsToSeeProps = {
  amount: number;
};

function ClaimsToSee({ amount }: ClaimsToSeeProps) {
  return (
    <View style={styles.icon}>
      <Text
        style={styles.claimsToSeeAmount}
        allowFontScaling={false}
        accessibilityLabel="More claims"
      >
        +{amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: iconSize,
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
