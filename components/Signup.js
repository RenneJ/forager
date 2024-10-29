import { View, Text, TextInput, Button } from "react-native";
import { useState }  from "react";
import { auth } from "../firebaseconfig";
import { newUser, logOut } from "../utils/authentication";
import {isValidEmail, isValidPassword} from "../utils/validation";
import styles from "./styles";

export default function Signup(){
	const [email, setEmail] = useState({
		email: "",
		alert: false
	});
	const [password, setPassword] = useState({
		password: "",
		alert: false,
	});

	const handleSignUp = async (email, password) => {
		//TODO: why not 1st click working??, indicate async operation is taking place
		//validateCreds();
		if (isValidEmail(email.email) && isValidPassword(password.password)) {
			// Successful sign up also logs new user in
				await newUser(email.email, password.password)
					.catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;
						console.error(errorCode, errorMessage);
						// ..
					})
					.finally(console.log("31", auth.currentUser))
		}
		if(!isValidEmail(email.email)) {
			setEmail({ ...email, alert: true });
		}
		if(!isValidPassword(password.password)){
			setPassword({ ...password, alert: true });
		}
	}
	const handleLogOut = async () => {
		console.log("40", auth.currentUser);
		await logOut();
	}
	return(
		<View style={styles.container}>
			<View>
				<Text>At least: 1 lowercase character</Text>
				<Text>At least: 1 uppercase character</Text>
				<Text>At least: 1 number</Text>
				<Text>At least: 1 special character</Text>
				<Text>At least: 6 charcter long</Text>
			</View>
			<TextInput style={ styles.credentialInput}
				placeholder={"Email"}
				keyboardType={"email-address"}
				autoCapitalize={"none"}
				value={email}
				onChangeText={text => setEmail({...email, email: text, alert: false})}
			/>
			{email.alert &&
				<View style={styles.warning}>
					<Text style={styles.warning}>"{ email.email }" is not a valid email.</Text>
				</View>
			}
			<TextInput style={ styles.credentialInput}
				secureTextEntry={ true }
				placeholder={"Password"}
				value={password}
				onChangeText={text => setPassword({...password, password: text, alert: false})}
			/>
			{password.alert &&
				<View style={styles.warning}>
					<Text style={styles.warning}>Invalid password.</Text>
				</View>
			}
			<Button
				title={"Sign up"}
				onPress={() => handleSignUp(email, password)}
			/>
			<Button
				title={"Log out"}
				onPress={() => handleLogOut()}
			/>
		</View>
	)
}
