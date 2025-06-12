import React from 'react';
import { Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';

import { ReactNode } from 'react';
import { PressableProps } from 'react-native';

type HapticTabProps = {
  children: ReactNode;
  onPress?: (event: any) => void;
} & Omit<PressableProps, 'onPress'>;

export function HapticTab({ children, onPress, ...rest }: HapticTabProps) {
  return (
    <Pressable
      onPress={(event) => {
        Haptics.selectionAsync();
        onPress?.(event);
      }}
      {...rest}
    >
      {children}
    </Pressable>
  );
}
export default HapticTab;