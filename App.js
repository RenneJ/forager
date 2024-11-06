// app needs to be imported first or at least before auth fro ./utils/authentication
import { auth, storage, secureStore } from "./firebaseconfig";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useReducer, useMemo, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import Access from "./components/Access";
import Collections from './components/Collections';
import Forage from './components/Forage';
import Profile from './components/Profile';
import Signup from './components/Signup';
import { AuthContext } from "./utils/context";
import { newUser, logOut } from "./utils/authentication";

const Drawer = createDrawerNavigator();
const AccessStack = createNativeStackNavigator();
const localStorage = storage;
//const db = getFirestore(app);
export default function App() {
	// TODO:
	// get accesstoken from firestore
	const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

	useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let refreshToken;

      try {
        refreshToken = await SecureStorage.getItemAsync('refreshToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: refreshToken });
    };
    bootstrapAsync();
  }, []);

	const authContext = useMemo(() => ({
    signIn: async (data) => {
      // In a production app, we need to send some data (usually username, password) to server and get a token
      // We will also need to handle errors if sign in failed
      // After getting token, we need to persist the token using `SecureStore`
      // In the example, we'll use a dummy token

      // token: accessToken
      // refreshToken to get new accessToken
      dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    },
    signOut: () => dispatch({ type: 'SIGN_OUT' }),
		signUp: async (email, password) => {
			// In a production app, we need to send user data to server and get a token
			// We will also need to handle errors if sign up failed
			// After getting token, we need to persist the token using `SecureStore`
			// In the example, we'll use a dummy token
			let refreshToken;
			await newUser(email, password)
				//.then(console.log("signup 24", auth.currentUser))
				.then(() => {
					refreshToken = auth.currentUser.refreshToken;
					secureStore.setItemAsync("refreshToken", refreshToken);
					console.log("App 95", refreshToken)
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					console.error(errorCode, errorMessage);
					// ..
				});
      dispatch({ type: 'SIGN_IN', token: refreshToken });
    },
  }), []);

	return (
		<AuthContext.Provider value={authContext}>
			< NavigationContainer >

			{state.userToken == null ? (
				<Drawer.Navigator initialRouteName="Access">

						<Drawer.Screen name="Access" component={Access} options={{headerShown: false}}/>
						<Drawer.Screen name="Signup" component={Signup} />

				</Drawer.Navigator>
			) : (
				<Drawer.Navigator initialRouteName="Forage">
					<Drawer.Screen name="Forage" component={Forage} />
					<Drawer.Screen name="Collections" component={Collections} />
					<Drawer.Screen name="Profile" component={Profile} />
				</Drawer.Navigator>
			)
			}
				<StatusBar style="auto" />
			</NavigationContainer >
		</AuthContext.Provider>
  );
}
