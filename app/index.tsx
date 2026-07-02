import { Redirect } from 'expo-router'
import React from 'react'
import { Platform, StatusBar, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Camera, useCameraDevice, useCameraPermission, useMicrophonePermission } from 'react-native-vision-camera'

const index = () => {
  const { hasPermission: hasCameraPermission } = useCameraPermission()
  const { hasPermission: hasMicrophonePermission } = useMicrophonePermission()

  const redirectToPermissions = !hasCameraPermission || !hasMicrophonePermission
  const device = useCameraDevice("back");


  if (redirectToPermissions) {
    return <Redirect href={'/permissions'} />
  }
  if (!device) return <></>


  return (<SafeAreaView style={styles.container}>
    <Camera style={{ flex: 1 }} device={device} isActive />
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