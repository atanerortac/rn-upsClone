import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  FlatList,
} from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
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
import useCustomerOrders from "../hooks/useCustomerOrders";
import DeliveryCard from "../components/DeliveryCard";

type ModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootStackParamList, "MyModal">
>;
type ModalScreenRootProp = RouteProp<RootStackParamList, "MyModal">;
const ModalScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation<ModalScreenNavigationProp>();
  const {
    params: { name, userId },
  } = useRoute<ModalScreenRootProp>();

  const { loading, error, orders } = useCustomerOrders(userId);
  return (
    <View style={safeAreaStyle}>
      <TouchableOpacity
        onPress={navigation.goBack}
        style={tailwind(
          `absolute right-5${
            Platform.OS === "android" ? " top-8" : " top-5"
          } z-10`
        )}
      >
        <Icon name="closecircle" type="antdesign" />
      </TouchableOpacity>
      <View style={{ marginTop: 10 }}>
        <View style={[tailwind("py-5 border-b"), { borderColor: "#59C1CC" }]}>
          <Text
            style={[
              tailwind("text-center text-xl font-bold"),
              { color: "#59C1CC" },
            ]}
          >
            {name}
          </Text>
          <Text style={[tailwind("text-center italic text-sm")]}>
            Deliveries
          </Text>
        </View>
      </View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 200 }}
        data={orders}
        keyExtractor={(order) => order.trackingId}
        renderItem={({ item: order }) => <DeliveryCard order={order} />}
      />
    </View>
  );
};

export default ModalScreen;
const safeAreaStyle: any = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? 10 : 0,
  },
});
