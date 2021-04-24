import React, { useEffect, useState } from "react";
import * as Location from 'expo-location';
import {View, StyleSheet, ActivityIndicator} from 'react-native'

import Countries from './Countries'

function CurrentCountry(props) {
    const [countryCode, setCode] = useState(null);


    async function getLocation(){
      try{
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert(`Permission to access location was denied.
          You will not be able to view your cuntry data
          `);
          return;
        }
    
        let location = await Location.getCurrentPositionAsync({});
        return location;
      }
      catch(error){
        let status = Location.hasServicesEnabledAsync();
        if(!status){
          alert('Enable Location Service');
        }
      }
    }
    
    
    async function getCode(latitude, longitude){
      await fetch(`http://api.geonames.org/countryCodeJSON?lat=${latitude}&lng=${longitude}&username=haseebshah936.`)
      .then((response) => response.json())
      .then((json) => setCode(json.countryCode))
      .catch((error) => console.error(error))
    }

    useEffect(() => {
      (async () => {
      let longitude = 'Waiting..';
      let latitude = 'Waiting..';
       getLocation().then(location => {
            latitude = location.coords.latitude;
            longitude = location.coords.longitude;
            getCode(latitude, longitude)

       })
    })
      ()
    },[]);
  
    if(countryCode == null){
        // setCount(count+1)
        return <View/>
    }

    return (
        <Countries text={countryCode}/>
    );
}



export default CurrentCountry;