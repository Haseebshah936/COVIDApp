import React from "react";
import { View, StyleSheet, ActivityIndicator, SafeAreaView } from "react-native";
import { useEffect } from "react";
import { auth } from "../firebase";
function LoadingScreen({navigation}) {
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        navigation.replace("Home");
    } else {
        // No user is signed in.
        navigation.replace("Login");
      }
    });
    return unsub;
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size={'large'} color={'black'}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
export default LoadingScreen;
