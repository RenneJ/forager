// app needs to be imported first or at least before auth fro ./utils/authentication
import { app } from "./firebaseconfig";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
import Profile from './components/Profile';
import Forage from './components/Forage';
import Collections from './components/Collections';
import Login from './components/Login';
import Signup from './components/Signup';
import { auth } from './utils/authentication';
import styles from "./components/styles";

const Drawer = createDrawerNavigator();
const currentUser = auth.currentUser;
//const db = getFirestore(app);
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
		< NavigationContainer >
			{currentUser && <View style={styles.container}><Text>{ currentUser.email }</Text></View>}
			<Drawer.Navigator initialRouteName="Signup">
				<Drawer.Screen name="Signup" component={Signup} />
				<Drawer.Screen name="Forage" component={Forage} />
				<Drawer.Screen name="Collections" component={Collections} />
				<Drawer.Screen name="Profile" component={Profile} />
			</Drawer.Navigator>
			<StatusBar style="auto" />
		</NavigationContainer >
  );
}
