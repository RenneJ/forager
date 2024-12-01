import React, {useState, useEffect} from 'react';
import {Alert, Modal, Image, Text, Pressable, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { storeInCloud } from '../utils/cloudstorage';
import styles from "../styles";

// Generic message for user showing confirmation of action, a warning or an error.
export default function UserActionModal(props){
	let modalStyle;
	if(props.modalStyle === "success"){
		modalStyle = styles.modalSuccess;
	} else if (props.modalStyle === "warning"){
		modalStyle = styles.modalWarning;
	} else if (props.modalStyle === "error"){
		modalStyle = styles.modalError;
	}

	useEffect(() => {
    setTimeout(() => {
    	props.setActionModalVisible(false);
			props.setModalStyle("");
			props.setModalMessage("");
  }, 2000);
}, [props.actionModalVisible]);

  return (
   /*  <SafeAreaProvider>
      <SafeAreaView style={ styles.centeredView }>*/
        <Modal
          animationType="none"
          transparent={true}
          visible={ props.actionModalVisible }
          onRequestClose={() => {
            props.setActionModalVisible(!props.actionModalVisible);
          }}>

            <View style={ [styles.modalView, modalStyle ] }>
							<Text>{ props.modalMessage }</Text>
            </View>

        </Modal>
    /*   </SafeAreaView>
    </SafeAreaProvider>*/
  );
};
