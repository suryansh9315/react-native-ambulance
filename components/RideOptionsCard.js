import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import tw from "twrnc";
import { selectTravelTimeInformation } from "../slices/navSlices";

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    image: "https://links.papareact.com/3pn",
    multiplier: 1,
  },
  {
    id: "Uber-XL-456",
    title: "UberXL",
    image: "https://links.papareact.com/5w8",
    multiplier: 1.2,
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    image: "https://links.papareact.com/7pf",
    multiplier: 1.5,
  },
];

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const timeTravelInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          style={tw`absolute top-2 left-5 z-50 p-3 rounded-full`}
          onPress={() => navigation.navigate("NavigateCard")}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-4 text-xl`}>
          Select a Ride - {timeTravelInformation?.distance?.text}
        </Text>
      </View>
      <View style={tw``}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`flex-row justify-between items-center px-10 ${
                item.id === selected?.id ? "bg-gray-200" : ""
              }`}
              onPress={() => setSelected(item)}
            >
              <Image
                style={{ height: 100, width: 100, resizeMode: "contain" }}
                source={{ uri: item.image }}
              />
              <View style={tw`-ml-6`}>
                <Text style={tw`text-lg font-semibold`}>{item.title}</Text>
                <Text>{timeTravelInformation?.duration?.text}</Text>
              </View>
              <Text style={tw`text-lg`}>
                {new Intl.NumberFormat("en-gb", {
                  style: "currency",
                  currency: "GBP",
                }).format(
                  (timeTravelInformation?.duration?.value * item.multiplier) /
                    100
                )}
              </Text>
            </TouchableOpacity>
          )}
        />
        <View>
          <TouchableOpacity
            style={tw`py-3 m-3 bg-black ${selected ? "" : "bg-gray-300"}`}
            disabled={!selected}
          >
            <Text style={tw`text-center text-xl text-white`}>
              Choose {selected?.title}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
