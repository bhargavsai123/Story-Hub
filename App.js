/** @format */

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	ScrollView,
	ToastAndroid,
	View,
	Alert,
	Modal,
} from 'react-native';
import { FAB } from 'react-native-paper';
import db from './config';
import firebase from 'firebase';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			title: '',
			author: '',
			story: '',
			isModalVisible: false,
		};
	}
	publish = (t, a, s) => {
		if (t == '' || a == '' || s == '') {
			this.setState({
				title: '',
				author: '',
				story: '',
				isModalVisible: false,
			});
			return ToastAndroid.show('Please Write a Story', ToastAndroid.LONG);
		} else {
			db.collection('stories').add({
				title: t,
				author: a,
				story: s,
			});
			this.setState({
				title: '',
				author: '',
				story: '',
			});
			return ToastAndroid.show('Story Published', ToastAndroid.LONG);
		}
	};
	showModal = () => {
		return (
			<Modal
				visible={this.state.isModalVisible}
				transparent={true}
				animationType={'slide'}>
				<KeyboardAvoidingView style={styles.modal}>
					<ScrollView>
						<Text style={styles.title}>Write A Story</Text>
						<View style={styles.line}></View>
						<TextInput
							placeholder='Story Title'
							placeholderTextColor='#6fb388'
							style={styles.input}
							onChangeText={(text) => {
								this.setState({ title: text });
							}}
						/>
						<TextInput
							placeholder='Author'
							placeholderTextColor='#6fb388'
							style={styles.input}
							onChangeText={(text) => {
								this.setState({ author: text });
							}}
						/>
						<TextInput
							placeholder='Write Your Story'
							placeholderTextColor='#6fb388'
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
							}}>
							<Text style={{ color: '#6fb388' }}>Publish</Text>
						</TouchableOpacity>
						<TouchableOpacity>
							<Text
								style={{
									color: '#6fb388',
									alignSelf: 'center',
									marginTop: -10,
									marginBottom: 20,
									textDecorationLine: 'underline',
								}}
								onPress={() => {
									this.setState({ isModalVisible: false });
								}}>
								✖ Cancel ✖
							</Text>
						</TouchableOpacity>
					</ScrollView>
				</KeyboardAvoidingView>
			</Modal>
		);
	};
	render() {
		return (
			<View style={styles.container}>
				{this.showModal()}
				<Text>Click the Button to Write a Story</Text>
				<FAB
					style={styles.fab}
					label={'Write A Story'}
					icon='plus'
					onPress={() => {
						this.setState({ isModalVisible: true });
					}}
					color='#6fb388'
				/>
				<StatusBar style='auto' />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f6f6f2',
		alignItems: 'center',
		justifyContent: 'center',
	},
	line: {
		backgroundColor: '#6fb388',
		height: 2,
		width: '100%',
		alignSelf: 'center',
	},
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
		backgroundColor: '#c2edce',
	},
	modal: {
		backgroundColor: '#c2edce',
		marginVertical: 40,
		width: '90%',
		alignSelf: 'center',
		borderRadius: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 8,
			height: 8,
		},
		shadowOpacity: 0.3,
		shadowRadius: 10.32,
		elevation: 20,
	},
	title: {
		color: '#6fb388',
		fontSize: 25,
		margin: 10,
		marginTop: 15,
		marginBottom: 15,
		alignSelf: 'center',
	},
	input: {
		width: '90%',
		height: 40,
		fontSize: 20,
		borderRadius: 20,
		paddingLeft: 10,
		margin: 10,
		marginTop: 15,
		backgroundColor: '#f6f6f2',
		color: '#6fb388',
		alignSelf: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 8,
			height: 8,
		},
		shadowOpacity: 0.3,
		shadowRadius: 10.32,
		elevation: 4,
	},
	button: {
		width: '90%',
		height: 40,
		fontSize: 20,
		borderRadius: 20,
		margin: 10,
		marginBottom: 30,
		backgroundColor: '#c2edce',
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 8,
			height: 8,
		},
		shadowOpacity: 0.3,
		shadowRadius: 10.32,
		elevation: 4,
	},
});
