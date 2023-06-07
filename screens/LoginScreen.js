import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import tw from "twrnc";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectNumber, setNumber } from "../slices/navSlices";

const LoginScreen = () => {
  const navigation = useNavigation();
  // const [number, setNumber] = useState("");
  const number = useSelector(selectNumber);
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <View style={tw`h-[64%] bg-white`}>
        <ImageBackground
          source={require("../assets/mask.png")}
          style={styles.imageBack}
          imageStyle={styles.imageBack}
        >
          <View style={tw`flex-col items-center justify-center h-full gap-4`}>
            <Image
              source={require("../assets/logo.png")}
              style={{ height: 120, width: 120, resizeMode: "contain" }}
            />
            <Text style={tw`text-white text-4xl font-bold`}>Ambulance</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={tw`px-6 pb-8 pt-6 justify-between bg-white gap-5 h-[36%]`}>
        <View>
          <Text style={tw`text-sm`}>Hello, nice to meet you!</Text>
          <Text style={tw`text-2xl font-semibold text-red-600`}>
            Book your Ambulance Now
          </Text>
        </View>
        <View style={tw`flex-row`}>
          <TouchableOpacity
            style={tw`justify-center items-center w-[20%] border-b border-t border-l flex-row gap-1`}
          >
            <Image
              source={require("../assets/indianFlag.png")}
              style={{ height: 20, width: 20 }}
            />
            <Text>+91</Text>
          </TouchableOpacity>
          <TextInput
            style={tw`border px-4 py-3 rounded-sm w-[65%]`}
            placeholder="Enter your mobile number"
            onChangeText={(e) => dispatch(setNumber(e))}
            value={number}
            keyboardType="number-pad"
          />
          <TouchableOpacity
            style={tw`bg-red-500 justify-center items-center w-[15%]`}
            onPress={async () => {
              try {
                const response = await fetch(
                  "http://192.168.1.6:3000/api/user/login-with-phone",
                  {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      phone: number
                    }),
                  }
                );
                const json = await response.json();
                if(json.type === 'success'){
                  navigation.navigate("OtpScreen");
                }
              } catch (error) {
                console.error(error);
              }
            }}
            disabled={!number}
          >
            {/* <Icon type="ionicon" name="caret-forward" color="white" size={26} /> */}
            <Icon name="right" type="antdesign" color="white" size={22} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={tw`text-center text-xs`}>
            By creating an account, you agree to our
            <Text style={tw`font-bold`}> Terms of Service</Text> and{" "}
            <Text style={tw`font-bold`}>Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  imageBack: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
