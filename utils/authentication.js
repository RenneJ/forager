import { createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut } from "firebase/auth";
import { removeItems } from "./localstorage";
import { auth } from "../firebaseconfig";

export const newUser = async (email, password) => {
	await createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed up
			const user = userCredential.user;
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.error(errorCode, errorMessage);
			// ..
		});
}

export const logIn = async (email, password) => {
	await signInWithEmailAndPassword(auth, email, password);
}

export const logOut = async () => {
	try{
		await signOut(auth);
		removeItems(["area", "basket", "time"]);
	} catch(error){
		console.log(error)
	}
}
