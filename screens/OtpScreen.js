import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import tw from "twrnc";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNumber,
  selectUser,
  setToken,
  setUser,
} from "../slices/navSlices";

const CELL_COUNT = 4;

const OtpScreen = () => {
  const dispatch = useDispatch();
  const number = useSelector(selectNumber);
  const user = useSelector(selectUser);
  const navigation = useNavigation();
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleOTPSubmit = async () => {
    try {
      const response = await fetch("http://192.168.1.6:3000/api/user/verify", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: number,
          otp: value,
        }),
      });
      const json = await response.json();
      if (json.type === "success") {
        const name = json?.data?.user?.name;
        const home_address = json?.data?.user?.home_address;
        const image = json?.data?.user?.image;
        const token = json?.data?.token;
        dispatch(setToken(token));
        dispatch(
          setUser({
            name,
            home_address,
            image,
          })
        );
        navigation.navigate("HomeScreen");
      } else {
        alert("Wrong OTP");
        setValue("");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        <View style={tw`w-full`}>
          <Text style={tw`text-sm`}>Phone Verification</Text>
          <Text style={tw`text-2xl font-semibold text-red-600`}>
            Enter your OTP code below
          </Text>
          <View style={tw`items-center justify-center mt-10`}>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              onEndEditing={handleOTPSubmit}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>
        </View>
        <View>
          <Text style={tw`text-center text-xs`}>
            Resend code in<Text style={tw`font-bold`}> 10 Seconds</Text>
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={tw`bg-gray-100 absolute top-14 left-6 z-50 p-3 rounded-full shadow-lg items-center justify-center`}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Icon name="left" type="antdesign" size={20} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  codeFieldRoot: {
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 38,
    fontSize: 26,
    borderRadius: 3,
    textAlign: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  focusCell: {
    backgroundColor: "#EFF3F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
});
