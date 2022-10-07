import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { TailwindProvider } from "tailwind-rn";
import CustomerScreen from "./screens/CustomerScreen";
import utilities from "./tailwind.json";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigator/RootNavigator";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

// const client = new ApolloClient({
//   uri: "http://localhost:5001/api/whopping-clownfish",
//   cache: new InMemoryCache(),
// });
const client = new ApolloClient({
  link: createHttpLink({
    credentials: "same-origin",
    headers: {
      Authorization: `Apikey marlin::stepzen.net+1000::900661da72c6bf5919d00e864148f6dd49c33418405043b606494fe7f2c8d424`,
    },
    uri: "https://marlin.stepzen.net/api/whopping-clownfish/__graphql",
  }),
  cache: new InMemoryCache(),
});
export default function App() {
  return (
    // @ts-ignore
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
}
