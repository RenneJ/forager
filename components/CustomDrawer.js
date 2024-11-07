import { DrawerContentScrollView, DrawerItemList, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from "react-native";
import Access from "../screens/Access";
import Collections from '../screens/Collections';
import Forage from '../screens/Forage';
import Profile from '../screens/Profile';
import Signup from '../screens/Signup';

const Drawer = createDrawerNavigator();

export default function CustomDrawer(props){
	return(
		<NavigationContainer>
			{props.state.userToken == null ? (
				<Drawer.Navigator initialRouteName="Access">
						<Drawer.Screen name="Access" component={Access} options={{headerShown: false}}/>
						<Drawer.Screen name="Signup" component={Signup} />
				</Drawer.Navigator>
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

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
	    <DrawerItemList {...props} />
	      <DrawerItem label={"Logout"}
	        onPress={() => alert('Logged out')}
	      />
    </DrawerContentScrollView>
  );
}
