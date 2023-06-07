import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Icon } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { selectToken, selectUser, setUser } from "../slices/navSlices";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [tempName, setTempName] = useState("");
  const [tempHA, setTempHA] = useState("");
  const [image, setImage] = useState("");

  const pressImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
        base64: true
      });
      if (!result.canceled) {
        setImage(result.assets[0].base64)
        handleUpdate()
      } else {
        alert("You did not select any image.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    if (!tempName || !tempHA || image) {
      alert("Cannot update empty fields.");
      return;
    }
    try {
      const response = await fetch("http://192.168.1.6:3000/api/user/update", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          name: tempName,
          home_address: tempHA,
          image_base64: image
        }),
      });
      const json = await response.json();
      if (json.status === "success") {
        dispatch(
          setUser({ name: tempName, home_address: tempHA, image: image })
        );
        alert("Updated...");
      } else {
        alert("Something went wrong...");
        setTempHA("");
        setTempName("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={tw``}>
      <ScrollView contentContainerStyle={tw``}>
        <TouchableOpacity
          style={tw`bg-gray-100 absolute top-5 left-4 z-50 p-3 rounded-full shadow-lg items-center justify-center`}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Icon name="left" type="antdesign" size={20} />
        </TouchableOpacity>
        <View style={tw``}>
          <ImageBackground
            source={require("../assets/mask.png")}
            style={styles.imageBack}
            imageStyle={styles.imageBack}
          >
            <View style={tw``}>
              <TouchableOpacity style={tw`items-center`} onPress={pressImage}>
                <Image
                  source={{ uri: user.image }}
                  style={tw`h-30 w-30 absolute top-30 z-50`}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <View style={tw`items-center justify-center gap-8 pt-20 pb-20`}>
          <View style={tw`w-[100%] items-center gap-1`}>
            <Text style={tw`w-[80%] text-sm text-[#818181]`}>Name</Text>
            <TextInput
              style={tw`bg-white px-5 py-3 rounded-md w-[80%] shadow`}
              placeholder={`${user?.name ? user.name : "Enter name"}`}
              onChangeText={(e) => setTempName(e)}
            />
          </View>
          <View style={tw`w-[100%] items-center gap-1`}>
            <Text style={tw`w-[80%] text-sm text-[#818181]`}>Home Address</Text>
            <TextInput
              style={tw`bg-white px-5 py-3 rounded-md w-[80%] shadow`}
              placeholder={`${
                user?.home_address ? user.home_address : "Enter name"
              }`}
              onChangeText={(e) => setTempHA(e)}
            />
          </View>
        </View>
        <TouchableOpacity
          style={tw`items-center justify-center rounded-md w-[100%] mx-auto `}
          onPress={handleUpdate}
        >
          <View style={tw`w-[85%] bg-[#EC2747] py-3 rounded-md`}>
            <Text style={tw`text-lg text-white text-center font-semibold`}>
              Update
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  imageBack: {
    width: "100%",
    height: 200,
    resizeMode: "stretch",
  },
});
