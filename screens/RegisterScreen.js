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
  Platform,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { cleanCart } from '../redux/cartReducer';

const ios = Platform.OS == 'ios';
const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [hidden, setHidden] = useState(true);
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    // send a POST  request to the backend API to register the user
    axios
      .post('https://ecommerce-app-5l1q.onrender.com/register', user)
      .then((response) => {
        Alert.alert(
          'Registration successful',
          'You have been registered Successfully'
        );
        setName('');
        setEmail('');
        setPassword('');
        dispatch(cleanCart());
      })
      .catch((error) => {
        Alert.alert(
          'Registration Error',
          'An error occurred while registering'
        );
        console.log('registration failed', error);
      });
  };

  return (
    <SafeAreaView className="flex flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <KeyboardAvoidingView behavior="padding">
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
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
              Register your account
            </Text>
          </View>

          <View className="mt-16 px-5 pt-8">
            <View className="form space-y-2">
              <Text className="text-gray-700 ml-1 font-semibold text-base">
                Name
              </Text>
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                autoCapitalize={false}
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                style={{ fontSize: 16 }}
                placeholder="Enter your name"
              />
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
                  <Feather
                    onPress={() => setHidden(!hidden)}
                    suppressHighlighting
                    name="eye-off"
                    size={24}
                    color="gray"
                  />
                ) : (
                  <Feather
                    onPress={() => setHidden(!hidden)}
                    suppressHighlighting
                    name="eye"
                    size={24}
                    color="black"
                  />
                )}
              </View>
            </View>

            <TouchableOpacity
              onPress={handleRegister}
              className="py-3 rounded-xl bg-[#FF9900] mt-5"
            >
              <Text className="text-neutral-800 font-bold font-xl text-center">
                Register
              </Text>
            </TouchableOpacity>
            <View className="flex-row gap-1 items-end mt-2 justify-center">
              <Text className="text-gray-500 font-bold">
                Already have an account?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                className="text-gray-500 font-bold"
              >
                <Text className="text-blue-500 font-bold">Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
