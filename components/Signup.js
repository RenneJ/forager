import { View, Text, TextInput, Button } from "react-native";
import { useState }  from "react";
import { newUser, auth } from "../utils/authentication";
import {isValidEmail, isValidPassword} from "../utils/validation";
import styles from "./styles";

export default function Signup(){
	const [email, setEmail] = useState({
		email: "",
		valid: false,
		alert: false
	});
	const [password, setPassword] = useState({
		password: "",
		valid: false,
		alert: false,
	});

	const handleSignUp = async (email, password) => {
		// Invalid creds are discarded silently
		//TODO: why not 1st click working??, indicate async operation is taking place
		isValidEmail(email.email) ? setEmail({ ...email, valid: true }) : setEmail({ ...email, alert: true });
		isValidPassword(password.password) ? setPassword({ ...password, valid: true }) : setPassword({ ...password, alert: true });
		if (email.valid && password.valid) {
			// Successful signing up also logs new user in
			await newUser(email.email, password.password)
				.then(console.log(auth.currentUser.email))
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					console.error(errorCode, errorMessage);
					// ..
				});
		}
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
		</View>
	)
}
