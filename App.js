import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from './components/Profile';
import Forage from './components/Forage';
import Collections from './components/Collections';
import Login from './components/Login';

const Drawer = createDrawerNavigator();

export default function App() {
	// TODO:
	// 1. Routing in app
	// 1.1. User page
	// 1.2. Forage page - inputs for shrooms, date, and location
	// 2. User login/signup
	// 3. User specific data
	// 4. Add data
	// 5. Connect to firestore
  return (
  	<NavigationContainer>
   		<Drawer.Navigator initialRouteName="Forage">
	     	<Drawer.Screen name="Forage" component={Forage} />
	      <Drawer.Screen name="Collections" component={Collections} />
			</Drawer.Navigator>
			<StatusBar style="auto" />
    </NavigationContainer>
  );
}
