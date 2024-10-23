import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
const newUser = (email, password) => {
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed up
			const user = userCredential.user;
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ..
		});
}

export default newUser;