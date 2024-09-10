import React, { type FC, type ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  type StyleProp,
  type TextStyle,
} from 'react-native';

const maxFontSizeMultiplier = 1.35;

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
    <Text
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      allowFontScaling={false}
      style={style}
    >
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
    // @FIXME: Should be 12, but then it's too small
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 15,
    textAlign: 'left',
    color: '#0A3942',
  },
  secondLineContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 3,
  },
  contentProvenanceLogo: {
    textTransform: 'uppercase',
    // @FIXME: Should be 8
    fontSize: 9,
    color: '#686868',
    letterSpacing: 3,
  },
});
