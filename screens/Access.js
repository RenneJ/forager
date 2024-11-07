import { View, Button, Image, Text } from "react-native";
import { auth } from "../firebaseconfig";
import Login from "./Login";
import Signup from "./Signup";
import styles from "./styles";

export default function Access({navigation}){
	return(
		<View style={styles.container}>
			<Text>{auth.currentUser ? auth.currentUser.email : "Null"}</Text>
			<Image
				source={require("../assets/logo.png")}
				style={styles.accessLogo}
			 />
			<Button
				title="Sign up"
				onPress={() => navigation.navigate("Signup")}
			/>
		</View>
	)
}
