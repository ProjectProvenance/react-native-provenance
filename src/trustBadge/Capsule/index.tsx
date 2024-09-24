import React, { type FC, type ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { scaled } from '../../utils/scaling';

export const defaultHeight = 32;

export const Capsule: FC<{ children: ReactNode; height?: number }> = ({
  children,
  height = defaultHeight,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={StyleSheet.compose(styles.trustBadge, {
          flexBasis: scaled(height),
          borderRadius: scaled(height) / 2,
        })}
      >
        {children}
      </View>
    </View>
  );
};

// Neutral default
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    minWidth: 179,
    maxWidth: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  trustBadge: {
    width: 'auto',
    borderRadius: defaultHeight / 2,
    paddingHorizontal: 4,
    paddingVertical: 0,
    backgroundColor: '#EDEDED',
    flexBasis: defaultHeight,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
