import {useEffect, useState} from "react";
import { StyleSheet, View, Text, Button } from 'react-native';
import {Camera, CameraType} from "expo-camera";
import { StatusBar } from 'expo-status-bar';
import * as MediaLibrary from 'expo-media-library';
import CamView from "./src/components/CamView";

//passo 1 - importar
//passo 2 - configurar
//passo 3 - utilizar

export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
    const [hasCameraPermission, setHasCameraPerminssion] = useState<boolean>(false);
    const [hasMediaPermission, setHasMediaPermission] = useState<boolean>(false);

    useEffect(() => {
      (async () => {
        const {status} = await Camera.requestCameraPermissionsAsync();
        setHasCameraPerminssion(status == 'granted');
        console.log(status);
      })();

      (async () => {
        const {status} = await MediaLibrary.requestPermissionsAsync();
        setHasMediaPermission(status == 'granted');
        console.log(status);
      })();

    },[])

    const flipCamera = () => {
      setFacing((value) => value == "back" ? "front" : "back");
    };

    if(hasCameraPermission === false || null){
      return (
        <View style={{marginTop: 200, alignContent: "center", alignItems: "center"}}>
          <Text>Não tem permissão de usar a camêra</Text>
        </View>
      )
    }

    if(hasMediaPermission === false || null){
      return (
        <View style={{marginTop: 200, alignContent: "center", alignItems: "center"}}>
          <Text>Não tem permissão de mídia</Text>
        </View>
      )
    }

  return (
    <View style={styles.container}>
      <CamView type={facing} onFlipCamera={flipCamera} />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
