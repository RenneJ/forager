import { removeItems, parseStoredValue, fetchItem} from "../utils/localstorage";
import { getDatabase, push, ref } from 'firebase/database';
import { auth, app } from "../firebaseconfig";

const database = getDatabase(app);
const now = new Date(Date.now());
const nowFormat = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`

export const storeInCloud = async () => {
		const area = await fetchItem("area");
		// string to JSON
		const basket = await parseStoredValue("basket");
		if (basket && area) {
			push(ref(database, "collection/" + auth.currentUser.uid), {
				time: nowFormat,
				area: area,
				basket: basket
			});
			removeItems(["area", "basket"]);
		} else {
			// Handle error in component
			throw new Error("Cannot save empty basket.")
		}
}
// wanted to implement fetch function but couldn't figure out
// how to return value to component...
