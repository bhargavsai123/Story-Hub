/** @format */

import { StatusBar } from "expo-status-bar";
import { filter } from "lodash";
import React from "react";
import { FlatList } from "react-native";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  SafeAreaView,
  View,
  Alert,
  Modal,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { FAB } from "react-native-paper";
import db from "./config";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      author: "",
      story: "",
      search: "",
      allStories: [],
      dataSource: [],
      isModalVisible: false,
    };
  }
  publish = (t, a, s) => {
    if (t == "" || a == "" || s == "") {
      this.setState({
        title: "",
        author: "",
        story: "",
        isModalVisible: false,
      });
      return Alert.alert("Please Write a Story");
    } else {
      db.collection("stories")
        .add({
          title: t,
          author: a,
          story: s,
        })
        .then(console.log(t, a, s));
      this.setState({
        title: "",
        author: "",
        story: "",
      });
      return Alert.alert("Story Published");
    }
  };
  showModal = () => {
    return (
      <Modal
        visible={this.state.isModalVisible}
        transparent={true}
        animationType={"slide"}
      >
        <KeyboardAvoidingView style={styles.modal}>
          <ScrollView>
            <Text style={styles.title}>Write A Story</Text>
            <View style={styles.line}></View>
            <TextInput
              placeholder="Story Title"
              placeholderTextColor="#6fb388"
              style={styles.input}
              onChangeText={(text) => {
                this.setState({ title: text });
              }}
            />
            <TextInput
              placeholder="Author"
              placeholderTextColor="#6fb388"
              style={styles.input}
              onChangeText={(text) => {
                this.setState({ author: text });
              }}
            />
            <TextInput
              placeholder="Write Your Story"
              placeholderTextColor="#6fb388"
              multiline={true}
              style={[styles.input, { height: 280 }]}
              onChangeText={(text) => {
                this.setState({ story: text });
              }}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.publish(
                  this.state.title,
                  this.state.author,
                  this.state.story
                ),
                  this.setState({ isModalVisible: false });
              }}
            >
              <Text style={{ color: "#6fb388" }}>Publish</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  color: "#6fb388",
                  alignSelf: "center",
                  marginTop: -10,
                  marginBottom: 20,
                  textDecorationLine: "underline",
                }}
                onPress={() => {
                  this.setState({ isModalVisible: false });
                }}
              >
                ✖ Cancel ✖
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    );
  };
  searchBooks = (search) => {
    let filteredData = this.state.allStories.filter(function (item) {
      return item.title.includes(search);
    });

    this.setState({ dataSource: filteredData });
  };
  componentDidMount = async () => {
    const query = await db.collection("stories").get();
    query.docs.map((doc) => {
      this.setState({
        allStories: [...this.state.allStories, doc.data()],
      });
    });
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.showModal()}
        <View style={{ minWidth: Dimensions.get("screen").width }}>
          <SearchBar
            placeholder="Search"
            value={this.state.search}
            onChangeText={() => {
              this.searchBooks(this.state.search);
            }}
            lightTheme
          />
          <FlatList
            data={this.state.allStories}
            renderItem={({ item }) => (
              <View
                style={{
                  borderWidth: 1,
                  margin: 10,
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <Text>{"Title: " + item.title}</Text>
                <Text>{"Author: " + item.author}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this.fetchMoreStories}
            onEndReachedThreshold={0.7}
          />
        </View>
        <FAB
          style={styles.fab}
          label={"Write A Story"}
          icon="plus"
          onPress={() => {
            this.setState({ isModalVisible: true });
          }}
          color="#6fb388"
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f2",
    alignItems: "center",
  },
  line: {
    backgroundColor: "#6fb388",
    height: 2,
    width: "100%",
    alignSelf: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    marginBottom: 32,
    right: 0,
    bottom: 0,
    backgroundColor: "#c2edce",
  },
  modal: {
    backgroundColor: "#c2edce",
    marginVertical: 40,
    width: "90%",
    alignSelf: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 20,
  },
  title: {
    color: "#6fb388",
    fontSize: 25,
    margin: 10,
    marginTop: 15,
    marginBottom: 15,
    alignSelf: "center",
  },
  input: {
    width: "90%",
    height: 40,
    fontSize: 20,
    borderRadius: 20,
    paddingLeft: 10,
    margin: 10,
    marginTop: 15,
    backgroundColor: "#f6f6f2",
    color: "#6fb388",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 4,
  },
  button: {
    width: "90%",
    height: 40,
    fontSize: 20,
    borderRadius: 20,
    margin: 10,
    marginBottom: 30,
    backgroundColor: "#c2edce",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 4,
  },
});
