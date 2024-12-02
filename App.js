import { useReducer, useMemo, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from "./utils/context";
import { newUser, logOut, logIn } from "./utils/authentication";
import CustomDrawer from "./components/CustomDrawer";
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default function App() {
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
      isLoading: false,
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
    signIn: async (email, password) => {
    const auth = getAuth();
    	let idToken;
			await logIn(email, password);
			idToken = await auth.currentUser.getIdToken();
      dispatch({ type: 'SIGN_IN', token: idToken });
    },
		signOut: () => {
			try {
				logOut();
			} catch(error){
				console.log(error)
			}
			dispatch({ type: 'SIGN_OUT' });
		},
		signUp: async (email, password) => {
			const auth = getAuth();
			await newUser(email, password)
				.then(async () => {
					idToken = await auth.currentUser.getIdToken();
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					console.error(errorCode, errorMessage);
					// ..
				});
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
