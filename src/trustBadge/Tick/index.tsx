import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export const height = 32;

export function Tick() {
  return (
    <View style={styles.trustBadge}>
      <View style={styles.tick}>
        <Image
          source={require('./img/checked.png')}
          style={styles.tickImage}
        ></Image>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>Sustainability Claims</Text>
        <Text style={styles.contentProvenanceLogo}>Provenance®</Text>
      </View>
    </View>
  );
}

// Neutral default
const styles = StyleSheet.create({
  trustBadge: {
    width: 179,
    height: height,
    borderRadius: 18,
    paddingHorizontal: 4,
    paddingVertical: 0,
    backgroundColor: '#EDEDED',
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    marginLeft: 4,
    marginVertical: 1.5,
    height: 27,
    width: 123,
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
