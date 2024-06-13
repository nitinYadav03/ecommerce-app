import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { UserType } from '../UserContext';

const AddressScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const { userId, setUserId } = useContext(UserType);
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      // if(!token) navigation.replace("Login")
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  console.log(userId);
  const handleAddAddress = () => {
    const address = {
      name,
      mobileNo,
      houseNo,
      street,
      landmark,
      postalCode,
    };

    axios
      .post('http://192.168.2.50:8000/addresses', { userId, address })
      .then((response) => {
        Alert.alert('Success', 'Addresses added successfully');
        setName('');
        setMobileNo('');
        setHouseNo('');
        setStreet('');
        setLandmark('');
        setPostalCode('');

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to add address');
        console.log('error', error);
      });
  };
  const ios = Platform.OS === 'ios';
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#8eddda',
        marginBottom: ios ? -35 : 0,
        paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <KeyboardAvoidingView
        style={{ backgroundColor: 'white' }}
        behavior="padding"
      >
        <ScrollView style={{ backgroundColor: 'white' }} bounces={false}>
          {/* <View style={{ height: 50, backgroundColor: '#8eddda' }} /> */}

          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
              Add a new Address
            </Text>

            <TextInput
              placeholderTextColor={'black'}
              placeholder="India"
              style={{
                padding: 10,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
            />

            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                Full name (First and last name)
              </Text>

              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                placeholderTextColor={'black'}
                style={{
                  padding: 10,
                  borderColor: '#D0D0D0',
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
                placeholder="enter your name"
              />
            </View>

            <View>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                Mobile numebr
              </Text>

              <TextInput
                value={mobileNo}
                onChangeText={(text) => setMobileNo(text)}
                placeholderTextColor={'black'}
                style={{
                  padding: 10,
                  borderColor: '#D0D0D0',
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
                placeholder="Mobile No"
              />
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                Flat,House No,Building,Company
              </Text>

              <TextInput
                value={houseNo}
                onChangeText={(text) => setHouseNo(text)}
                placeholderTextColor={'black'}
                style={{
                  padding: 10,
                  borderColor: '#D0D0D0',
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
                placeholder=""
              />
            </View>

            <View>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                Area,Street,sector,village
              </Text>
              <TextInput
                value={street}
                onChangeText={(text) => setStreet(text)}
                placeholderTextColor={'black'}
                style={{
                  padding: 10,
                  borderColor: '#D0D0D0',
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
                placeholder=""
              />
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Landmark</Text>
              <TextInput
                value={landmark}
                onChangeText={(text) => setLandmark(text)}
                placeholderTextColor={'black'}
                style={{
                  padding: 10,
                  borderColor: '#D0D0D0',
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
                placeholder="Eg near appollo hospital"
              />
            </View>

            <View>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Pincode</Text>

              <TextInput
                value={postalCode}
                onChangeText={(text) => setPostalCode(text)}
                placeholderTextColor={'black'}
                style={{
                  padding: 10,
                  borderColor: '#D0D0D0',
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
                placeholder="Enter Pincode"
              />
            </View>

            <Pressable
              onPress={handleAddAddress}
              style={{
                backgroundColor: '#FFC72C',
                padding: 19,
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>Add Address</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
