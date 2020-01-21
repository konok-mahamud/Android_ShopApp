import React from 'react';
import {
    View, Text, Image, StyleSheet, Button,
    TouchableOpacity, TouchableNativeFeedback,Platform
} from 'react-native';

import Fonts from '../../Constant/Fonts';
const ProductItem = props => {
    let TouchOpa=TouchableOpacity;
    if(Platform.OS==='android' && Platform.Version>=21){
        TouchOpa=TouchableNativeFeedback;
    }
    return (
       
            <View style={styles.product}>
                
                 <TouchOpa onPress={props.onViewDetails} useForeground> 
                 <View>
                <View style={styles.imageContainer} >
                    <Image style={styles.image} source={{ uri: props.image }} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}> ${props.price.toFixed(2)}</Text>
                </View>
                <View style={styles.action}>
                   {props.children}
                </View>
                </View>
                </TouchOpa>
                
            </View>
       
    )

};

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOffset: 0.26,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        overflow:'hidden',
        shadowRadius: 8,
        borderColor: 'gray',
        borderRadius: 8,
        backgroundColor: 'white',
        height: 300,
        margin: 15,
    },
    details: {
        alignItems: 'center',
        height: '15%',
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',

    },
    title: {
        fontSize: 22,
        marginVertical: 5,
        fontFamily:Fonts.primary_bold,
    },
    price: {
        fontSize: 15,
        color: "#888",
        fontFamily:Fonts.primary,
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 15,
    },
});

export default ProductItem;