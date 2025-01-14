import React, { useReducer, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import MenuDetailsScreen from "./src/screens/MenuDetailsScreen";
import Constants from "expo-constants";
import HealthGoalsScreen from "./src/screens/HealthGoalsScreen";
import Toast from "react-native-toast-message";
import { SelectedGoalsProvider } from "./src/SelectedGoalsContext";
import * as Segment from "expo-analytics-segment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";
import { GoalsContextProvider } from "./src/utils/GoalsContextProvider";
import { DietContextProvider } from "./src/utils/DietContextProvider";
import { AllergiesContextProvider } from "./src/utils/AllergiesContextProvider";
import firebase from 'firebase/app';
import 'firebase/analytics'; // if you're using analytics

async function trackFirstAppOpen() {
  try {
    const firstOpen = await AsyncStorage.getItem("firstAppOpen");

    if (firstOpen === null) {
      const deviceType = Platform.OS === "ios" ? "iPhone" : "Android";
      Segment.track(`First App Open: ${deviceType}`);

      await AsyncStorage.setItem("firstAppOpen", "true");
    }
  } catch (error) {
    console.error("Error tracking first app open:", error);
  }
}

async function identifyUser() {
  try {
    let userId = await AsyncStorage.getItem("userId");

    if (userId === null) {
      userId = uuidv4();
      await AsyncStorage.setItem("userId", userId);
    }

    Segment.identify(userId);
  } catch (error) {
    console.error("Error identifying user:", error);
  }
}

const segmentWriteKey = "Nw5e5EZ8341IaH5SIXtTOnPctantZQlP";
Segment.initialize({
  androidWriteKey: segmentWriteKey,
  iosWriteKey: segmentWriteKey,
});

const Stack = createNativeStackNavigator();

function selectedGoalsReducer(state, action) {
  switch (action.type) {
    case "SET_SELECTED_GOALS":
      return action.payload;
    default:
      return state;
  }
}

function App() {
  useEffect(() => {
    trackFirstAppOpen();
    identifyUser();
  }, []);
  useEffect(() => {
    if (Constants.appOwnership !== "expo") {
      Segment.track("App Opened");
    }
  }, []);

/*   useEffect(() => {
    app().onReady().then(() => {
      console.log('Firebase initialized');
    });
  }, []);

 */  return (
    <>
      <SelectedGoalsProvider value={useReducer(selectedGoalsReducer, [])}>
        <DietContextProvider>
          <GoalsContextProvider>
            <AllergiesContextProvider>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen
                    name="HealthGoals"
                    component={HealthGoalsScreen}
                  />
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="Details" component={MenuDetailsScreen} />
                  <Stack.Screen
                    name="MenuDetails"
                    component={MenuDetailsScreen}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </AllergiesContextProvider>
          </GoalsContextProvider>
        </DietContextProvider>
      </SelectedGoalsProvider>
      <Toast />
    </>
  );
}

export default App;
