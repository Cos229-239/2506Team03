// app/components/ui/IconSymbol.tsx

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ComponentProps } from 'react';
import { StyleProp, TextStyle } from 'react-native';

type IconMapping = Record<string, ComponentProps<typeof MaterialIcons>['name']>;

const MAPPING: IconMapping = {
  'house.fill': 'home',
  'home': 'home',
  'compass': 'explore',
  'message': 'message',
  'person': 'person',
  'settings-sharp': 'settings',
  'send': 'send',
  'chevron.right': 'chevron-right',
  'chevron.left.forwardslash.chevron.right': 'code',
};

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: string;
  size?: number;
  color: string;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <MaterialIcons
      name={MAPPING[name] ?? name}
      color={color}
      size={size}
      style={style}
    />
  );
}
