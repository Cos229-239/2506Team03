export const Colors = {
  light: {
    background: '#FFFFFF',
    text: '#333333',
    sectionText: '#888888',
    border: '#EEEEEE',
    iconBlue: '#98ADD4',
    iconMauve: '#A0837F',
    iconGold: '#CBA16B',
    ripple: '#f0f0f0',
    tint: '#007aff',
    tabIconDefault: '#ccc',
    tabIconSelected: '#007aff',
  },
  dark: {
    background: '#121212',
    text: '#FFFFFF',
    sectionText: '#AAAAAA',
    border: '#333333',
    iconBlue: '#98ADD4',
    iconMauve: '#A0837F',
    iconGold: '#CBA16B',
    ripple: '#2A2A2A',
    tint: '#0a84ff',
    tabIconDefault: '#ccc',
    tabIconSelected: '#0a84ff',
  },
};

export default Colors;
export type ColorScheme = keyof typeof Colors;