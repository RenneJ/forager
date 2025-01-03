import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: '#8ed4a5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawer: {
		backgroundColor: "#8ed4a5",

  },
  drawerItem: {
	  drawerActiveBackgroundColor: "#dfebdf",
	  drawerActiveTintColor: "#1f471f",
		drawerLabelStyle: {
      color: "#1f471f",
      fontSize: 20,
    },
  },
  warning: {
  	color: "red",
  },
  logo: {
  	position: "absolute",
 		height: 150,
  	width: 150,
  	top: 120,
  },
  loadingLogo: {
  	height: 150,
   	width: 150,
  },
  drawerLogout: {
		color: "#d10f0f",
		fontSize: 16,
		margin: "auto"
  },
  areaControls:{
  	flex: 1,
   	justifyContent: "center",
    gap: 20
  },
  forageContainer:{
 		flex: 1,
    alignItems: "center",
    justifyContent:"center",
    gap: 20,
    paddingBottom:20,
  },
  forageControls:{
		alignItems: "center",
		gap: 20
  },
  mapContainer:{
  	flex:1,
   	justifyContent: "flex-end",
  },
  map: {
  	width: Dimensions.get('window').width * 1,
   	//height: Dimensions.get('window').height * 0.5,
    height: "100%",
  //width: 200
  },
  biggerMap: {
 		width: Dimensions.get('window').width * 1,
  	height: Dimensions.get('window').height * 0.8,
  },
  fullMap: {
		width: Dimensions.get('window').width * 1,
	 	height: Dimensions.get('window').height * 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
  	position: "absolute",
   	alignSelf:"center",
    top: 300,
    backgroundColor: "#dfebdf",
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 10,
  },
  modalWarning: {
  	backgroundColor: "#eb9360",
  },
  modalError: {
  	backgroundColor: "#eb9360",
  },
  modalSuccess: {
  	backgroundColor: "#dfebdf",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    color: "#1f471f",
		minWidth: "95%"
  },
  buttonClose: {
    backgroundColor: "#1f471f",
  },
  buttonCancel:{
  	marginTop: 10,
  	backgroundColor: "#73706e",
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  credentialsContainer: {
   	flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    //width: Dimensions.get('window').width *0.95,
  },
	inputField: {
		fontSize: 14,
		paddingHorizontal: 15,
		//alignSelf:"flex-start",
		height: 40,
		borderRadius: 10,
		borderColor: "#dfebdf",
		backgroundColor: "#dfebdf",
		borderWidth: 2,
		width: Dimensions.get('window').width * 0.95,
		//marginTop: 30,
	},
	helperText:{
		marginBottom: 20,
	},
  inputFields: {
  	flex: 4,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 30,
    gap: 20
  },
  buttonsContainer: {
	  flex: 1,
	  justifyContent: "center",
		width: Dimensions.get('window').width * 0.95,
		gap: 30,
  },
  topView: {
 	position: "absolute",
  },
  pressableListItem: {
  	backgroundColor: "#dfebdf",
  	width: Dimensions.get('window').width * 0.95,
   	padding: 10,
  	borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#215231",
		borderRadius: 10,
		elevation: 10,	/* Android only */
  },
  tripLabel: {
		fontSize: 18,
		color: "#1f471f",
  },
  tripBasketContent: {
  	flex: 1,
   	flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
})

export default styles;
