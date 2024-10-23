import { View, Text, TextInput, Button } from "react-native";
import { useState }  from "react";
import newUser from "../utils/authentication";
import styles from "./styles";

export default function Login(){
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const createNewUser = (email, password) => {
		console.log(email, password);
		// Invalid creds are discarded silently
		//TODO: email and password verification.
		newUser(email, password);
	}
	return(
		<View style={styles.container}>
			<TextInput style={ styles.credentialInput}
				placeholder={"Email"}
				keyboardType={"email-address"}
				autoCapitalize={"none"}
				value={email}
				onChangeText={email => setEmail(email)}
			/>
			<TextInput style={ styles.credentialInput}
				secureTextEntry={ true }
				placeholder={"Password"}
				value={password}
				onChangeText={password => setPassword(password)}
			/>
			<Button
				title={"Sign up"}
				onPress={() => createNewUser(email, password)}
			/>
		</View>
	)
}
