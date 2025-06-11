import React from 'react';
import { Linking, Text, TouchableOpacity } from 'react-native';

export const ExternalLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const open = () => Linking.openURL(href);
  return <TouchableOpacity onPress={open}>{children}</TouchableOpacity>;
};
export default ExternalLink;