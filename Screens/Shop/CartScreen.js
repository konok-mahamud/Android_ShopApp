import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Fonts from '../../Constant/Fonts';
import Colors from '../../Constant/Colors';
import CartItems from '../../Component/Shop/CartItem';
import * as removeCard from '../../Store/actions/Carts';
import * as Orders from '../../Store/actions/Orders';


const CartScreen = props => {
    const [isLoading, SetisLoading] = useState(false);

    const cartTotalAmount = useSelector(state => state.carts.totalAmount);
    const CartData = useSelector(state => {
        const transformedCartitem = [];
        // console.log(state.carts.item);
        for (const key in state.carts.item) {
            transformedCartitem.push({
                productID: key,
                productTitle: state.carts.item[key].ProductTitle,
                productPrice: state.carts.item[key].ProductPrice,
                quantity: state.carts.item[key].quantity,
                Sum: state.carts.item[key].sum,

            });

        }
        return transformedCartitem.sort((a, b) => a.productID > b.productID ? 1 : -1);

    });
    const dispatch = useDispatch();
    const SendOrderHandle = async () => {
        SetisLoading(true);
        await dispatch(Orders.order_item(CartData, cartTotalAmount));
        SetisLoading(false);
    };
    return (
        <View style={styles.screens}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${(Math.round(cartTotalAmount.toFixed(2)) * 100) / 100}</Text>
                </Text>
                {isLoading ? (<ActivityIndicator size='small' color={Colors.primary} />) :
                    (<Button title="Order now"
                        onPress={SendOrderHandle}
                        disabled={CartData.length === 0} />)
                }

            </View>
            <FlatList
                data={CartData}
                keyExtractor={item => item.productID}
                renderItem={itemData => <CartItems
                    title={itemData.item.productTitle}
                    amount={itemData.item.Sum}
                    quantity={itemData.item.quantity}
                    onSelect={() => {
                        dispatch(removeCard.removeFromCart(itemData.item.productID))
                    }}
                    Deltable
                />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screens: {
        margin: 20,
    },
    summary: {
        shadowColor: 'black',
        shadowOffset: 0.26,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        shadowRadius: 8,
        borderColor: 'gray',
        borderRadius: 8,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    summaryText: {
        fontFamily: Fonts.primary_bold,
        fontSize: 20,
        padding: 10,
    },
    amount: {
        color: Colors.primary,
        marginHorizontal: 5,
    }

});

CartScreen.navigationOptions = navData => {

    return {
        headerTitle: 'Cart',

    }
};
export default CartScreen;