import { View, Text, Platform } from "react-native";
import React, { useLayoutEffect } from "react";
import { useTailwind } from "tailwind-rn/dist";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import DeliveryCard from "../components/DeliveryCard";
import { StatusBar } from "expo-status-bar";

export type OrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Orders">,
  NativeStackNavigationProp<RootStackParamList>
>;

type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">;

const OrderScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation<OrderScreenNavigationProp>();
  const {
    params: { order },
  } = useRoute<OrderScreenRouteProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order.trackingItems.customer.name,
      headerTintColor: "#EB6A7C",
      headerBackTitle: "Deliveries",
      headerTitleStyle: {
        color: "black",
      },
      title: "Aligned Center",
      headerTitleAlign: "center",
    });
  }, [order]);
  return (
    <View style={[tailwind("-mt-2"), { backgroundColor: "#EB6A7C" }]}>
      <StatusBar style="dark" />
      <DeliveryCard order={order} fullWidth></DeliveryCard>
    </View>
  );
};

export default OrderScreen;
