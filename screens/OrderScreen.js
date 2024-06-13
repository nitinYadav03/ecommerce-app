import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const OrderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Main');
    }, 2000);
  }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ImageBackground
        source={require('../assets/order.gif')}
        style={{ height: 400, width: 400 }}
        resizeMode="contain"
      />
      <Text
        style={{
          marginTop: 20,
          fontSize: 19,
          fontWeight: '600',
          textAlign: 'center',
        }}
      >
        Your Order Has been Recieved
      </Text>
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
