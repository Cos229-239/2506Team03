import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

type ThemedTextType = 'default' | 'defaultSemiBold' | 'title' | 'subtitle' | 'link';

interface Props extends TextProps {
  children: React.ReactNode;
  type?: ThemedTextType;
  style?: TextStyle;
}

export function ThemedText({ type = 'default', style, children, ...rest }: Props) {
  const baseStyle: TextStyle = (() => {
    switch (type) {
      case 'title':
        return { fontSize: 24, fontWeight: 'bold' };
      case 'subtitle':
        return { fontSize: 18, fontWeight: '600', marginBottom: 6 };
      case 'defaultSemiBold':
        return { fontWeight: '600' };
      case 'link':
        return { color: 'blue', textDecorationLine: 'underline' };
      default:
        return {};
    }
  })();

  return (
    <Text style={[baseStyle, style]} {...rest}>
      {children}
    </Text>
  );
}
export default ThemedText;