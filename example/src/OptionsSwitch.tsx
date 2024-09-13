import * as React from 'react';

import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type OptionsSwitchProps = {
  label: string;
  currentOption: string;
  onChosen: (option: string) => void;
  options: { [key: string]: any };
};

export function OptionsSwitch({
  label,
  options,
  currentOption,
  onChosen,
}: OptionsSwitchProps) {
  return (
    <>
      <Text style={styles.controlsText}>{label}:</Text>
      {Object.keys(options).map((key: string) => {
        return (
          <TouchableOpacity onPress={() => onChosen(key)} key={key}>
            <Text
              style={{
                ...styles.controlsText,
                ...styles.controlsSwitcher,
                ...(key === currentOption && styles.controlsSwitcherSelected),
              }}
            >
              {key}
            </Text>
          </TouchableOpacity>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  controlsText: {
    color: 'lightgray',
  },
  controlsSwitcher: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'lightgray',
    color: 'white',
    backgroundColor: 'lightgray',
    paddingVertical: 1,
    paddingHorizontal: 4,
    marginStart: 4,
    fontWeight: '400',
  },
  controlsSwitcherSelected: {
    fontWeight: 'bold',
  },
});
