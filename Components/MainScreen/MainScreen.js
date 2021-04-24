import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  Image,
  StatusBar,
  Text,
  SafeAreaView,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import detail from "../CovidData";
import Screen from "../Screen";
import CurrentCountry from "../CountryData/CurrentCountry";
import Countries from "../CountryData/Countries";
import * as Location from "expo-location";
import { auth } from "../../firebase";

function MainScreen({ navigation }) {
  let [data, setData] = useState(null);
  let [isLoading, setLoading] = useState(true);

  const signout = () => {
    auth.signOut().then(() => {
      // Sign-out successful.
      navigation.replace('Login')
    }).catch((error) => {
      // An error happened.
    });
  }
  useEffect(() => {
    fetch("https://api.covid19api.com/summary")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <ImageBackground
        source={require("../../assets/covid1.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
        blurRadius={0.2}
      />
      
      <TouchableOpacity
        style={styles.barContainer}
        activeOpacity={0.6}
        onPress={() => navigation.openDrawer()}
      >
        <Octicons name="three-bars" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.countryFlag}>
        <CurrentCountry />
      </View>

      <TouchableOpacity
        style={styles.signoutContainer}
        activeOpacity={0.6}
        onPress={() => signout()}
      >
        <Octicons name="sign-out" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.countryFlag}>
        <CurrentCountry />
      </View>

      <View style={styles.countryData}>
        {isLoading ? (
          <ActivityIndicator
            style={{ marginTop: Constants.statusBarHeight }}
            size={"large"}
            color={"white"}
          />
        ) : (
          <View style={styles.world}>
            <Text style={styles.nameText}>World</Text>
            <View style={styles.worldDataContainer}>
              <Image
                style={styles.globe}
                source={require("../../assets/globe1.png")}
              />
              <View>
                <View style={styles.worldData}>
                  <Text style={styles.text}>TotalConfirmed</Text>
                  <Text style={styles.text}>{data.Global.TotalConfirmed}</Text>
                </View>
                <View style={styles.worldData}>
                  <Text style={styles.text}>TotalRecovered </Text>
                  <Text style={styles.text}>{data.Global.TotalRecovered}</Text>
                </View>
                <View style={styles.worldData}>
                  <Text style={styles.text}>TotalDeaths </Text>
                  <Text style={styles.text}>{data.Global.TotalDeaths}</Text>
                </View>
                <View style={styles.worldData}>
                  <Text style={styles.text}>NewConfirmed </Text>
                  <Text style={styles.text}>{data.Global.NewConfirmed}</Text>
                </View>
                <View style={styles.worldData}>
                  <Text style={styles.text}>NewDeaths </Text>
                  <Text style={styles.text}>{data.Global.NewDeaths}</Text>
                </View>
                <View style={styles.worldData}>
                  <Text style={styles.text}>NewRecovered </Text>
                  <Text style={styles.text}>{data.Global.NewRecovered}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
      <StatusBar hidden />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "lightblue",
  },
  countryFlag: {
    position: "absolute",
    marginTop: "40%",
  },
  nameText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1c1c1c",
    position: "absolute",
    marginTop: "105%",
    alignSelf: "center",
  },
  barContainer: {
    position: "absolute",
    marginTop: Constants.statusBarHeight * 1.7,
    marginLeft: 10,
  },
  signoutContainer: {
    position: "absolute",
    marginTop: Constants.statusBarHeight * 1.7,
    right: 10
  },
  world: {
    width: "100%",
    height: "100%",
  },
  countryData: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  worldDataContainer: {
    left: 10,
    top: "117%",
    flexDirection: "row",
  },
  globe: {
    width: 120,
    height: 120,
  },
  worldData: {
    flexDirection: "row",
    paddingLeft: 10,
  },
  text: {
    color: "#1c1c1c",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
});
export default MainScreen;
