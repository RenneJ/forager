import { DrawerContentScrollView, DrawerItemList, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Text } from "react-native";
import { useContext } from "react";
import Collections from '../screens/Collections';
import Forage from '../screens/Forage';
import Profile from '../screens/Profile';
import Signup from '../screens/Signup';
import Spots from '../screens/Spots';
import styles from '../styles';
import { AuthContext } from "../utils/context";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function CustomDrawerContent(props) {
	const { signOut } = useContext(AuthContext);

	const handleLogOut = () => {
		signOut();
	}

  return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: "#8ed4a5" }}
			forceInset={{ top: "always", horizontal: "never" }}
		>
		<DrawerContentScrollView contentContainerStyle={styles.drawer }  {...props}>
	    <DrawerItemList {...props} />
    </DrawerContentScrollView>
      <DrawerItem
				label={() => <Text style={styles.drawerLogout}>Logout</Text>}
        onPress={handleLogOut}
      />
  </SafeAreaView>
  );
}

export default function CustomDrawer(props){

	return(
		<SafeAreaProvider>
		<NavigationContainer>
			{props.state.userToken == null ? (
				<Stack.Navigator
					screenOptions={{ headerShown: false }}
					initialRouteName="Signup"
				>
						<Stack.Screen name="Signup" component={Signup} />
				</Stack.Navigator>
			) : (
				<Drawer.Navigator
					screenOptions={{ headerStyle: { backgroundColor: "#8ed4a5"} }}
					initialRouteName="Collections"
					drawerContent={props => <CustomDrawerContent {...props} />}
				>
					<Drawer.Screen name="Collections" component={Collections} options={styles.drawerItem}/>
					<Drawer.Screen name="Spots" component={Spots} options={styles.drawerItem}/>
					<Drawer.Screen name="Forage" component={Forage} options={styles.drawerItem} />
					<Drawer.Screen name="Profile" component={Profile} options={styles.drawerItem}/>
				</Drawer.Navigator>
			)}
		</NavigationContainer>
	</SafeAreaProvider>
		)
}
