import React from 'react';
import { Ionicons } from '@expo/vector-icons';

type IoniconName = keyof typeof Ionicons.glyphMap;

interface IconProps {
  name: IoniconName;
  size?: number;
  color?: string;
}
export function IconSymbol({ name, size = 24, color = 'black' }: IconProps) {
  return <Ionicons name={name} size={size} color={color} />;
}
export default IconSymbol;
export type { IoniconName, IconProps };