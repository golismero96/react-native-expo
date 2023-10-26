import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, Button, TextInput, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => <Button title="Info" />,
        }}
      >
        <Stack.Screen name="Home" options={{ title: "Overview" }}>
          {(props) => <HomeScreen {...props} extraData={"someData"} />}
        </Stack.Screen>
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: "My home",
            headerStyle: {
              backgroundColor: "#F4D41E",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="SecondScreen"
          options={{ title: "SecondScreens" }}
          component={SecondScreen}
          initialParams={{ itemId: 42 }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};
const LogoTitle = (props: any) => {
  return (
    <View>
      <Image
        style={{ width: 50, height: 50 }}
        source={require("./assets/favicon.png")}
      />
      {props.options}
    </View>
  );
};

const HomeScreen = (props: any) => {
  const [postText, setPostText] = React.useState("");
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Text>{props?.extraData}</Text>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: "white" }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Go to Details"
        onPress={() => props.navigation.navigate("Details")}
      />

      <Button
        title="Go to SecondScreen"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          props.navigation.navigate("SecondScreen", {
            itemId: postText !== "" ? postText : 86,
            otherParam: "anything you want here",
          });
        }}
      />
    </View>
  );
};
const SecondScreen = (props: any) => {
  const { itemId, otherParam } = props.route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Home"
        onPress={() => props.navigation.navigate("Home")}
      />
      <Button title="Go back" onPress={() => props.navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => props.navigation.popToTop()}
      />
    </View>
  );
};

const DetailsScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push("Details")}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />

      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="SecondScreen" component={SecondScreen} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
