import { View, Text, TextInput, Button, Image } from "react-native";
import { useState }  from "react";
import { auth } from "../firebaseconfig";
import newUser from "../utils/authentication";
import {isValidEmail, isValidPassword} from "../utils/validation";
import styles from "../styles";

export default function Login(){
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

	const createNewUser = (email, password) => {
		// Invalid creds are discarded silently
		//TODO: check if email alrdy in db
		isValidEmail(email.email) ? setEmail({ ...email, valid: true }) : setEmail({ ...email, alert: true });
		isValidPassword(password.password) ? setPassword({ ...password, valid: true }) : setPassword({ ...password, alert: true });
		if (email.valid && password.valid) {
			newUser(email.email, password.password);
		}
	}
	return(
		<View style={styles.container}>
			<Text>{auth.currentUser ? auth.currentUser.email : "Null"}</Text>
			<Image
				source={require("../assets/logo.png")}
				style={styles.accessLogo}
			 />
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
				onPress={() => createNewUser(email, password)}
			/>
		</View>
	)
}
