import { Button, Text, TouchableOpacity, View } from 'react-native';
import {useState} from "react";
import {CameraView, useCameraPermissions, CameraPictureOptions, CameraCapturedPicture} from "expo-camera";

import CameraViewProps from "./props";
import { styles } from './styles';

export default function CamView ({type, onFlipCamera}:CameraViewProps) {
    
    const [permission, requestPermission] = useCameraPermissions();
    const [zoom, setZoom] = useState<0.0 | 0.5 | 0.7 | 1>(0.0);
    const [torch, setTorch] = useState(false);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
      }
    
      if (!permission?.granted) {
        // Camera permissions are not granted yet.
        return (
          <View style={styles.container}>
            <Text style={styles.message}>Nós precisamos da sua permissão para usar a camêra </Text>
            <Button onPress={requestPermission} title="Permitir" />
          </View>
        );
      }

      async function takePicture () {
        console.log("tirou foto");
      }


    return (
      <CameraView
        style={{flex: 1}} 
        facing={type} 
        ratio="4:3" 
        zoom={zoom}
        flash="auto"
        enableTorch={torch}
      >
        <View style={styles.mainView}>
          <TouchableOpacity 
            style={styles.flipArea} 
            onPress={() => {onFlipCamera(); setZoom(0)}}
            // onPress={onFlipCamera}
          >
            <Text style={styles.flipText}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomArea} onPress={() => setZoom(value => value == 0.0? 0.5 : value == 0.5? 0.7 : value == 0.7? 1 : 0.0)}>
            <Text style={styles.zoomText}>{ zoom == 0.0? "1x" : zoom == 0.5? "5x" : zoom == 0.7? "7x" : "10x"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.takePictureArea} onPress={takePicture}>
            <Text style={styles.takePictureText}>( TP )</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.torchArea} onPress={() => setTorch(value => !value)}>
            <Text style={styles.torchText}>T-{torch ? "on" : "off"}</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    )
}