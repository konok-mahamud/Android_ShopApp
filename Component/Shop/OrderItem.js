import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Colors from '../../Constant/Colors';
import CartItem from './CartItem';
import Fonts from '../../Constant/Fonts';


const OrderItem = props => {
    const [ShowDetails, SetShowdetails] = useState(false);
    return (
        <View style={styles.Orderitem}>
            <View style={styles.summary}>
                <Text style={styles.amount}>${props.totalamount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button style={styles.detailsBtn} title={ShowDetails ? "Hide Details" : "Show Details"} color={Colors.primary}
                onPress={() => {
                    SetShowdetails(prvDetails => !prvDetails);
                }}


            />
            {ShowDetails && (
                <View style={styles.detailItems}>
                    {props.items.map(cartItem => (
                        <CartItem
                            key={cartItem.productID}
                            quantity={cartItem.quantity}
                            amount={cartItem.Sum}
                            title={cartItem.productTitle}
                        />
                    ))}
                </View>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    Orderitem: {
        shadowColor: 'black',
        shadowOffset: 0.26,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        alignItems: 'center',
        shadowRadius: 8,
        borderColor: 'gray',
        borderRadius: 8,
        backgroundColor: 'white',
        margin: 15,
        padding: 10,
    },
    date: {
        fontFamily: Fonts.primary,
        fontSize: 17,

    },
    amount: {
        fontSize: 17,
        fontFamily: Fonts.primary_bold,
    },
    detailItems: {
        width: '100%',
    },
});
export default OrderItem;