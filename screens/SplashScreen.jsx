import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000); // wait 2 seconds
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/image1.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Employee Management App</Text>
      <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
  },
});
