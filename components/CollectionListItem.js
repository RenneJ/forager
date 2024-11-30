import { View, Text, Pressable, FlatList, ListEmptyComponent } from "react-native";
import { useState, useEffect } from 'react';
import { getDatabase, push, ref, onValue, remove, set } from 'firebase/database';
import { auth, app } from "../firebaseconfig";
import styles from "../styles";

export default function CollectionListItem(props){
	const showLocations = () => {
		console.log("cli", 100101)
	};
	console.log(props.trip)

	return (
				<Pressable
					style={styles.pressableListItem}
					onPress={showLocations}
				>
					<Text style={styles.tripLabel}>{props.trip.time}: {props.trip.area}</Text>
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
