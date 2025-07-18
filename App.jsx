import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import IndexScreen from './screens/IndexScreen';
import EmployeesScreen from './screens/EmployeesScreen';
import AddDetailsScreen from './screens/AddDetailsScreen';
import MarkAttendanceScreen from './screens/MarkAttendanceScreen';
import SummaryScreen from './screens/SummaryScreen';
import UserScreen from './screens/UserScreen';
import LogoutScreen from './screens/LogoutScreen'; 

const Stack = createNativeStackNavigator();

export default function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem('token');
      if (savedToken) {
        setToken(savedToken);
      }
      setLoading(false);
    };
    loadToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {loading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : token ? (
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} setToken={setToken} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen name="Register">
              {(props) => <RegisterScreen {...props} setToken={setToken} />}
            </Stack.Screen>
          </>
        )}

        <Stack.Screen name="Index" component={IndexScreen} />
        <Stack.Screen name="Employees" component={EmployeesScreen} />
        <Stack.Screen name="AddDetails" component={AddDetailsScreen} />
        <Stack.Screen name="MarkAttendance" component={MarkAttendanceScreen} />
        <Stack.Screen name="Summary" component={SummaryScreen} />
        <Stack.Screen name="UserScreen" component={UserScreen} />


        <Stack.Screen name="LogoutScreen" component={LogoutScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
