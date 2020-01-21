import React from 'react';
import { FlatList, Alert, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../Screens/Shop/UI/HeaderButton';
import ProductItem from '../../Component/Shop/ProductItem';
import * as ProductRemove from '../../Store/actions/Products';
import Colors from '../../Constant/Colors';
const userProductScreen = props => {
    const userList = useSelector(state => state.products.UserProduct);
    dispatch = useDispatch();
    const EditProduductHandler=(id)=>{
        return(
            props.navigation.navigate("EditProduduct",{
                EditProductID:id
            })
        );
    };
    const DeleteHandeler=(id)=>{
        Alert.alert("Do U want to delete?",'Are you sure?',
        [{text:'no',style:'default'},{text:'yes',style:'destructive',onPress:()=>{
              dispatch(ProductRemove.deletProduct(id)); 
        }
    }],
        
        )
    }
    return (
        <FlatList
            data={userList}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem image={itemData.item.imageURL}
                title={itemData.item.title}
                price={itemData.item.price}
                onViewDetails={() => { }}
            >
                <Button color={Colors.primary} title="Edit"
                    onPress={() => {EditProduductHandler(itemData.item.id)}}
                />
                <Button color={Colors.primary} title="Remove"
                    onPress= {DeleteHandeler.bind(this,itemData.item.id)}
                />

            </ProductItem>}
        />
    )
}

export default userProductScreen;
userProductScreen.navigationOptions = navData => {
    return {
        headerTitle: "My Product",
        headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item iconName={"md-menu"} title='menu' onPress={() => { navData.navigation.toggleDrawer() }} />
        </HeaderButtons>,
        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item iconName={"md-add-circle-outline"} title='add' onPress={() => { navData.navigation.navigate("EditProduduct") }} />
    </HeaderButtons>,
    }
}