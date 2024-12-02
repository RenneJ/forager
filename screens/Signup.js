import { View, Text, TextInput, Pressable, Image, KeyboardAvoidingView } from "react-native";
import { useState, useContext, useEffect }  from "react";
import { auth, storage, secureStore } from "../firebaseconfig";
import { newUser, logOut, logIn } from "../utils/authentication";
import {isValidEmail, isValidPassword} from "../utils/validation";
import styles from "../styles";
import { AuthContext } from "../utils/context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import UserActionModal from "../components/UserActionModal";

export default function Signup(){
	const [loading, setLoading] = useState(true);
	const [actionModalVisible, setActionModalVisible] = useState(false);
	const [modalMessage, setModalMessage] = useState("");
	const [modalStyle, setModalStyle] = useState("");
	/*const [email, setEmail] = useState({
		email: "",
		alert: false
		});*/
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { signUp, signIn } = useContext(AuthContext);

	onAuthStateChanged(auth, async (user) => {
    setLoading(false)
  });

	const handleSignUp = async (email, password) => {
		if (isValidEmail(email) && isValidPassword(password)) {
			// Successful sign up also logs new user in
			console.log(email, password)
			await signUp(email, password);
			if(auth.currentUser){
			}
		}
		else if(!isValidEmail(email) || !isValidPassword(password)) {
			console.log(email, password)
			setModalMessage("Invalid email or password.");
			setModalStyle("warning");
			setActionModalVisible(true);
		}
	}

	const handleLogIn = async (email, password) => {
		try {
			await signIn(email, password)
		} catch(error){
			if(error.code === "auth/invalid-email"){
				setModalMessage("Wrong email or password.");
				setModalStyle("error");
				setActionModalVisible(true);
			}
		}
	}

	return(
		<KeyboardAvoidingView
			behavior={ 'padding' }
			style={styles.container}
		>
			{loading ?
				<Image
					source={require("../assets/logo.png")}
					style={styles.loadingLogo}
				/>
			:
				<View style={styles.container}>
					<Image
						source={require("../assets/logo.png")}
						style={styles.logo}
					/>
				{actionModalVisible &&
					<UserActionModal
						actionModalVisible={actionModalVisible}
						setActionModalVisible={setActionModalVisible}
						modalStyle={modalStyle}
						setModalStyle={setModalStyle}
						modalMessage={modalMessage}
						setModalMessage={setModalMessage}
					/>}
				<View style={ styles.credentialsContainer }>
					<View style={styles.inputFields}>
					<TextInput style={styles.inputField}
						placeholder={"Email"}
						keyboardType={"email-address"}
						autoCapitalize={"none"}
						value={email}
						onChangeText={text => setEmail(text)}
					/>
					<TextInput style={styles.inputField}
						secureTextEntry={true}
						placeholder={"Password"}
						value={password}
						onChangeText={text => setPassword(text)}
					/>
					<Text style={styles.helperText}>Use numbers, special characters, lower and upper case.</Text>
					</View>
					<View style={styles.buttonsContainer}>
						<Pressable
			       style={[styles.button, styles.buttonClose]}
			       onPress={() => handleLogIn(email, password)}
						>
			       <Text style={styles.textStyle}>Log In</Text>
			     	</Pressable>
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={() => handleSignUp(email, password)}
						>
							<Text style={styles.textStyle}>Sign Up</Text>
						</Pressable>
					</View>
					</View>
				</View>
			}
		</KeyboardAvoidingView>

	)
}
