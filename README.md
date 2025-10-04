# Expo Camera Modal

A reusable, full-screen camera modal for React Native and Expo projects, built with `expo-camera` and `expo-media-library`. This component is designed to provide a stable, cross-platform camera experience and to work around known bugs related to `expo-image-picker` on Android.

## Installation

To install the package, run the following command in your project's terminal:

```
npm install @arunsmiracle/expo-camera-modal
```

## Peer Dependencies

This package does not bundle its own versions of core libraries to avoid versioning conflicts in your project. You must have the following packages already installed in your `package.json`:

-   `react`

-   `react-native`

-   `expo-camera`

-   `expo-media-library`

-   `react-native-feather`


## Tested Environment

This package has been tested and is confirmed to work with the following environment and package versions:

-   **`expo`**: `~54.0.11`

-   **`react`**: `19.1.0`

-   **`react-native`**: `0.81.4`

-   **`expo-camera`**: `~17.0.8`

-   **`expo-media-library`**: `~18.2.0`

-   **`react-native-feather`**: `^1.1.2`


## Usage

Using the modal is a two-step process: requesting permissions on app startup and then implementing the modal component in your screens.

### 1. Request Permissions on App Startup

For the best user experience, your app should request the necessary permissions when it first launches. This package does not request permissions itself; it only checks if they have been granted.

In your main **`App.js`** file or wherever you add the permissions, add the following `useEffect` hook:

```
import React, { useEffect } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

const App = () => {
  useEffect(() => {
    const requestPermissions = async () => {
      try {
        await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();
      } catch (e) {
        console.error("Error requesting initial permissions", e);
      }
    };

    requestPermissions();
  }, []); // The empty array ensures this runs only once.

  // ... rest of your App component
};
```

#### **Important Note on Permission Handling**

On Android 16, after the September 5 update, It is critical to request permissions at the top level of your application (e.g., in `App.js`) and **not** inside other functions or event handlers.

Requesting a permission (like `Notifications.requestPermissionsAsync()`) triggers a system-level dialog that pauses your app's JavaScript thread. If this is done in the middle of another function, it can cause that function to hang or fail unexpectedly, leading to a poor user experience where the app seems to freeze.

**Example of what to avoid:** Notice how the permission request is commented out in the helper function below. This is the correct approach. The permissions should already be granted _before_ this function is ever called.

```
import * as Notifications from "expo-notifications";

export const scheduleBreakNotifications = async (shiftStartTime) => {
  // DO NOT DO THIS HERE: This will cause a delay and a poor UX.
  // const { status } = await Notifications.requestPermissionsAsync();
  // if (status !== "granted") {
  //   return;
  // }

  // ... rest of the function
};
```

By handling all permissions on startup, you ensure your app's logic runs smoothly without being interrupted by permission dialogs.

### 2. Implement the Modal in Your Screen

Once permissions are handled, you can import and use the `CameraModal` component anywhere in your app.

Here is an example of how to use it to capture and display a profile picture:

```
import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import CameraModal from '@arunsmiracle/expo-camera-modal';

const ProfileScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const handlePictureTaken = (uri) => {
    console.log('Image captured at:', uri);
    setProfilePicture(uri);
    // The modal closes itself, so we just need to sync our state
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Change Profile Picture" onPress={() => setModalVisible(true)} />

      {profilePicture && (
        <Image
          source={{ uri: profilePicture }}
          style={styles.profileImage}
        />
      )}

      <CameraModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onPictureTaken={handlePictureTaken}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 20,
  },
});

export default ProfileScreen;
```