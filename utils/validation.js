const emailReg = /^[a-zA-Z0-9_.+\-\u00c4-\u00f6]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const passwordReg = /^(?=.*[a-z\u00c4-\u00f6])(?=.*[A-Z\u00c4-\u00f6])(?=.*\d)(?=.*[@$!#%*?&<>£¤€/{}()[\].,:;'¨^~+-_="\u00c4-\u00f6])[A-Za-z\d@$!#%*?&<>£¤€/{}()[\].,:;'¨^~+-_="\u00c4-\u00f6]{6,100}$/

export const isValidEmail = (email) => {
	return emailReg.test(email);
}

export const isValidPassword = (password) => {
	return passwordReg.test(password);
}
