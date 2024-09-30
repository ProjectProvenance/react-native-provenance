import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  type ImageSourcePropType,
  Text,
} from 'react-native';

import { ofSize } from '../../utils';
import { maxScale } from '../../utils/scaling';
import { useScaled } from '../../hooks/useScaled';

const logoImage = require('./img/logo.png');

const iconSize = 34;
const iconOverlap = 8;
const borderWidth = 2;

type ClaimsListProps = {
  claimsIcons: string[];
};

export function ClaimsList({ claimsIcons }: ClaimsListProps) {
  const { scaled } = useScaled();

  const showableIcons = claimsIcons.filter(
    (v) => v.startsWith('http://') || v.startsWith('https://')
  );
  const maxIconsToShow =
    showableIcons.length > 3 || claimsIcons.length > showableIcons.length
      ? 2
      : 3;
  const iconsToShow = showableIcons.slice(0, maxIconsToShow);
  const iconsNotShown = claimsIcons.length - iconsToShow.length;

  let width = scaled(iconSize);
  let placesToShow = 0;
  if (iconsNotShown > 0) placesToShow++;
  if (iconsToShow.length === 0) placesToShow++;
  placesToShow = Math.min(3, placesToShow + iconsToShow.length);
  if (placesToShow > 1) {
    width = scaled(iconSize + (iconSize - iconOverlap) * (placesToShow - 1));
  }

  return (
    <View
      style={{
        ...styles.container,
        width,
        height: scaled(styles.container.height),
      }}
      testID="ClaimsListContainer"
    >
      <View
        style={{
          ...styles.claimsList,
          minWidth: scaled(styles.claimsList.minWidth),
          maxWidth: scaled(styles.claimsList.maxWidth),
        }}
      >
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
  const { scaled } = useScaled();

  const imageProps: any = {
    style: {
      ...styles.image,
      borderRadius: ofSize(scaled(iconSize)).borderRadius,
    },
  };
  if (typeof image === 'string') {
    imageProps.source = { uri: image };
  } else {
    imageProps.source = image;
  }

  return (
    <View
      style={{
        ...styles.icon,
        zIndex: 4 - index,
        marginLeft: index > 0 ? -scaled(iconOverlap) : 0,
        ...ofSize(scaled(iconSize)),
      }}
    >
      <Image {...imageProps} accessibilityLabel={accessibilityLabel} />
    </View>
  );
}

type ClaimsToSeeProps = {
  amount: number;
};

function ClaimsToSee({ amount }: ClaimsToSeeProps) {
  const { scaled } = useScaled();

  return (
    <View
      style={{
        ...styles.icon,
        marginLeft: -scaled(iconOverlap),
        ...ofSize(scaled(iconSize)),
      }}
    >
      <Text
        style={styles.claimsToSeeAmount}
        maxFontSizeMultiplier={maxScale}
        accessibilityLabel="More claims"
      >
        +{amount}
      </Text>
    </View>
  );
}

const fixCapsulePadding = -3;
const styles = StyleSheet.create({
  container: {
    width: iconSize,
    height: iconSize,
    marginLeft: fixCapsulePadding,
    marginRight: fixCapsulePadding,
  },
  claimsList: {
    flex: 1,
    flexGrow: 0,
    flexShrink: 0,
    minWidth: iconSize,
    maxWidth: 80,
    flexDirection: 'row',
  },
  icon: {
    borderWidth: borderWidth,
    borderColor: '#EDEDED',
    backgroundColor: '#FFFFFF',
    ...ofSize(iconSize),
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
