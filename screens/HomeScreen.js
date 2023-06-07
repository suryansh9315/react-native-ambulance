import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { setOrigin, setDestination, selectUser, setToken, setUser, setNumber } from "../slices/navSlices";
import Map from "../components/Map";
import { Icon, Overlay } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
// import { FlatList } from "react-native-gesture-handler";

const listData = [
  {
    name: "Ride History",
    screen: "",
  },
  {
    name: "Invite Friends",
    screen: "",
  },
  {
    name: "Promo Code",
    screen: "",
  },
  {
    name: "Settings",
    screen: "",
  },
  {
    name: "Support",
    screen: "",
  },
];

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigator = useNavigation();
  const user = useSelector(selectUser);
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <SafeAreaView>
      <View style={tw``}>
        <View
          style={tw`absolute top-5 z-50 w-full justify-between flex-row px-5`}
        >
          <TouchableOpacity onPress={toggleOverlay}>
            <View
              style={tw`bg-white justify-center items-center rounded-full p-3 shadow`}
            >
              <Icon name="menu" type="ionicon" color="black" size={30} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigator.navigate("ProfileScreen");
            }}
          >
            <View style={tw`shadow`}>
              <Image source={{ uri: user.image }} style={tw`w-14 h-14`} />
            </View>
          </TouchableOpacity>
        </View>
        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={tw`absolute top-0 left-0 h-full w-[75%] bg-white justify-between px-8 py-5`}
        >
          <View>
            <View style={tw`flex-row items-center mt-5 mb-10`}>
              <View>
                <Image source={{ uri: user.image }} style={tw`h-16 w-16`} />
              </View>
              <View style={tw`ml-5`}>
                <Text style={tw`text-xs text-[#a8a8a8]`}>Good Morning,</Text>
                <Text style={tw`text-2xl font-bold`}>{user.name}</Text>
              </View>
            </View>
            <View style={tw``}>
              <FlatList
                data={listData}
                keyExtractor={(item) => item.name}
                contentContainerStyle={tw`gap-4`}
                renderItem={({ item }) => (
                  <TouchableOpacity style={tw``}>
                    <Text style={tw`font-semibold text-xl`}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                dispatch(setToken(null))
                dispatch(setUser(null))
                dispatch(setNumber(null))
              }}
            >
              <Text style={tw`font-semibold text-xl text-[#EC2747]`}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </Overlay>
        <View
          style={tw`absolute top-30 z-50 justify-center items-center w-[100%]`}
        >
          <GooglePlacesAutocomplete
            placeholder="Where From?"
            styles={{
              container: {
                flex: 0,
                width: "90%",
                shadowColor: "#000",
                zIndex: 50,
              },
              textInput: {
                fontSize: 18,
                height: 55,
                paddingHorizontal: 25,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
                zIndex: 50,
              },
            }}
            onPress={(data, details = null) => {
              console.log(data, details);
              dispatch(
                setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              dispatch(setDestination(null));
            }}
            fetchDetails={true}
            returnKeyType={"search"}
            enablePoweredByContainer={false}
            minLength={2}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={100}
            query={{
              key: GOOGLE_API_KEY,
              language: "en",
            }}
          />
        </View>
        <View style={tw`h-full`}>
          <Map />
        </View>
        <View
          style={tw`absolute bottom-7 right-7 z-50 justify-between flex-row p-3 bg-white items-center rounded-full shadow`}
        >
          <TouchableOpacity>
            <Icon name="locate" type="ionicon" color="red" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchContainer: {
    position: "absolute",
    top: 110,
    zIndex: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
