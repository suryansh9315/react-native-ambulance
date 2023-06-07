import { Icon } from "@rneui/themed";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Ghaziabad, UP",
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destination: "Cannaught Palace, Delhi",
  },
];

const NavFavourites = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}

      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
      )}
      renderItem={({ item }) => (
        <TouchableOpacity style={tw`flex-row items-center px-5 py-3`}>
          <Icon
            style={tw`mr-4 rounded-full p-3 bg-gray-300`}
            name={item.icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{item.location}</Text>
            <Text style={tw`text-gray-500`}>{item.destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavourites;

const styles = StyleSheet.create({});
