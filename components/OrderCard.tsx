import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Card, Icon } from "@rneui/themed";
import { useTailwind } from "tailwind-rn/dist";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Orders">,
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = {
  item: Order;
};

const OrderCard = ({ item }: Props) => {
  const tailwind = useTailwind();
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Order", { order: item })}
    >
      <Card containerStyle={tailwind("px-5 rounded-lg")}>
        <View style={tailwind("flex-row justify-between items-center")}>
          <View>
            <Icon
              name="truck-delivery"
              color={"#EB6A7C"}
              type="material-community"
            />
            <Text style={{ fontSize: 10 }}>
              {new Date(item.createdAt).toDateString()}
            </Text>
          </View>
          <View>
            <Text style={[tailwind("text-gray-400 "), { fontSize: 10 }]}>
              {item.carrier}-{item.trackingId}
            </Text>
            <Text style={tailwind("text-gray-500 text-xl")}>
              {item.trackingItems.customer.name}
            </Text>
          </View>
          <View style={tailwind("flex-row items-center")}>
            <Text style={[tailwind("text-sm"), { color: " #EB6A7C" }]}>
              {item.trackingItems.items.length}
            </Text>
            <Icon style={tailwind("ml-2")} name="box" type="feather" />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderCard;
