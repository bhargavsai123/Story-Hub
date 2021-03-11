import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import firebase from "firebase";
import db from "../config";

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      contact: "",
      address: "",
      confirmPassword: "",
      isModalVisible: false,
    };
  }
  signup = (email, password, confirmPassword) => {
    if (password != confirmPassword) {
      Alert.alert("Password does not Match");
    } else {
      if (
        this.state.firstName === "" ||
        this.state.lastName === "" ||
        this.state.contact === "" ||
        this.state.address === ""
      ) {
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            db.collection("users").add({
              email_id: this.state.email.toLowerCase(),
              first_name: this.state.firstName,
              last_name: this.state.lastName,
              contact_info: this.state.contact,
              address_a: this.state.address,
            });
            return Alert.alert("User Added Sucessfully", "", [
              {
                text: "Ok",
                onPress: this.setState({ isModalVisible: false }),
              },
            ]);
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage);
          });
      }
    }
  };
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
      >
        <Text style={styles.mainText}>Sign Up</Text>
        <TextInput
          placeholder={"First Name"}
          onChangeText={(text) => {
            this.setState({ firstName: text });
          }}
          style={styles.input}
        />
        <TextInput
          placeholder={"Last Name"}
          onChangeText={(text) => {
            this.setState({ lastName: text });
          }}
          style={styles.input}
        />
        <TextInput
          placeholder={"Contact"}
          onChangeText={(text) => {
            this.setState({ contact: text });
          }}
          keyboardType={"number-pad"}
          style={styles.input}
        />
        <TextInput
          placeholder={"Address"}
          onChangeText={(text) => {
            this.setState({ address: text });
          }}
          style={[styles.input, { height: 60 }]}
          multiline={true}
        />
        <TextInput
          placeholder={"Email ID"}
          onChangeText={(text) => {
            this.setState({ email: text });
          }}
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          placeholder={"Password"}
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
          secureTextEntry={true}
          style={styles.input}
        />
        <TextInput
          placeholder={"Confirm Password"}
          onChangeText={(text) => {
            this.setState({ confirmPassword: text });
          }}
          secureTextEntry={true}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            this.signup(
              this.state.email,
              this.state.password,
              this.state.confirmPassword
            )
          }
        >
          <Text
            style={{
              ...styles.buttonText,
              color: "#6fb388",
              alignSelf: "center",
              fontSize: 18,
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ margin: 15, alignSelf: "center" }}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={{ fontSize: 16, color: "#708090" }}>
            Already have an account?
            <Text
              style={{ fontSize: 16, color: "#6fb388", fontWeight: "bold" }}
            >
              {" "}
              Login
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
    fontSize: 30,
    color: "#405060",
    fontWeight: "bold",
    marginTop: "15%",
    marginBottom: "5%",
    alignSelf: "center",
  },
  subText: {
    fontSize: 18,
    marginBottom: 15,
  },
  button: {
    width: "80%",
    elevation: 8,
    alignSelf: "center",
    backgroundColor: "#c2edce",
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
