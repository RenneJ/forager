import { View, Text, Button, FlatList, ListEmptyComponent } from "react-native";
import { useState, useEffect } from 'react';
import { getDatabase, push, ref, onValue, remove, set } from 'firebase/database';
import { auth, app } from "../firebaseconfig";
import styles from "../styles";
import EmptyCollection from "../components/EmptyCollection";
import CollectionListItem from "../components/CollectionListItem";

// THIS IS A MAP SCREEN SHOWING ALL SPOTS WHERE USER HAS FORAGED
export default function Spots(){
	return(
		<View>
			<Text>SPOTS</Text>
		</View>
	)
}