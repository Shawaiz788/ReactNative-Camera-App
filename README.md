# 📸 React Native Camera App

A high-performance, cross-platform Camera Application built using **React Native**, **Expo**, and **React Native Vision Camera**. The app features advanced camera controls, smooth animations, and direct gallery integration.

---

## ✨ Features

- 📹 **High-Performance Camera Preview:** Low-latency live feed using React Native Vision Camera.
- 🎛️ **Radial Exposure & Zoom Controls:**
  - **Zoom Controls:** Curve gracefully on the right side of the screen, supporting zoom factors from `1x` to `5x`.
  - **Exposure Controls:** Curve elegantly on the left side of the screen, adjusting brightness compensation values dynamically based on OS platform defaults.
- ⚡ **Flashlight & Flash Strobe:** Easily toggle the continuous flashlight (torch) or trigger a synchronized camera flash stroke during photo captures.
- 📁 **Gallery Integration:** View captured photos in a detailed modal overlay and save them directly to your device's photo gallery with one tap.
- 🔒 **Sleek Permissions Flow:** A dedicated permissions gateway screen ensuring camera and microphone permissions are requested and granted before using the camera.

---

## 🛠️ Tech Stack & Dependencies

- **Core Framework:** [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) (SDK 54)
- **Camera Library:** [React Native Vision Camera](https://react-native-vision-camera.com/) (Version 4+)
- **Navigation:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based navigation)
- **Animations:** [React Native Reanimated](https://docs.expo.dev/versions/latest/sdk/reanimated/) (for smooth component transitions)
- **Assets Library:** [Expo Media Library](https://docs.expo.dev/versions/latest/sdk/media-library/) (for photo saving)

---

## 📂 Project Structure

```text
├── app/
│   ├── _layout.tsx         # Root layout handler with routing & theme configuration
│   ├── index.tsx           # Main screen displaying active Camera and controls
│   ├── permissions.tsx     # Gateway for requesting Camera & Microphone permissions
│   └── media.tsx           # Media preview screen with save-to-gallery functionality
│
├── components/
│   ├── CustomButton.tsx    # Reusable custom button style for control actions
│   ├── ZoomControls.tsx    # Radial control arc for zoom options (Right side)
│   └── ExposureControls.tsx# Radial control arc for exposure settings (Left side)
│
└── package.json            # Project dependencies and startup scripts
```

---

## 🚀 Getting Started

### 📋 Prerequisites

To run this project, make sure you have:
1. **Node.js** installed on your development machine.
2. **Android SDK** (for Android emulation/physical devices) or **Xcode** (for iOS simulator/physical devices).
3. **Expo EAS CLI** (optional, for builds).

> [!IMPORTANT]
> Because **React Native Vision Camera** contains custom native code, this application **cannot be run inside Expo Go**. You must compile it using an Expo Development Build or local native runners.

### ⚙️ Step-by-Step Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Shawaiz788/ReactNative-Camera-App.git
   cd ReactNative-Camera-App
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Expo Development Server:**
   ```bash
   npx expo start
   ```

4. **Build and Run on Native Devices/Simulators:**
   To run with native modules compiled, execute one of the following commands in another terminal:

   - **For Android:**
     ```bash
     npx expo run:android
     ```
   - **For iOS:**
     ```bash
     npx expo run:ios
     ```

---

## 🧪 How to Use the App

1. **Grant Permissions:** Launching the app for the first time redirects you to the Permissions screen. Grant permissions for both Camera and Microphone.
2. **Taking Photos:** Press the white circular capture button in the center-bottom of the main screen.
3. **Adjusting Zoom:** Tap the **1x** button to open the radial zoom options on the right side. Select your zoom level. Press the **X** button to close.
4. **Adjusting Exposure:** Tap the **+/-** button to reveal exposure compensation levels on the left side. Adjust the brightness compensation. Press the **X** button to close.
5. **Flash/Torch:** Press the flashlight icon to toggle continuous illumination (torch) on/off.
6. **Gallery & Saving:** After capturing a picture, you will be taken to the media preview. Tap **Save to gallery** to write the image to your phone's camera roll.
