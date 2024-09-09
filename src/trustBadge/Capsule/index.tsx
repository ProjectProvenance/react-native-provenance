import React, { type FC, type ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

export const height = 32;

export const Capsule: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.trustBadge}>{children}</View>
    </View>
  );
};

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
});
