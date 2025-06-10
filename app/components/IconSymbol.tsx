import React from 'react';
import { Ionicons } from '@expo/vector-icons';

type IoniconName = keyof typeof Ionicons.glyphMap;

interface IconProps {
  name: IoniconName;
  size?: number;
  color?: string;
  style?: object;
}

export const IconSymbol = ({ name, size = 24, color = 'black', style }: IconProps) => {
  return <Ionicons name={name} size={size} color={color} style={style} />;
};
export default IconSymbol;