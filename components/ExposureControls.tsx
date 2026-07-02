import React from "react";
import {
    Platform,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";
import Animated, { BounceIn } from "react-native-reanimated";

const exposureOptionsAndroid = [-10, -5, 0, 5, 10];
const exposureOptionsIOS = [-2, -1, 0, 1, 2];
const exposureOptions =
    Platform.OS === "android" ? exposureOptionsAndroid : exposureOptionsIOS;

export default function ExposureControls({
    setExposure,
    setShowExposureControls,
    exposure,
}: {
    setExposure: (exposure: number) => void;
    setShowExposureControls: (show: boolean) => void;
    exposure: number;
}) {
    const { width, height } = useWindowDimensions();
    const radius = Math.min(width, height - 100) * 0.3;

    const handleExposurePress = (exposureValue: number) => {
        setExposure(exposureValue);
    };

    const centerX = 55;
    const centerY = height / 4 + 25;

    return (
        <View style={{ flex: 1, padding: 10 }}>
            {exposureOptions.map((exp, i) => {
                const minAngle = -Math.PI / 3;
                const maxAngle = Math.PI / 3;
                const angle = minAngle + (i / (exposureOptions.length - 1)) * (maxAngle - minAngle);

                const x = centerX + Math.cos(angle) * radius - 25;
                const y = centerY + Math.sin(angle) * radius - 25;

                return (
                    <Animated.View
                        key={i}
                        entering={BounceIn.delay(i * 100)}
                        style={{
                            position: "absolute",
                            left: x,
                            top: y,
                        }}
                    >
                        <TouchableHighlight
                            onPress={() => handleExposurePress(exp)}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                backgroundColor: exposure === exp ? "#ffffff" : "#ffffff30",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    color: exposure === exp ? "black" : "white",
                                    fontWeight: "600",
                                }}
                            >
                                {exp > 0 ? `+${exp}` : exp}
                            </Text>
                        </TouchableHighlight>
                    </Animated.View>
                );
            })}

            <TouchableOpacity
                onPress={() => setShowExposureControls(false)}
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: "#ffffff30",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    left: 30,
                    top: height / 4,
                }}
            >
                <Text style={{ color: "white", fontWeight: "600" }}>X</Text>
            </TouchableOpacity>
        </View>
    );
}