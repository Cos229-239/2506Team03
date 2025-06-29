export const Colors = {
  light: {
    text: '#000',
    background: '#fff',
    tint: '#007aff',
    border: '#EEEEEE',
    sectionText: '#888888',
    tabIconDefault: '#ccc',
    tabIconSelected: '#007aff',
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: '#0a84ff',
    border: '#333333',
    sectionText: '#AAAAAA',
    tabIconDefault: '#ccc',
    tabIconSelected: '#0a84ff',
  },
};

export default Colors;
export type ColorScheme = keyof typeof Colors;