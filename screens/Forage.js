import { View, Text } from "react-native";
import { auth } from "../firebaseconfig";
import styles from "../styles";


// TODO: inputs
function Forage({navigation}){
	return(
		<View style={styles.container}>
			<Text>FORAGE PAGE</Text>
			<Text>Current user: { auth.currentUser?.email }</Text>
		</View>
	)
}

export default Forage;
