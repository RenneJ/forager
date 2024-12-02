import { View, Text, Pressable} from "react-native";
import styles from "../styles";

export default function CollectionListItem(props){
	const showLocations = () => {
		let list = [];
		props.trip.basket.forEach(basketItem => list.push(basketItem));
		props.setBasket(list);
		props.setMapVisible(true);
	};

	return (
		<Pressable
			style={styles.pressableListItem}
			onPress={showLocations}
		>
			<Text style={styles.tripLabel}>
				{props.trip.time}: {props.trip.area}
			</Text>
			<View style={styles.tripBasketContent}>
				{ props.trip.basket.map(basketItem =>
					<Text
						key={ basketItem.id }
						style={styles.basketText}
					>
						{basketItem.name}
					</Text>
				)}
			</View>
		</Pressable>
	)
}
