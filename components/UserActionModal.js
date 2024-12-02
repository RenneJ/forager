import { useEffect } from 'react';
import {Modal, Text, View} from 'react-native';
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
    <Modal
      animationType="none"
      transparent={true}
      visible={ props.actionModalVisible }
      onRequestClose={() => {
        props.setActionModalVisible(!props.actionModalVisible);
      }}
    >
        <View style={ [styles.modalView, modalStyle ] }>
					<Text>{ props.modalMessage }</Text>
        </View>
    </Modal>
  );
};
