// app needs to be imported first or at least before auth fro ./utils/authentication
import { auth, secureStore, refreshSessionUrl } from "./firebaseconfig";
import { useReducer, useMemo, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from "./utils/context";
import { newUser, logOut, saveToken } from "./utils/authentication";
import CustomDrawer from "./components/CustomDrawer";

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
			let refreshToken = await secureStore.getItemAsync("refreshToken");
			console.log("app 46", refreshToken);
			if(refreshToken){
      	try {
					await fetch(refreshSessionUrl, {
						method: "POST",
						body: JSON.stringify({
							grant_type: "refresh_token",
							refresh_token: refreshToken,
						}),
						headers: { "Content-Type": "application/json" },
					})
          .then(response => response.json())
          .then(data => secureStore.setItemAsync("refreshToken", data.refresh_token))
	      } catch (e) {
	        console.log("App 63", e)
	      }
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
		signOut: async () => {
			await secureStore.deleteItemAsync("refreshToken");
			logOut();
			dispatch({ type: 'SIGN_OUT' });
		},
		signUp: async (email, password) => {
			// In a production app, we need to send user data to server and get a token
			// We will also need to handle errors if sign up failed
			// After getting token, we need to persist the token using `SecureStore`
			// In the example, we'll use a dummy token
			let refreshToken;
			await newUser(email, password)
				//.then(console.log("signup 24", auth.currentUser))
				.then(async () => {
					refreshToken = auth.currentUser.refreshToken;
					await secureStore.setItemAsync("refreshToken", refreshToken);
					console.log("App 100", refreshToken)
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					console.error(errorCode, errorMessage);
					// ..
				});
			//let testToken = await secureStore.getItemAsync("refreshToken");
			//if (testToken) { console.log("110", testToken) };
      dispatch({ type: 'SIGN_IN', token: refreshToken });
    },
  }), []);

	return (
		<AuthContext.Provider value={authContext}>
			<CustomDrawer state={state} />
			<StatusBar style="auto" />
		</AuthContext.Provider>
  );
}
