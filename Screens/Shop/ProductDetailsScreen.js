import React from 'react';
import { View, Text, ScrollView, Image, Button, StyleSheet } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import ProductItem from '../../Component/Shop/ProductItem';
import Colors from '../../Constant/Colors';
import Fonts from '../../Constant/Fonts';
import * as CartAction from '../../Store/actions/Carts';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../Screens/Shop/UI/HeaderButton';

const ProductDetailsScreen = props => {
    const productID = props.navigation.getParam("productID");
    const ProductDetails = useSelector(state => state.products.availableProduct.find(pro => pro.id === productID));
    const dispatch=useDispatch();
    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: ProductDetails.imageURL }} />
           <View style={styles.actions}>
           <Button color={Colors.primary} title="add card" onPress={()=>{
               dispatch(CartAction.addToCard(ProductDetails));
               console.log( ProductDetails);
           }} />
           </View>
            <View style={styles.details}>
                <Text style={styles.price}>${ProductDetails.price.toFixed(2)}</Text>
            <Text style={styles.description}>{ProductDetails.description}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 300,
        width: '100%',
    },
    actions:{
        marginVertical:10,
        alignItems:'center',
    },
    details:{
        alignItems:'center',
        marginHorizontal:15,
    },
    price:{
        fontSize:22,
        marginBottom:10,
        fontFamily:Fonts.Secondary,
    },
    description:{
        fontSize:17,
        textAlign:'center',
        fontFamily:Fonts.primary,
    }
})

ProductDetailsScreen.navigationOptions = navData => {
    title = navData.navigation.getParam("productTitle");
    return {
        headerTitle: title,
        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item iconName={"md-cart"} title='cart' 
        onPress={()=>{navData.navigation.navigate("CartScreens",{headerTitle:title})}} />
    </HeaderButtons>
    }
};

export default ProductDetailsScreen;