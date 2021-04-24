import React from "react";
import { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Image, Text } from "react-native";
import CountryData from "./CountryData";

function Countries({ text }) {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://api.covid19api.com/summary")
      .then((response) => response.json())
      .then((json) =>
        setData(
          json.Countries.filter((m) =>
            m.CountryCode.toLowerCase().includes(text.toLowerCase())
          )[0]
        )
      )
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  // const getItem = () =>{
  //     return data.filter( m => m.CountryCode.toLowerCase().includes(text.toLowerCase()))[0]
  // }
  return (
    <>
      {isLoading ? (
        <ActivityIndicator size={"large"} color={"white"} />
      ) : (
            <View>
                <Text style={styles.nameText}>{data.Country}</Text>
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={{
                            width: 120,
                            height: 120,
                            uri: "https://www.countryflags.io/" + data.CountryCode + "/shiny/64.png",
                        }}
                    />
                    <View style={styles.countryData}>
                        <View style={styles.countryDetail}>
                            <View >
                                    <Text style={styles.detailText}>Total Confirmed</Text>
                                    <Text style={styles.detailText}>Total Recovered</Text>
                                    <Text style={styles.detailText}>Total Deaths</Text>
                                    <Text style={styles.detailText}>New Confirmed</Text>
                                    <Text style={styles.detailText}>New Recovered</Text>
                                    <Text style={styles.detailText}>New Deaths</Text>
                            </View>
                            <View >
                                    <Text style={styles.textData}>{data.TotalConfirmed}</Text>
                                    <Text style={styles.textData}>{data.TotalRecovered}</Text>
                                    <Text style={styles.textData}>{data.TotalDeaths}</Text>
                                    <Text style={styles.textData}>{data.NewConfirmed}</Text>
                                    <Text style={styles.textData}>{data.NewRecovered}</Text>
                                    <Text style={styles.textData}>{data.NewDeaths}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
          )}
    </>
  );
}
const styles = StyleSheet.create({
    nameText: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1c1c1c",
        alignSelf: 'center',
        marginLeft: 65
    },
    container: {
        flexDirection: "row",
        marginLeft: 10,
    },
    image: {
        alignSelf: 'center'
    },
    countryData: {
        left: 15,
        marginTop: 10
    },
    detailText: {
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 10,
        color: "#1c1c1c"
    },
    textData: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1c1c1c"
    },
    countryDetail: {
        flexDirection: "row",
    },
})

export default Countries;
