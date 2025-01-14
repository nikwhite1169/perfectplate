import { AppRegistry } from 'react-native';
import App from './App'; // Ensure the path to your App component is correct
import { name as appName } from './app.json';

// Ensure the main app component is registered correctly
AppRegistry.registerComponent(appName, () => App);
