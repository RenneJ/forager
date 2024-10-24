import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from "firebase/auth";

export const auth = getAuth();

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

export const login = async (email, password) => {
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
