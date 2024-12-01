import { View, Text, TextInput, Button, Image } from "react-native";
import { useState, useContext, useEffect }  from "react";
import { auth, storage, secureStore } from "../firebaseconfig";
import { newUser, logOut, logIn } from "../utils/authentication";
import {isValidEmail, isValidPassword} from "../utils/validation";
import styles from "../styles";
import { AuthContext } from "../utils/context";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Signup(){
	const [loading, setLoading] = useState(true);
	const [email, setEmail] = useState({
		email: "",
		alert: false
	});
	const [password, setPassword] = useState({
		password: "",
		alert: false,
	});
	const { signUp, signIn } = useContext(AuthContext);

	onAuthStateChanged(auth, async (user) => {
    setLoading(false)
  });

	const handleSignUp = async (email, password) => {
		if (isValidEmail(email.email) && isValidPassword(password.password)) {
			// Successful sign up also logs new user in
			await signUp(email.email, password.password);
			if(auth.currentUser){
			}
		}
		if(!isValidEmail(email.email)) {
			setEmail({ ...email, alert: true });
		}
		if(!isValidPassword(password.password)){
			setPassword({ ...password, alert: true });
		}
	}

	const handleLogIn = async (email, password) => {
		try {
			await signIn(email.email, password.password)
		} catch(error){
			console.log("su48", error);
		}
	}

	return(
		<View style={styles.container}>
			{loading ?
				<Image
					source={require("../assets/logo.png")}
					style={styles.accessLogo}
				/>
				:
				<View>
					{}
					<Text></Text>
					<TextInput style={styles.credentialInput}
						placeholder={"Email"}
						keyboardType={"email-address"}
						autoCapitalize={"none"}
						value={email}
						onChangeText={text => setEmail({ ...email, email: text, alert: false })}
					/>
					{email.alert &&
						<View style={styles.warning}>
							<Text style={styles.warning}>"{email.email}" is not a valid email.</Text>
						</View>
					}
					<TextInput style={styles.credentialInput}
						secureTextEntry={true}
						placeholder={"Password"}
						value={password}
						onChangeText={text => setPassword({ ...password, password: text, alert: false })}
					/>
					{password.alert &&
						<View style={styles.warning}>
							<Text style={styles.warning}>Invalid password.</Text>
						</View>
					}
					<Button
						title={"Log in"}
						onPress={() => handleLogIn(email, password)}
					/>
					<Text>or</Text>
					<Button
						title={"Sign up"}
						onPress={() => handleSignUp(email, password)}
					/>
				</View>
			}
		</View>
	)
}
