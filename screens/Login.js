import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from "react-native";
import firebase from "firebase";
import db from "../config";

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
    };
  }
  login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return this.props.navigation.navigate("Main");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
      >
        <Text style={styles.mainText}>Story Hub</Text>
        <TextInput
          style={styles.input}
          placeholder="Email ID"
          placeholderTextColor="#999999"
          keyboardType="email-address"
          onChangeText={(text) => {
            this.setState({ emailId: text });
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999999"
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.login(this.state.emailId, this.state.password)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ margin: 15 }}
          onPress={() => this.props.navigation.navigate("Signup")}
        >
          <Text style={{ fontSize: 16, color: "#708090" }}>
            Don't have an account?
            <Text
              style={{ fontSize: 16, color: "#6fb388", fontWeight: "bold" }}
            >
              {" "}
              Sign Up
            </Text>
          </Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e2e8ee",
  },
  mainLogo: {
    width: 200,
    height: 200,
  },
  mainText: {
    fontSize: 48,
    marginBottom: 5,
    fontWeight: "500",
    alignSelf: "center",
  },
  subText: {
    fontSize: 18,
    marginBottom: 15,
  },
  button: {
    width: "80%",
    elevation: 8,
    backgroundColor: "#c3ecd0",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 15,
    shadowColor: "#90ba9b",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 18,
    color: "#6fb388",
    fontWeight: "bold",
    alignSelf: "center",
  },
  input: {
    width: "80%",
    height: 40,
    fontSize: 20,
    borderRadius: 5,
    paddingLeft: 10,
    margin: 10,
    backgroundColor: "#fffafa",
    color: "#999999",
    alignSelf: "center",
    shadowColor: "#b0c4de",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 8,
  },
});
