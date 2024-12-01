import React, {useState, useEffect} from 'react';
import {Alert, Modal, Image, Text, Pressable, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { storeInCloud } from '../utils/cloudstorage';
import UserActionModal from './UserActionModal';
import styles from "../styles";

// Pop-up for trip end controls, mainly to diminish occurrence of accidental presses.
export default function EndTripModal(props){
	const [uploading, setUploading] = useState(false);

	const handleCloudSave = async () => {
		try {
			await storeInCloud();
			setUploading(true);
		} catch(error){
			props.setModalStyle("error");
			props.setModalMessage(error.message)
			props.setActionModalVisible(true);
		}
	}

	useEffect(() => {
	  if (uploading) {
	    setTimeout(() => {
	    	setUploading(false);
				props.navigation.navigate("Collections");
				props.setEndModalVisible(false);
				props.reset();
	  }, 1500);
	  }
	}, [uploading]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="none"
          transparent={true}
          visible={props.endModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            props.setEndModalVisible(!props.endModalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
          	{uploading ?
	         		<Image
								source={require("../assets/logo.png")}
								style={styles.accessLogo}
							 />
						:
							<View>
									<Text style={styles.modalText}>End current trip: { props.area }</Text>
              { props.isConnected ?
	              <Pressable
	                style={[styles.button, styles.buttonClose]}
	                onPress={handleCloudSave}
								>
	                <Text style={styles.textStyle}>Save</Text>
	              </Pressable>
							:
	              <Pressable
	                style={[styles.button, styles.buttonClose]}
	                onPress={() => props.setEndModalVisible(!props.endModalVisible)}>
	                 <Text style={styles.textStyle}>NO conn</Text>
	              </Pressable>
              }
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => props.setEndModalVisible(!props.endModalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
							</View>
           }
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
