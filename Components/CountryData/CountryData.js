import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

function CountryData(props) {
  const {
    Country,
    CountryCode,
    TotalConfirmed,
    TotalRecovered,
    TotalDeaths,
    NewConfirmed,
    NewRecovered,
    NewDeaths,
  } = props.COVID;
  const onPress = props.onPress;
  url = "https://www.countryflags.io/" + CountryCode + "/shiny/64.png";

  return (
    <TouchableOpacity
        activeOpacity = {0.6}
        onPress = {onPress}
    >
      <View style={styles.container}>
        <Image
          style={{ alignSelf: "center" }}
          source={{
            width: 60,
            height: 60,
            uri: url,
          }}
        />
        <View style={styles.countryName}>
          <Text style={styles.nameText}>{Country}</Text>
          <View style={styles.countryDetail}>
            <View style={styles.countryDetailSub}>
              <Text style={styles.detailText}>Total Confirmed</Text>
              <Text style={styles.detailText}>Total Recovered</Text>
              <Text style={styles.detailText}>Total Deaths</Text>
            </View>
            <View style={styles.countryDetailSub}>
              <Text style={styles.textData}>{TotalConfirmed}</Text>
              <Text style={styles.textData}>{TotalRecovered}</Text>
              <Text style={styles.textData}>{TotalDeaths}</Text>
            </View>
          </View>
        </View>
        <View style={styles.countryDetail2}>
          <View style={styles.countryDetail}>
            <View style={styles.countryDetailSub}>
              <Text style={styles.detailText}>New Confirmed</Text>
              <Text style={styles.detailText}>New Recovered</Text>
              <Text style={styles.detailText}>New Deaths</Text>
            </View>
            <View style={styles.countryDetailSub}>
              <Text style={styles.textData}>{NewConfirmed}</Text>
              <Text style={styles.textData}>{NewRecovered}</Text>
              <Text style={styles.textData}>{NewDeaths}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 90,
    marginLeft: 10,
  },
  countryName: {
    marginLeft: 15,
    marginTop: 5,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  countryDetail2: {
    position: "absolute",
    right: 20,
    marginTop: 32,
  },
  textData: {
    fontSize: 10,
  },
  countryDetail: {
    flexDirection: "row",
    marginLeft: 3,
  },
  detailText: {
    fontSize: 10,
    fontWeight: "bold",
    marginRight: 5,
  },
  countryDetailSub: {
    flexDirection: "column",
  },
});
export default CountryData;
