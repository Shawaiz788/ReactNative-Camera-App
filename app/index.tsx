import CustomButton from '@/components/CustomButton'
import { ThemedText } from '@/components/themed-text'
import { FontAwesome5 } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Redirect, useRouter } from 'expo-router'
import * as React from 'react'
import { Linking, Platform, StatusBar, StyleSheet, TouchableHighlight, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Camera, useCameraDevice, useCameraFormat, useCameraPermission, useMicrophonePermission } from 'react-native-vision-camera'

const index = () => {
  const { hasPermission: hasCameraPermission } = useCameraPermission()
  const { hasPermission: hasMicrophonePermission } = useMicrophonePermission()

  const redirectToPermissions = !hasCameraPermission || !hasMicrophonePermission
  const [cameraPosition, setCameraPosition] = React.useState<'front' | 'back'>('back');
  const device = useCameraDevice(cameraPosition);

  const format = useCameraFormat(device, [
    { photoResolution: { width: 1280, height: 720 } },
    { fps: 30 },
  ]);

  const [zoom, setZoom] = React.useState(1);
  const [exposure, setExposure] = React.useState(0);
  const [flash, setFlash] = React.useState<"off" | "on">("off");
  const [torch, setTorch] = React.useState<"off" | "on">("off");
  const camera = React.useRef<Camera>(null)
  const router = useRouter();

  const takePicture = async () => {
    try {
      if (camera.current === null) throw new Error("Camera ref is null!");
      console.log('Taking a picture..')
      const photo = await camera.current.takePhoto({
        flash: flash,
        enableShutterSound: false
      })

      const video = await camera.current.startRecording({
        onRecordingError: (error) => console.log(error),
        onRecordingFinished: (video) => console.log(video)
      });
      router.push({
        pathname: '/media',
        params: {
          media: photo.path, type: 'photo'
        },
      })
    } catch (e) {
      console.log(e)
    }
  }

  if (redirectToPermissions) {
    return <Redirect href={'/permissions'} />
  }
  if (!device) return <></>


  return (<SafeAreaView style={styles.container}>
    <View style={{ flex: 1, borderRadius: 10, overflow: "hidden" }}>
      <Camera ref={camera}
        style={{ flex: 1 }}
        device={device}
        format={format}
        isActive
        resizeMode='cover'
        zoom={zoom}
        exposure={exposure}
        video
        photo
      />
      <BlurView
        intensity={100}
        tint='dark'
        style={{
          flex: 1,
          position: 'absolute',
          bottom: 0,
          right: 0,
          padding: 10
        }}
        experimentalBlurMethod='dimezisBlurView'
      >
        <ThemedText
        >Exposure:{exposure} | Zoom: x{zoom}</ThemedText>

      </BlurView>

    </View>

    <View style={{ flex: 1 }}>

      <View style={{ flex: 0.7 }}>
        <ThemedText>Max FPS:{format?.maxFps}</ThemedText>
        <ThemedText>Width:{format?.photoWidth}
          Height:{" "}{format?.photoHeight}
        </ThemedText>
        <ThemedText>Camera: {device.name}</ThemedText>
      </View>

      <View style={{ flex: 0.7, flexDirection: 'row', justifyContent: 'space-evenly' }}></View>
      <CustomButton
        iconName={torch === "on" ? "flashlight" : "flashlight-outline"}
        onPress={() => setTorch((t) => (t === "off" ? "on" : "off"))}
      />
      <CustomButton
        iconName="camera-reverse-outline"
        onPress={() => setCameraPosition((p) => (p === "back" ? "front" : "back"))}
        containerStyle={{ alignSelf: 'center' }}
      />

      <CustomButton
        iconName="image-outline"
        onPress={() => {
          const link = Platform.select({
            ios: 'photos-redirect://',
            android: 'content://media/external/images/media',
          });
          Linking.openURL(link!)
        }}
        containerStyle={{ alignSelf: 'center' }}
      />

      <CustomButton
        iconName={"settings-outline"}
        onPress={() => router.push('/_sitemap')}
        containerStyle={{ alignSelf: 'center' }}
      />
    </View>
    <View style={{
      flex: 1.1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    }}>


      <CustomButton
        iconSize={40}
        title="+/-"
        onPress={() => setShowZoomControls((s) => !s)}
        containerStyle={{ alignSelf: "center" }}
      />
      <TouchableHighlight
        onPress={takePicture}
      >
        <FontAwesome5 name='dot-circle' size={55} color={'white'} />
      </TouchableHighlight>

      <CustomButton
        iconSize={40}
        title="1x"
        onPress={() => setShowExposureControls((s) => !s)}
        containerStyle={{ alignSelf: "center" }}
      />

    </View>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0
  },

})
export default index