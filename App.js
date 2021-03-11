import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Main from "./screens/Main";
import SignUp from "./screens/Signup";
import Login from "./screens/Login";

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const switchNavigator = createStackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: {
        header: null,
      },
    },
    Signup: {
      screen: SignUp,
      navigationOptions: {
        header: null,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: "Login",
  }
);

const AppContainer = createAppContainer(switchNavigator);
