import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidden, setHidden] = useState(true)

  const navigation = useNavigation();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          navigation.replace("Main");
        }
      } catch (err) {
        console.log("error message", err);
      }
    };
    checkLoginStatus();
  }, []);


  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      // .post(`http://localhost:8000/login`, user)
      .post(`https://ecommerce-app-5l1q.onrender.com/login`, user)
      .then((response) => {
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        navigation.replace("Main");
      })
      .catch((error) => {
        console.log(error)
        Alert.alert("Login Error", error.response?.data?.message);
      });
  };

  return (
    <SafeAreaView className="flex flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <KeyboardAvoidingView behavior='padding'>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false} contentContainerStyle={{paddingBottom: 20}}>
          <View className="flex items-center">
            <Image
              style={{ width: 150, height: 100 }}
              source={{
                uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png',
              }}
            />
          </View>

          <View className="items-center">
            <Text className="text-base font-bold mt-3 text-[#041E42]">
              Login In to your account
            </Text>
          </View>

          <View className="mt-16 px-5 pt-8">
            <View className="form space-y-2">
              <Text className="text-gray-700 ml-1 font-semibold text-base">
                Email Address
              </Text>
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                autoCapitalize={false}
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                style={{ fontSize: 16 }}
                placeholder="Enter email"
              />
              <Text className="text-gray-700 ml-1 font-semibold text-base">
                Password
              </Text>
              <View className="flex-row justify-between items-center p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3">
                <TextInput
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  autoCapitalize={false}
                  style={{ fontSize: 16 }}
                  placeholder="Enter password"
                  secureTextEntry={hidden}
                  width={'90%'}
                />
                {hidden ? (
                  <Feather onPress={()=>setHidden(!hidden)} suppressHighlighting name="eye-off" size={24} color="gray" />
                ) : (
                  <Feather onPress={()=>setHidden(!hidden)} suppressHighlighting name="eye" size={24} color="black" />
                )}
              </View>
              <View className="flex-row justify-between items-center mb-10">
                <Text className="text-neutral-500">Keep me logged in</Text>
                <TouchableOpacity>
                  <Text className="text-blue-500">Forgot password?</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={handleLogin} className="py-3 rounded-xl bg-[#FF9900]">
              <Text className="text-neutral-800 font-bold font-xl text-center">
                Login
              </Text>
            </TouchableOpacity>
            <View className="flex-row gap-1 items-end mt-2 justify-center">
              <Text className="text-gray-500 font-bold">
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                className="text-gray-500 font-bold"
              >
                <Text className="text-blue-500 font-bold">Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
