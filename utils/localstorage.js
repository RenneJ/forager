import { storage } from "../firebaseconfig";

// gets list(object), stores string
export const storeBasket = async (key, value) => {
	// assign id for collection listing
	value.forEach(item => !item.id && (item.id = value.length));
		await storage.setItem(key, JSON.stringify(value))
			.catch((error) => {
				console.log(error);
			})
}

// pointless wrapper
// i just didn't want to import any AsyncStorage methods to components
export const setItem = async (key, value) => {
	try {
		await storage.setItem(key, value);
	} catch(error) {
		console.log(error)
	}
}

// pointless wrapper
// i just didn't want to import any AsyncStorage methods to components
export const fetchItem = async (key) => {
	try {
		let value = await storage.getItem(key);
		// parse value?
		return value;
	} catch(error){
		console.log(error)
	}
}

export const isStarted = async(key) => {
	if (await storage.getItem(key)) {
		return true;
	}
	return false;
}

export const parseStoredValue = async (key) => {
	let storedValue;
	try {
		storedValue = await storage.getItem(key);
	} catch(error){
		console.log(error);
	}
	const object = JSON.parse(storedValue);
	return object;
}

export const removeItems = (keys) => {
	try {
		keys.forEach(async (key) => await storage.removeItem(key))
	} catch(error) {
			console.log(error)
	}
}
