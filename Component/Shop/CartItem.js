import React from 'react';
import {
    View, Text, Image, StyleSheet, Button,
    TouchableOpacity, TouchableNativeFeedback,Platform
} from 'react-native';
import Colors from '../../Constant/Colors';
import Fonts from '../../Constant/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
const CartItem=props=>{
return(
    <View style={styles.cartItem}>
    <View style={styles.ItemData}>
        <Text style={styles.quantity}>{props.quantity}</Text>
        <Text style={styles.mainTxt}>{props.title}</Text>
    </View>
    <View style={styles.ItemData}>
        <Text style={styles.mainTxt}>{props.amount}</Text>
       { props.Deltable && <TouchableOpacity style={styles.deltButton}>
        <Ionicons name={'md-trash'} size={26} onPress={props.onSelect} color={'red'} />
        </TouchableOpacity>
        }
    </View>
</View>
)
}

const styles=StyleSheet.create({
    cartItem:{
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',
        marginHorizontal:10,
    },
    ItemData:{
        flexDirection:'row',
        alignItems:'center',
    },
    quantity:{
        fontFamily:Fonts.primary,
        fontSize:16,
        color:"#888",
    },
    mainTxt:{
        fontFamily:Fonts.primary_bold,
        fontSize:17,
    },
    deltButton:{
        marginLeft:15,  

    }
});
export default CartItem;