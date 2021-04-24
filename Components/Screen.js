import React from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet, ImageBackground, Dimensions } from "react-native";
import Constants from "expo-constants";

function Screen({ children }) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/covid199.jpg")}
        style={styles.CovidBackground}
        resizeMode="cover"
        blurRadius={0.2}
      />
      {children}
      <StatusBar hidden />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcf6fc',
    width: "100%",
    // paddingTop: Constants.statusBarHeight
  },
  CovidBackground: {
   width: "100%",
   height: Platform.OS  === "android" ? 110 : 130
  },
});

export default Screen;
