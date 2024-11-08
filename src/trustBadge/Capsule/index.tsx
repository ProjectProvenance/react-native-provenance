import React, { type FC, type ReactNode } from 'react';
import { Platform, View, StyleSheet, Text } from 'react-native';
import { useScaled } from '../../hooks/useScaled';

export const defaultHeight = 32;

export const Capsule: FC<{ children: ReactNode; height?: number }> = ({
  children,
  height = defaultHeight,
}) => {
  const { scaled } = useScaled();

  return (
    <View style={styles.container}>
      <View
        style={StyleSheet.compose(styles.trustBadge, {
          flexBasis: scaled(height),
          borderRadius: scaled(height) / 2,
        })}
      >
        {children}
        <Text style={styles.chevron}>›</Text>
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
  chevron: {
    color: '#0A3942',
    ...(Platform.OS === 'ios' && { fontSize: 24 }),
    marginTop: Platform.OS === 'ios' ? -4 : -8,
    paddingHorizontal: 4,
  },
});
