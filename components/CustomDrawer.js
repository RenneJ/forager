import { DrawerContentScrollView, DrawerItemList, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from "react-native";
import { useContext } from "react";
import Access from "../screens/Access";
import Login from '../screens/Login';
import Collections from '../screens/Collections';
import Forage from '../screens/Forage';
import Profile from '../screens/Profile';
import Signup from '../screens/Signup';
import styles from '../styles';
import { AuthContext } from "../utils/context";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function CustomDrawerContent(props) {
	const { signOut } = useContext(AuthContext);

	const handleLogOut = () => {
		signOut();
	}
	// TODO: Loading indicator, isLoading alrdy passed in props
  return (
    <DrawerContentScrollView {...props}>
	    <DrawerItemList {...props} />
	      <DrawerItem
					style={styles.drawerLogout}
					label={() => <Text style={styles.warning}>Logout</Text>}
	        onPress={handleLogOut}
	      />
    </DrawerContentScrollView>
  );
}

export default function CustomDrawer(props){

	return(
		<NavigationContainer>
			{props.state.userToken == null ? (
				<Stack.Navigator initialRouteName="Signup">
						{/*<Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>*/}
						<Stack.Screen name="Signup" component={Signup} />
				</Stack.Navigator>
			) : (
				<Drawer.Navigator initialRouteName="Forage" drawerContent={props => <CustomDrawerContent {...props} />}>
					<Drawer.Screen name="Forage" component={Forage} />
					<Drawer.Screen name="Collections" component={Collections} />
					<Drawer.Screen name="Profile" component={Profile} />
				</Drawer.Navigator>
			)}
		</NavigationContainer>
	)
}
