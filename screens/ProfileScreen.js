import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Platform,
  StatusBar,
} from 'react-native';
import React, { useLayoutEffect, useEffect, useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { UserType } from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: {
        backgroundColor: '#8eddda',
      },
      headerLeft: () => (
        <Image
          style={{
            width: 140,
            height: 120,
            resizeMode: 'contain',
          }}
          source={{
            uri: 'https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png',
          }}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            marginRight: 13,
          }}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color="black"
            style={{ marginRight: 10 }}
          />

          <AntDesign name="search1" size={24} color="black" />
        </View>
      ),
    });
  }, []);
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://192.168.2.50:8000/profile/${userId}`
        );
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchUserProfile();
  }, []);
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem('authToken');
    console.log('auth token cleared');
    navigation.replace('Login');
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://192.168.2.50:8000/orders/${userId}`
        );
        const orders = response.data.orders;
        setOrders(orders);

        setLoading(false);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchOrders();
  }, []);
  console.log('orders', orders);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        padding: 10,
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
        Welcome {user?.name}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginTop: 12,
        }}
      >
        <Pressable
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: 'center' }}>Your orders</Text>
        </Pressable>

        <Pressable
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: 'center' }}>Your Account</Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginTop: 12,
        }}
      >
        <Pressable
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: 'center' }}>Buy Again</Text>
        </Pressable>

        <Pressable
          onPress={logout}
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: 'center' }}>Logout</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <Text>Loading...</Text>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <Pressable
              style={{
                marginTop: 20,
                padding: 10,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#d0d0d0',
                // justifyContent: 'center',
                // alignItems: 'center',
              }}
              key={order._id}
            >
              {/* Render the order information here */}
              {order.products?.map((product) => (
                <View
                  style={{ marginVertical: 10, flexDirection: 'row', gap: 15 }}
                  key={product._id}
                >
                  <View>
                    <Image
                      source={{ uri: product.image }}
                      style={{ width: 100, height: 100, resizeMode: 'contain' }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        marginRight: 110,
                        fontSize: 14,
                        fontWeight: '600',
                        textAlign: 'justify',
                      }}
                    >
                      {product.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                      }}
                    >
                      Quantity:
                      <Text style={{ color: 'maroon', fontSize: 18 }}>
                        {' ' + product.quantity}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                      }}
                    >
                      Price: ₹
                      <Text style={{ color: 'darkgreen', fontSize: 18 }}>
                        {product.price}
                      </Text>
                    </Text>
                  </View>
                </View>
              ))}
            </Pressable>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
