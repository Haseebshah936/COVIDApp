import React, {useEffect} from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  Dimensions,
  SafeAreaView,
  Pressable,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import ErrorMessage from "./ErrorMessage";
import { auth } from "../../firebase";


const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

function LoginForm({navigation}) {
  // const navigation = useNavigation();
  const signin = (values) => {
    auth.signInWithEmailAndPassword(values.email, values.password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log(user);
    navigation.replace('Home');
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });
  }

  // useEffect(()=>{
  //   const unsub = auth.onAuthStateChanged
  //   (user => {
  //     if (user) {
  //       // User is signed in.
  //       navigation.replace('Home');
  //     } else {
  //       // No user is signed in.
  //     }
  //   });
  //   return unsub;
  // }, [])

      
  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/covid2.png")} />

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => signin(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
            <View style={styles.searchBar}>
              <Fontisto
                style={styles.CovidLog}
                name="email"
                size={24}
                color="black"
              />
              <View style={{ marginLeft: 45, marginRight: 10 }}>
                <TextInput
                  onChangeText={handleChange("email")}
                  placeholder={"Email"}
                  style={styles.searchBarText}
                  clearButtonMode="always"
                  keyboardType={"email-address"}
                  onBlur={() => setFieldTouched("email")}
                />
              </View>
            </View>
            <ErrorMessage error={errors.email} visible={touched.email} />
            <View style={styles.searchBar}>
              <MaterialIcons
                style={styles.CovidLog}
                name="lock"
                size={24}
                color="black"
              />
              <View style={{ marginLeft: 45, marginRight: 10 }}>
                <TextInput
                  onChangeText={handleChange("password")}
                  placeholder={"Password"}
                  style={styles.searchBarText}
                  clearButtonMode="always"
                  secureTextEntry
                  onBlur={() => setFieldTouched("password")}
                />
              </View>
            </View>
            <ErrorMessage error={errors.password} visible={touched.email} />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.login}
                activeOpacity={0.6}
                onPress={handleSubmit}
              >
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.login}
                activeOpacity={0.6}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={styles.loginText}>Register</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>

      <TouchableOpacity
        style={styles.googleLogin}
        activeOpacity={0.6}
        onPress={() => console.log("Hello")}
      >
        <Image
          style={styles.googleLogo}
          source={require("../../assets/googleLogo.png")}
        />
        <Text style={styles.googleText}>Sign in with Google</Text>
      </TouchableOpacity>

      <StatusBar style={"auto"} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "lightyellow",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  logo: {
    // marginTop: Constants.statusBarHeight*4,
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  searchBar: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 30,
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  searchBarText: {
    fontWeight: "bold",
    color: "black",
    fontSize: 16,
  },
  CovidLog: {
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    position: "absolute",
    left: 15,
    alignSelf: "center",
    width: 40,
    flex: 0.5,
  },
  countriesData: {
    marginBottom: 15,
  },
  loginText: {
    padding: 10,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "#474747",
  },

  login: {
    marginTop: 5,
    marginVertical: 10,
    backgroundColor: "pink",
    borderRadius: 50,
    width: Dimensions.get("window").width * 0.3,
    marginBottom: 30,
    marginRight: 20,
  },
  googleLogin: {
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.85,
    backgroundColor: "white",
    justifyContent: "space-between",
    borderRadius: 50,
  },
  googleLogo: {
    width: 36,
    height: 36,
    alignSelf: "center",
    marginLeft: 25,
  },
  googleText: {
    padding: 14,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#474747",
    marginRight: 50,
  },
});
export default LoginForm;
