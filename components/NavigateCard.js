import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "@env";
import { selectDestination, setDestination } from "../slices/navSlices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";
import { Icon } from "@rneui/themed";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const destination = useSelector(selectDestination);

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`py-4 text-center text-xl`}>NavigateCard</Text>
      <View style={tw`border-t border-gray-100 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where To?"
            styles={{
              container: {
                backgroundColor: "white",
                paddingTop: 20,
                flex: 0,
              },
              textInput: {
                fontSize: 18,
                borderRadius: 0,
                backgroundColor: "#DDDDDF",
              },
              textInputContainer: {
                paddingHorizontal: 20,
                paddingBottom: 0,
              },
            }}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }}
            fetchDetails={true}
            returnKeyType={"search"}
            enablePoweredByContainer={false}
            minLength={2}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            query={{
              key: GOOGLE_API_KEY,
              language: "en",
            }}
          />
        </View>
        <NavFavourites />
      </View>
      <View style={tw`flex-row justify-evenly bg-white mt-24`}>
        <TouchableOpacity
          style={tw`flex flex-row bg-black px-4 w-24 py-3 rounded-md justify-between items-center ${destination ? '' : 'opacity-70'}`}
          onPress={() => navigation.navigate('RideOptionsCard')}
          disabled={!destination}
        >
          <Icon name="car" type="font-awesome" size={16} color="white" />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row justify-between px-4 w-24 py-3 rounded-md items-center`}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            size={16}
            color="black"
          />
          <Text style={tw`text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const styles = StyleSheet.create({});
