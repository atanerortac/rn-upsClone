import {
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useTailwind } from "tailwind-rn";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { TabStackParamList } from "../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "../navigator/RootNavigator";
import { Image, Input } from "@rneui/themed";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "../graphql/queries";
import CustomerCard from "../components/CustomerCard";
import { SafeAreaView } from "react-native-safe-area-context";

export type CustomerScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Customers">,
  NativeStackNavigationProp<RootStackParamList>
>;

const CustomerScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation<CustomerScreenNavigationProp>();
  const [input, setInput] = useState<string>("");
  const { loading, error, data } = useQuery(GET_CUSTOMERS);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    // <SafeAreaView style={safeAreaStyle}>

    <ScrollView style={{ backgroundColor: "#59C1CC" }}>
      {/* <StatusBar
        barStyle="default"
        // dark-content, light-content and default

        backgroundColor="#59C1CC"
      /> */}
      <Image
        // prettier-ignore
        source={ require('../assets/uU8GTZM.jpeg')}
        // prettier-ignore
        // containerStyle={tailwind('w-full h-64')}
        style={{height:300,width:400}}
        PlaceholderContent={<ActivityIndicator />}
      />

      <Input
        value={input}
        onChangeText={setInput}
        placeholder="Search By Customer"
        containerStyle={tailwind("bg-white pt-5 pb-0 px-10")}
      />

      {data?.getCustomers
        ?.filter((customer: CustomerList) =>
          customer.value.name.includes(input)
        )
        .map(({ name: ID, value: { email, name } }: CustomerResponse) => (
          // <View style={}>

          <CustomerCard key={ID} email={email} name={name} userId={ID} />
          // </View>
        ))}
    </ScrollView>
    // </SafeAreaView>
  );
};

export default CustomerScreen;

const safeAreaStyle: any = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
