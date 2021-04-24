import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  ImageBackground,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import Constants from "expo-constants";
import { Octicons } from '@expo/vector-icons';

import Screen from "../Screen";
import CountryData from "../CountryData/CountryData";
import { useRef } from "react/cjs/react.production.min";

function WelcomeScreen({navigation}) {
  const [textInput, setTextInput] = useState();
  const [data, setData] = useState();
  const [refreshing, setRefresh] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState(data);
  
  useEffect(() => {
    fetch("https://api.covid19api.com/summary")
    .then((response) => response.json())
    .then((json) =>  {
      setData(json.Countries)
      setSearchData(json.Countries)}
    )
    .then(setSearchData(data))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false))
  }, []);
  
  

  const filtering = ((text) =>{
    if(text.length > 0)
      setSearchData(data.filter( (m) => m.Country.toLowerCase().includes(text.toLowerCase())))
    else
      setSearchData(data)    
})
  


  return (
    <Screen>
      <TouchableOpacity style={styles.barContainer} 
        activeOpacity={0.6}
        onPress={() => navigation.openDrawer()}
      >
        <Octicons name="three-bars" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.searchBar}>
        <View style={{ marginLeft: 45, marginRight: 10 }}>
          <TextInput
            onChangeText={(text) => filtering(text)}
            //onSubmitEditing={(text) => setTextInput("Enter")}
            placeholder={"Enter Country Name"}
            style={styles.searchBarText}
            clearButtonMode="always"
          />
        </View>
        <Image
          source={require("../../assets/Covid19.jpg")}
          style={styles.CovidLog}
        />
      </View>

      <View style={styles.countriesData}>
        {isLoading ? (
           <ActivityIndicator  size="large" color='#7affff'/>
        ) : (
          <FlatList
            data={searchData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <CountryData COVID={item} onPress={()=> console.log(item)} />}
            refreshing={refreshing}
            decelerationRate={'fast'}
            onRefresh={() => setRefresh(false)}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  barContainer:{
    position: 'absolute',
    marginTop: Constants.statusBarHeight*1.7,
    marginLeft: 10, 
  },
  searchBar: {
    position: "absolute",
    width: "80%",
    backgroundColor: "white",
    borderRadius: 30,
    justifyContent: "center",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "13%",
    marginTop: Constants.statusBarHeight*1.2,
  },
  searchBarText: {
    fontWeight: "bold",
    color: "black",
    width: "125%",
    // position: 'absolute',
  },
  CovidLog: {
    height: 30,
    borderRadius: 15,
    padding: 5,
    justifyContent: "center",
    position: "absolute",
    left: 10,
    alignSelf: "center",
    width: 30,
  },
  countriesData: {
    // backgroundColor: "#fffafa",
    marginBottom: 15
  },
});
export default WelcomeScreen;
