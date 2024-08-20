import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const maxFontSizeMultiplier = 1.35;
export const height = 32;

export function Tick() {
  return (
    <View style={styles.container}>
      <View style={styles.trustBadge}>
        <View style={styles.tick}>
          <Image
            source={require('./img/checked.png')}
            style={styles.tickImage}
          ></Image>
        </View>
        <View style={styles.content}>
          <Text
            style={styles.contentText}
            maxFontSizeMultiplier={maxFontSizeMultiplier}
          >
            Sustainability Claims
          </Text>
          <Text
            style={styles.contentProvenanceLogo}
            maxFontSizeMultiplier={maxFontSizeMultiplier}
          >
            Provenance®
          </Text>
        </View>
      </View>
    </View>
  );
}

// Neutral default
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    minWidth: 179,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  trustBadge: {
    width: 'auto',
    borderRadius: 18,
    paddingHorizontal: 4,
    paddingVertical: 0,
    backgroundColor: '#EDEDED',
    flexBasis: height,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    marginLeft: 4,
    marginRight: 8,
    marginVertical: 1.5,
  },
  contentText: {
    //fontFamily: 'DM Sans',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 15,
    textAlign: 'left',
    color: '#0A3942',
  },
  contentProvenanceLogo: {
    textTransform: 'uppercase',
    fontSize: 8,
    color: '#686868',
    letterSpacing: 3,
  },
  tick: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: '#08856C',
  },
  tickImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
