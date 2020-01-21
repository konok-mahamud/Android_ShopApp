import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../Component/Shop/ProductItem';
import * as CartAction from '../../Store/actions/Carts';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../Screens/Shop/UI/HeaderButton';
import * as ActionProducts from '../../Store/actions/Products';
import Colors from '../../Constant/Colors';
const ProductOverviewScreen = props => {
    const ProductData = useSelector(state => state.products.availableProduct);
    const dispatch = useDispatch();
    const [isLoading, SetisLoading] = useState(false);
    const [isRefeshing, SETRefeshing] = useState(false);
    const [isError, SetError] = useState();

    const loadindProduct = useCallback(async () => {
        SetError(null);
        SETRefeshing(true);
        try {
            await dispatch(ActionProducts.fetchProducts());
        } catch (err) {
            SetError(err.message);
        };
        SETRefeshing(false);
    }, [SETRefeshing, dispatch, SetError]);

    useEffect(()=>{
        const willfocusSub=props.navigation.addListener('willFocus',loadindProduct);
        return ()=>{
            willfocusSub.remove();
        };
    },[loadindProduct]);


    useEffect(() => {
        SetisLoading(true);
        loadindProduct().then(()=>{
            SetisLoading(false);
        });
    }, [SetisLoading,loadindProduct]);

    const SelectedItemHandler = (id, title) => {
        props.navigation.navigate("ProductDetails",
            {
                productID: id,
                productTitle: title,
            })
    };
    if (isLoading) {
        return (
            <View style={styles.centered}><ActivityIndicator size='large' color={Colors.primary} /></View>
        )
    };

    if (!isLoading && ProductData.length === 0) {
        return (
            <View style={styles.centered}><Text>NO Data Found</Text></View>
        )
    };

    if (isError) {
        return (
            <View style={styles.centered}>
                <Text>Error Occured</Text>
                <Button title={"Try again"} color={Colors.primary} onPress={loadindProduct} />
                </View>
        )
    };


    return (
        <FlatList
            onRefresh={loadindProduct}
            refreshing={isRefeshing}
            data={ProductData}
            renderItem={itemData => (
                <ProductItem
                    title={itemData.item.title}
                    image={itemData.item.imageURL}
                    price={itemData.item.price}
                    onViewDetails={() => { SelectedItemHandler(itemData.item.id, itemData.item.title) }}
                >
                    <Button color={Colors.primary} title="Details!"
                        onPress={() => { SelectedItemHandler(itemData.item.id, itemData.item.title) }}
                    />
                    <Button color={Colors.primary} title="To Cart!" onPress={() => {
                        dispatch(CartAction.addToCard(itemData.item));
                    }}
                    />
                </ProductItem>
            )}
            keyExtractor={item => item.id}
        />

    )
}


ProductOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'all Products',
        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item iconName={"md-cart"} title='cart'
                onPress={() => { navData.navigation.navigate("CartScreens") }} />
        </HeaderButtons>,
        headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item iconName={"md-menu"} title='menu'
                onPress={() => { navData.navigation.toggleDrawer() }} />
        </HeaderButtons>
    }
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default ProductOverviewScreen;