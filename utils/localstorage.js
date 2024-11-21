import { auth, app, storage } from "../firebaseconfig";


//key = "basket", value = {name, lat, lon}
export const storeBasket = async (key, value) => {
	if (value.name == "") {
		console.log("forage started");
	} else {
		var objectList = [];

		// Null when trying to add first item
		const object = await parseStoredValue(key);

		if(object){
			// Items 2nd and ->
			objectList = [...object, value];
		} else {
		// First item added to basket
			objectList = [value];
		}

		await storage.setItem(key, JSON.stringify(objectList))
			.catch((error) => {
				console.log(error);
			})

		console.log("20", await storage.multiGet([key, "area"])
			.catch((error) => {
				console.log(error);
			}))
	}
}

export const storeArea = async (key, value) => {
	try {
		await storage.setItem(key, value);
	} catch(error) {
		console.log(error)
	}
}

export const isStarted = async(key) => {
	if (await storage.getItem(key)) {
		console.log(await storage.getItem(key))
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

export const clear = async (key) => {
	try {
		await storage.removeItem(key)
	} catch(error) {
			console.log(error)
	}

}
