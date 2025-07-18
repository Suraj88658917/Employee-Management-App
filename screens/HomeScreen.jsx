import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
  StatusBar,
  Button,
  Alert,
  Image,
  Text, 
} from 'react-native';
import IndexScreen from './IndexScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation, setToken }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      Alert.alert('Success', 'You have been logged out.', [
        {
          text: 'OK',
          onPress: () => {
            setToken(null); 
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to log out. Please try again.');
      console.error('Logout error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="#527cefff" />
      <View style={styles.view} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <IndexScreen />
        
        <Image
          source={require('../assets/images/image34.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.text}>Are you sure you want to logout?</Text>

        <View style={styles.logoutButton}>
          <Button title="Logout" color="#d9534f" onPress={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  view: {
    width: '100%',
    height: 50,
    backgroundColor: '#527cefff',
  },
  scrollContent: {
    paddingBottom: 20,
    alignItems: 'center', 
  },
  image: {
    width: 80,
    height: 80,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 15,
    color: '#333',
  },
  logoutButton: {
    width: '60%',
    marginTop: 10,
    borderRadius:10,
  },
});
