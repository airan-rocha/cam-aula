import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
      },
      message: {
        textAlign: 'center',
        paddingBottom: 10,
      },
    mainView: {
      flex: 1,
      backgroundColor: "transparent",
      flexDirection: "row",
    },
    flipArea: {
      position: "absolute",
      bottom: 20,
      left: 20,
    },
    flipText: {
      fontSize: 20,
      marginBottom: 15,
      color: "#fff",
    },
    zoomArea: {
      position: "absolute",
      bottom: 20,
      left: 170,
    },
    zoomText: {
      fontSize: 20,
      marginBottom: 15,
      color: "#fff",
    },
    takePictureArea: {
      position: "absolute",
      bottom: 20,
      right: 110,
    },
    takePictureText: {
      fontSize: 20,
      marginBottom: 15,
      color: "#fff",
    },
    torchArea: {
      position: "absolute",
      bottom: 20,
      right: 20,
    },
    torchText: {
      fontSize: 20,
      marginBottom: 15,
      color: "#fff",
    },
});