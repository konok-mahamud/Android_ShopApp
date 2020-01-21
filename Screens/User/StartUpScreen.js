import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, AsyncStorage, Text, StyleSheet, } from 'react-native';

import { useDispatch } from 'react-redux';
import * as AuthActions from '../../Store/actions/Auth';
import Colors from '../../Constant/Colors';

const StartUpScreen = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userDATA');

            if (!userData) {

                props.navigation.navigate('Authenticator');
                return;
            }
            const TransformData = JSON.parse(userData);
            const { token, userid, expiryDate } = TransformData;
            const expirationDate = new Date(expiryDate);
            if (expirationDate <= new Date() || !token || !userid) {
                props.navigation.navigate('Authenticator');
                return;
            };
           const expirationTime=expirationDate-new Date().getTime();
            props.navigation.navigate("mainDashBoard");
            dispatch(AuthActions.authenticate(token, userid,expirationTime));
        };
        tryLogin();
    }, [dispatch]);
    return (
        <View style={styles.screen} >
            <ActivityIndicator size='large' color={Colors.primary} />
           
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default StartUpScreen;