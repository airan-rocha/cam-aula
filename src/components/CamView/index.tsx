import {useState, useRef} from "react";
import {Text, TouchableOpacity, View, Modal, Image } from 'react-native';

import {CameraView, ImageType, CameraRatio, FlashMode} from "expo-camera";
import * as MediaLibrary from 'expo-media-library';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { styles } from './styles';
import CameraViewProps from "./props";

export default function CamView ({type, onFlipCamera}:CameraViewProps) {
    const cameRef = useRef(null);
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const [ratio, setRatio] = useState<CameraRatio>('4:3');
    const [zoom, setZoom] = useState<0.0 | 0.5 | 0.7 | 1>(0.0);
    const [flashStatus, setFlashStatus] = useState<FlashMode>('off');

    const imageType : ImageType = 'png';

    const options = {quality: 1, imageType: imageType }

      async function takePicture () {
        if(cameRef && cameRef.current){
          const data  = await cameRef.current.takePictureAsync(options);
          setCapturedPhoto(data.uri);
          setModalIsOpen(true);
          console.log(data);
        }
      }

      async function savePicture () {
        if (capturedPhoto != null){

          // await saveToAlbum(capturedPhoto, "cam-aula");

          MediaLibrary.saveToLibraryAsync(capturedPhoto).then(() => {
            setCapturedPhoto(null);
          });
        }
      }

      async function saveToAlbum(uri:string, album:string){
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync(album, asset, false).then(() => {
          setCapturedPhoto(null);
        });
        // console.log(asset);
      }


    return (
      <CameraView
        style={{flex:1}} 
        facing={type} 
        ratio={ratio} 
        zoom={zoom}
        flash={flashStatus}
        enableTorch={false}
        autofocus='on'
        ref={cameRef}
      >
        <View style={styles.mainView}>
          <TouchableOpacity 
            style={styles.flipArea} 
            onPress={() => {onFlipCamera(); setZoom(0); setFlashStatus("off"); setRatio('4:3')}}
          >
            <MaterialIcons name="cameraswitch" size={25} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.takePictureArea} onPress={takePicture}>
            <MaterialIcons name="photo-camera" size={40} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomArea} onPress={() => setZoom(value => value == 0.0? 0.5 : value == 0.5? 0.7 : value == 0.7? 1 : 0.0)}>
            <Text style={styles.zoomText}><MaterialIcons name="zoom-in" size={15} color="#ffffff" />{ zoom == 0.0? "1x" : zoom == 0.5? "5x" : zoom == 0.7? "7x" : "10x"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flashArea} onPress={() => setFlashStatus(value => value == 'auto'? 'off' : value == 'off'? 'on' : 'auto')}>
            <MaterialIcons name={`flash-${flashStatus}`} size={20} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.ratioArea} onPress={() => setRatio(value => ratio == '4:3'? '16:9' : '4:3')}>
            <Text style={styles.ratioText}>{ratio}</Text>
          </TouchableOpacity>
        </View>

        //condicional (tipo if) para renderizar o modal se o capturedPhoto não for nulo
        {capturedPhoto && (
          <Modal
          animationType='slide'
          transparent={false}
          visible={modalIsOpen}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 20,
            }}
          >
            <Image
              style={{
                width: "100%",
                height: 450,
                borderRadius: 20,
              }} 
              source={{uri: capturedPhoto}}
            />
            <View style={{ flexDirection: 'row'}}>
              <TouchableOpacity
                style={{margin: 10}}
                onPress={() => setModalIsOpen(false)}
              >
                <Text><MaterialIcons name="close" size={34} color="black" /></Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{margin: 10}}
                onPress={savePicture}
              >
                <Text><MaterialIcons name="save-alt" size={34} color="black" /></Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        )}
      </CameraView>
    )
}