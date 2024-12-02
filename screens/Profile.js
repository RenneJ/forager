import { View, Text } from "react-native";
import { auth } from "../firebaseconfig";
import styles from "../styles";

function Profile(){
	return(
		<View style={styles.container}>
			<Text>Email: { auth.currentUser.email }</Text>
		</View>
	)
}

export default Profile;
