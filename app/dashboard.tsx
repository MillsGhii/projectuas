import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid, TouchableOpacity, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Dashboard() {
    const [userData, setUserData] = useState({ name: '', email: '' });
    const router = useRouter();

    const movies = [
        { id: '1', title: 'Red Dead Redemption 2', year: '2018', poster: 'https://via.placeholder.com/150' },
        { id: '2', title: 'The Last Of Us', year: '2013', poster: 'https://via.placeholder.com/150' },
        { id: '3', title: 'Silent Hill 2', year: '2001', poster: 'https://via.placeholder.com/150' },
    ];

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const storedEmail = await AsyncStorage.getItem('userEmail');

                if (!token || !storedEmail) {
                    ToastAndroid.show('User data not found', ToastAndroid.SHORT);
                    return;
                }
                const name = await AsyncStorage.getItem('userName');
                setUserData({
                    name: name || '',
                    email: storedEmail,
                });

            } catch (err) {
                console.log('Error fetching user data:', err);
                ToastAndroid.show('Failed to fetch user data', ToastAndroid.SHORT);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.clear();
            ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT);
            router.replace('/signin');
        } catch (err) {
            console.log('Error during logout:', err);
            ToastAndroid.show('Failed to logout', ToastAndroid.SHORT);
        }
    };

    const renderMovie = ({ item }) => (
        <View style={styles.videogamesItem}>
            <Image source={{ uri: item.poster }} style={styles.videogamesPoster} />
            <View style={styles.videogamesDetails}>
                <Text style={styles.videogamesTitle}>{item.title}</Text>
                <Text style={styles.videogamesYear}>{item.year}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
            <Text style={styles.welcomeText}>Welcome, {userData.name}!</Text>
            <Text style={styles.emailText}>Email: {userData.email}</Text>
            <Text style={styles.heading}>Best Videogames of All Time</Text>

            <FlatList
                data={movies}
                renderItem={renderMovie}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.videogamesList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    welcomeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1B243C',
        position: 'absolute',
        top: 30,
        left: 20,
    },
    emailText: {
        fontSize: 14,
        color: '#4B5368',
        position: 'absolute',
        top: 50,
        left: 20,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1B243C',
        textAlign: 'center',
        marginTop: 100,
    },
    logoutButton: {
        position: 'absolute',
        top: 30,
        right: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#FF4D4D',
        borderRadius: 8,
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    videogamesList: {
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    videogamesItem: {
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        overflow: 'hidden',
    },
    videogamesPoster: {
        width: 80,
        height: 120,
    },
    videogamesDetails: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    videogamesTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1B243C',
    },
    videogamesYear: {
        fontSize: 14,
        color: '#4B5368',
        marginTop: 4,
    },
});
