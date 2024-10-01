import { maxScale } from '../../utils/scaling';
import React, { type FC, type ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  type StyleProp,
  type TextStyle,
} from 'react-native';

const maxFontSizeMultiplier = maxScale;

type StatementProps = {
  beforeCompanyName?: ReactNode;
};

export function Statement({ beforeCompanyName }: StatementProps) {
  return (
    <View style={styles.content}>
      <SustainabilityClaims />
      <View style={styles.secondLineContainer}>
        {beforeCompanyName && beforeCompanyName}
        <Provenance />
      </View>
    </View>
  );
}

function SustainabilityClaims() {
  return (
    <StatementText style={styles.contentText}>
      Sustainability Claims
    </StatementText>
  );
}

function Provenance() {
  return (
    <StatementText style={styles.contentProvenanceLogo}>
      Provenance®
    </StatementText>
  );
}

const StatementText: FC<{
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}> = ({ children, style }) => {
  return (
    <Text maxFontSizeMultiplier={maxFontSizeMultiplier} style={style}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  content: {
    marginLeft: 4,
    marginRight: 8,
    marginVertical: 2.5,
  },
  contentText: {
    //fontFamily: 'DM Sans',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 15,
    textAlign: 'left',
    color: '#0A3942',
  },
  secondLineContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  contentProvenanceLogo: {
    textTransform: 'uppercase',
    fontSize: 8,
    color: '#686868',
    letterSpacing: 3,
  },
});
