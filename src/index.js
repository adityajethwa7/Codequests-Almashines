import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  ':root': {
    'fontFamily': 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    'lineHeight': [{ 'unit': 'px', 'value': 1.5 }],
    'fontWeight': '400',
    'colorScheme': 'light dark',
    'color': 'rgba(255, 255, 255, 0.87)',
    'backgroundColor': '#242424',
    'fontSynthesis': 'none',
    'textRendering': 'optimizeLegibility',
    'WebkitFontSmoothing': 'antialiased',
    'MozOsxFontSmoothing': 'grayscale',
    'prefers-color-scheme ligh': {
      'color': '#213547',
      'backgroundColor': '#ffffff'
    }
  },
  'a': {
    'fontWeight': '500',
    'color': '#646cff',
    'textDecoration': 'inherit'
  },
  'a:hover': {
    'color': '#535bf2'
  },
  'body': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'display': 'flex',
    'placeItems': 'center',
    'minWidth': [{ 'unit': 'px', 'value': 320 }],
    'minHeight': [{ 'unit': 'vh', 'value': 100 }]
  },
  'h1': {
    'fontSize': [{ 'unit': 'em', 'value': 3.2 }],
    'lineHeight': [{ 'unit': 'px', 'value': 1.1 }]
  },
  'button': {
    'borderRadius': '8px',
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': 'transparent' }],
    'padding': [{ 'unit': 'em', 'value': 0.6 }, { 'unit': 'em', 'value': 1.2 }, { 'unit': 'em', 'value': 0.6 }, { 'unit': 'em', 'value': 1.2 }],
    'fontSize': [{ 'unit': 'em', 'value': 1 }],
    'fontWeight': '500',
    'fontFamily': 'inherit',
    'backgroundColor': '#1a1a1a',
    'cursor': 'pointer',
    'transition': 'border-color 0.25s'
  },
  'button:hover': {
    'borderColor': '#646cff'
  },
  'button:focus': {
    'outline': '4px auto -webkit-focus-ring-color'
  },
  'button:focus-visible': {
    'outline': '4px auto -webkit-focus-ring-color'
  }
});
