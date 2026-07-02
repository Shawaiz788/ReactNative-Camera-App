import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Ionicons } from '@expo/vector-icons'
import * as ExpoMediaLibrary from "expo-media-library"
import { router, Stack } from 'expo-router'
import React from 'react'
import { Alert, StyleSheet, Switch, TouchableOpacity, View } from 'react-native'
import { type PermissionStatus, VisionCamera } from 'react-native-vision-camera'

const ICON_SIZE = 26
export default function PermissionsScreen() {
    const [cameraPermissionStatus, setCameraPermissionStatus] = React.useState<PermissionStatus>(
        VisionCamera.cameraPermissionStatus
    )
    const [microphonePermissionStatus, setMicrophonePermissionStatus] = React.useState<PermissionStatus>(
        VisionCamera.microphonePermissionStatus
    )

    const [mediaLibraryPermissionStatus, requestMediaLibraryPermissions] = ExpoMediaLibrary.usePermissions()

    const requestMicrophonePermission = async () => {
        await VisionCamera.requestMicrophonePermission();
        setMicrophonePermissionStatus(VisionCamera.microphonePermissionStatus);
    }
    const requestCameraPermission = async () => {
        await VisionCamera.requestCameraPermission();
        setCameraPermissionStatus(VisionCamera.cameraPermissionStatus);
    }

    const handleContinue = async () => {
        if (cameraPermissionStatus === 'authorized'
            && microphonePermissionStatus === 'authorized'
            && mediaLibraryPermissionStatus?.granted) {
            router.replace('/')
        } else {
            Alert.alert("Please go to settings and enable permissions")
        }
    }

    return (
        <>
            <Stack.Screen options={{ headerTitle: 'Permissions', headerShown: true }} />
            <ThemedView style={styles.container}>
                <View style={styles.spacer} />
                <ThemedText type='subtitle' style={styles.subtitle}>
                    App needs access to a few permissions in order to work properly
                </ThemedText>
                <View style={styles.spacer} />
                <View style={styles.row} >
                    <Ionicons
                        name='lock-closed-outline'
                        color='orange'
                        size={ICON_SIZE} />
                    <ThemedText>Required</ThemedText>
                </View>
                <View style={styles.spacer} />
                <View style={StyleSheet.compose(styles.row, styles.permissionContainer)}>
                    <Ionicons
                        name='camera-outline'
                        color='gray'
                        size={ICON_SIZE} />
                    <View style={styles.permissionText}>
                        <ThemedText type='subtitle'>
                            Camera
                        </ThemedText>
                        <ThemedText >
                            Used for taking photos and videos.
                        </ThemedText>
                    </View>
                    <Switch trackColor={{ true: 'orange' }}
                        value={cameraPermissionStatus === 'authorized'}
                        onChange={requestCameraPermission}
                    />
                </View>

                <View style={StyleSheet.compose(styles.row, styles.permissionContainer)}>
                    <Ionicons
                        name='mic-circle-outline'
                        color='gray'
                        size={ICON_SIZE} />
                    <View style={styles.permissionText}>
                        <ThemedText type='subtitle'>Microphone</ThemedText>
                        <ThemedText >Used for recording video.</ThemedText>
                    </View>
                    <Switch trackColor={{ true: 'orange' }}
                        value={microphonePermissionStatus === 'authorized'}
                        onChange={requestMicrophonePermission}
                    />
                </View>

                <View style={StyleSheet.compose(styles.row, styles.permissionContainer)}>
                    <Ionicons
                        name='camera-outline'
                        color='gray'
                        size={ICON_SIZE} />
                    <View style={styles.permissionText}>
                        <ThemedText type='subtitle'>
                            Library
                        </ThemedText>
                        <ThemedText >
                            Used for saving, viewing and more photos and videos.
                        </ThemedText>
                    </View>
                    <Switch trackColor={{ true: 'orange' }}
                        value={mediaLibraryPermissionStatus?.granted ?? false}
                        onValueChange={async () => {
                            await requestMediaLibraryPermissions();
                        }}
                    />
                </View>
                <View style={styles.spacer} />
                <View style={styles.spacer} />
                <View style={styles.spacer} />

                <TouchableOpacity style={StyleSheet.compose(styles.row, styles.continueButton)}
                    onPress={handleContinue}
                >

                    <Ionicons
                        name='arrow-forward-outline'
                        color={'white'}
                        size={ICON_SIZE}
                    />
                </TouchableOpacity>


            </ThemedView>

        </>
    )

} const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    subtitle: {
        textAlign: 'center',
    },
    footnote: {
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    spacer: {
        marginVertical: 8,
    },
    permissionContainer: {
        backgroundColor: '#ffffff20',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'space-between',
    },
    permissionText: {
        marginLeft: 10,
        flex: 1,
    },
    continueButton: {
        padding: 10,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 50,
        alignSelf: 'center',
    },
})