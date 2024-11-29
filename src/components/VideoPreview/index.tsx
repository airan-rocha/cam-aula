import { useState, useRef } from 'react';
import { View, Button, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import {styles} from './styles';
import propsVideoPreview from './props';

export default function VideoPreview(props: propsVideoPreview) {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: props.uri,
        }}
        // useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <TouchableOpacity
            onPress={() =>
                status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
            }
        >
            <MaterialIcons name={status.isPlaying ? 'pause-circle-filled' : 'play-circle-filled'} size={60} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}