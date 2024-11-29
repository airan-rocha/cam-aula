import {useState, useRef, useEffect} from "react";
import {Text, TouchableOpacity, View, Modal, Image } from 'react-native';

import {CameraView, ImageType, CameraRatio, FlashMode, CameraMode} from "expo-camera";
import * as MediaLibrary from 'expo-media-library';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Sharing from 'expo-sharing';

import { styles } from './styles';
import CameraViewProps from "./props";
import VideoPreview from "../VideoPreview";
import { setFlashCam, setRateCam, setZoomCam } from "./actions";

export default function CamView ({type, onFlipCamera}:CameraViewProps) {
    const cameRef = useRef(null);
    const [camMode, setCamMode] = useState<CameraMode>('picture');
    const [capturedMedia, setCapturedMedia] = useState<string | null>();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [ratio, setRatio] = useState<CameraRatio>('4:3');
    const [zoom, setZoom] = useState<0.0 | 0.5 | 0.7 | 1>(0.0);
    const [flashStatus, setFlashStatus] = useState<FlashMode>('off');
    const [recordOn, setRecordOn] = useState<boolean>(false);
    const [takeIcon, setTakeIcon] = useState<'photo-camera' | 'circle'>('photo-camera');
    const [torchOn, setTorchOn] = useState(false);

    const imageType : ImageType = 'png';

    const options = {quality: 1, imageType: imageType };

    useEffect(() => {
      if(camMode == 'video'){
        setTakeIcon('circle');
      }else if(camMode == 'picture'){
        setTakeIcon('photo-camera');
      }

    }, [camMode])

      async function takePicture () {
        if(cameRef && cameRef.current){
          const data  = await cameRef.current.takePictureAsync(options);
          setCapturedMedia(data.uri);
          setModalIsOpen(true);
          console.log(data);
        }
      };

      async function savePicture () {
        if (capturedMedia != null){

          // await saveToAlbum(capturedPhoto, "cam-aula");

          MediaLibrary.saveToLibraryAsync(capturedMedia).then(() => {
            setCapturedMedia(null);
          });
        }
      };

      async function saveToAlbum(uri:string, album:string){
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync(album, asset, false).then(() => {
          setCapturedMedia(null);
        });
        // console.log(asset);
      }

      async function sharePicture() {
        if(capturedMedia != null){
          await Sharing.shareAsync(capturedMedia);
        }
      }

      async function takeVideo() {
        console.log('captura de video');
        try {
          if(cameRef && cameRef.current){
            setRecordOn(true);
            const video = await cameRef.current.recordAsync();
            setCapturedMedia(video.uri);
            console.log('video uri:', video)
          }
        }catch (e){
          console.log(e);
        }
      }

      async function stopRecord() {
        if(cameRef && cameRef.current){
          await cameRef.current.stopRecording();
          setModalIsOpen(true);
          setRecordOn(false);
          console.log('stop recording: ', capturedMedia);
        }
      }

      function takeMedia () {

        if(camMode == 'picture'){
          return takePicture();
        }else {
          return takeVideo();
        }
      }

      function TakeMediaButton () {
        if(recordOn){
          return (
            <TouchableOpacity style={styles.takeMediaArea} onPress={stopRecord}>
              <MaterialIcons name="square" size={42} color="#ff0000" />
            </TouchableOpacity>
          )
        }else {
          return (
            <TouchableOpacity style={styles.takeMediaArea} onPress={takeMedia}>
              <MaterialIcons name={takeIcon} size={40} color={camMode == 'picture' ? '#fff' : '#ff0000'} />
            </TouchableOpacity>
          )
        }
      }

      function FlashOrTorchButton(){
        if(camMode == 'picture'){
          return(
            <TouchableOpacity style={styles.flashArea} onPress={() => setFlashCam(setFlashStatus)}>
              <MaterialIcons name={`flash-${flashStatus}`} size={20} color="#ffffff" />
            </TouchableOpacity>
          )
        }else{
          return (
            <TouchableOpacity style={styles.flashArea} onPress={() => setTorchOn(value => !value)}>
              <MaterialIcons name={`flashlight-${torchOn ? 'on' : 'off'}`} size={20} color="#ffffff" />
            </TouchableOpacity>
          )
        }
      }


    return (
      <CameraView
        style={{flex:1}}
        mode={camMode} 
        facing={type} 
        ratio={ratio} 
        zoom={zoom}
        flash={flashStatus}
        enableTorch={torchOn}
        autofocus='on'
        ref={cameRef}
      >
        <View style={styles.mainView}>
          <TouchableOpacity 
            style={styles.flipArea} 
            onPress={() => {
              if(!recordOn){
                onFlipCamera();
                setZoom(0);
                setFlashStatus("off");
                setRatio('4:3')
              }
            }}
          >
            <MaterialIcons name="cameraswitch" size={25} color="#ffffff" />
          </TouchableOpacity>
          
          <TakeMediaButton />

          <TouchableOpacity 
            style={styles.modeCamera} 
            onPress={() => {
              if(!recordOn){
                setCamMode(value => value == 'picture'? 'video' : 'picture');
                setZoom(0);
                setFlashStatus("off");
                setRatio('4:3')
                setTorchOn(false);
              }
            }}
          >
            <MaterialIcons name={camMode == 'picture' ? 'videocam' : 'photo-camera'} size={25} color="#ffffff" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.zoomArea} onPress={() => setZoomCam(setZoom)}>
            <Text style={styles.zoomText}><MaterialIcons name="zoom-in" size={15} color="#ffffff" />{ zoom == 0.0? "1x" : zoom == 0.5? "5x" : zoom == 0.7? "7x" : "10x"}</Text>
          </TouchableOpacity>
          <FlashOrTorchButton />
          <TouchableOpacity style={styles.ratioArea} onPress={() => setRateCam(ratio, setRatio, recordOn)}>
            <Text style={styles.ratioText}>{ratio}</Text>
          </TouchableOpacity>
        </View>

        //condicional (tipo if) para renderizar o modal se o capturedPhoto não for nulo
        {capturedMedia && (
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
            {(camMode == 'picture') && (
              <Image
                style={{
                  width: "100%",
                  height: 480,
                  borderRadius: 20,
                }} 
                source={{uri: capturedMedia}}
              />
            )}

            {(camMode == 'video') && (
              <VideoPreview uri={capturedMedia} />
            )}

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
              <TouchableOpacity
                style={{margin: 10}}
                onPress={sharePicture}
              >
                <Text><MaterialIcons name="share" size={34} color="black" /></Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        )}
      </CameraView>
    )
}