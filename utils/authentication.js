import { createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";

export const newUser = async (email, password) => {
	await createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed up
			const user = userCredential.user;
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.error(errorCode, errorMessage);
			// ..
		});
}

export const logIn = async (email, password) => {
	await signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
		});
}

export const logOut = async () => {
	await	signOut(auth).then(() => {
	  // Sign-out successful.
	}).catch((error) => {
	  // An error happened.
	}).finally(console.log(auth));
}
