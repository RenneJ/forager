const emailReg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&<>£¤€/{}()[\].,:;'¨^~+-_="åÅäÄöÖøØæÆ])[A-Za-z\d@$!#%*?&<>£¤€/{}()[\].,:;'¨^~+-_="åÅäÄöÖøØæÆ]{6,100}$/

export const isValidEmail = (email) => {
	return emailReg.test(email);
}

export const isValidPassword = (password) => {
	return passwordReg.test(password);
}
