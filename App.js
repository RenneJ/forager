// app needs to be imported first or at least before auth fro ./utils/authentication
import { app } from "./firebaseconfig";
import { useReducer, useMemo, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from "./utils/context";
import { newUser, logOut, saveToken } from "./utils/authentication";
import CustomDrawer from "./components/CustomDrawer";
import { getAuth, onAuthStateChanged } from "firebase/auth";


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
			const auth = getAuth();
			let idToken;
			onAuthStateChanged(auth, async (user) => {
	      if (user) {
	        // User is signed in, see docs for a list of available properties
	        // https://firebase.google.com/docs/reference/js/auth.user
	        const uid = user.uid;
	        idToken = await user.getIdToken();
					dispatch({ type: 'RESTORE_TOKEN', token: idToken });
	      } else {
	      	idToken = null;
	      }
    	});
			dispatch({ type: 'RESTORE_TOKEN', token: idToken });
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
		signOut: () => {
			//await secureStore.deleteItemAsync("refreshToken");
			try {
				logOut();
			} catch(error){
				console.log("app77", error)
			}
			dispatch({ type: 'SIGN_OUT' });
		},
		signUp: async (email, password) => {
			// In a production app, we need to send user data to server and get a token
			// We will also need to handle errors if sign up failed
			// After getting token, we need to persist the token using `SecureStore`
			// In the example, we'll use a dummy token
			let idToken;
			const auth = getAuth();
			await newUser(email, password)
				//.then(console.log("signup 24", auth.currentUser))
				.then(async () => {
					idToken = await auth.currentUser.getIdToken();
					//await secureStore.setItemAsync("refreshToken", refreshToken);
					console.log("App 100", idToken)
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					console.error(errorCode, errorMessage);
					// ..
				});
			//let testToken = await secureStore.getItemAsync("refreshToken");
			//if (testToken) { console.log("110", testToken) };
      dispatch({ type: 'SIGN_IN', token: idToken });
    },
  }), []);

	return (
		<AuthContext.Provider value={authContext}>
			<CustomDrawer state={state} />
			<StatusBar style="auto" />
		</AuthContext.Provider>
  );
}
