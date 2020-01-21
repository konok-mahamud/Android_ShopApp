import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, ActivityIndicator,Alert } from 'react-native';
import Fonts from '../../Constant/Fonts';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../Screens/Shop/UI/HeaderButton';
import * as ActionProduct from '../../Store/actions/Products';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../Constant/Colors';

const EditProduduct = props => {
    const dispatch = useDispatch();
    const prodID = props.navigation.getParam("EditProductID");

    const editProduct = useSelector(prod => prod.products.UserProduct.find(pro => pro.id === prodID));


    const [title, setTile] = useState(editProduct ? editProduct.title : '');
    const [imageURL, setImageURL] = useState(editProduct ? editProduct.imageURL : '');
    const [price, SetPrice] = useState(editProduct ? editProduct.price.toString() : '');
    const [description, SetDescription] = useState(editProduct ? editProduct.description : '');
    const [isLoading, SetisLoading] = useState(false);
    const [isError, SetisError] = useState();

    const SubmitHandler = useCallback(async () => {
        SetisError(null);
        SetisLoading(true);
        try {

            if (editProduct) {
                await dispatch(ActionProduct.updateProduct(prodID, title, description, imageURL));
            } else {
                await dispatch(ActionProduct.createProduct(title, description, imageURL, +price));
            }
            props.navigation.goBack();
        } catch (err) {
            SetisError(err.message);
        }
        SetisLoading(false);
        
    }, [dispatch, prodID, title, description, imageURL, price]);

    useEffect(() => {
        props.navigation.setParams({ submit: SubmitHandler });
    }, [SubmitHandler]);

    useEffect(()=>{
        if(isError){
            Alert.alert("ERROR",isError,[{text:'OK'}])
        }
    },[isError])
    if (isLoading) {
        return (
            <View style={styles.created}><ActivityIndicator size={'large'} color={Colors.primary} /></View>
        )
    }
    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input}
                        value={title}
                        onChangeText={text => setTile(text)}
                        keyboardType='default'
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image</Text>
                    <TextInput style={styles.input}
                        value={imageURL}
                        onChangeText={text => setImageURL(text)}
                        keyboardType='default'
                    />
                </View>
                {editProduct ? null : <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput style={styles.input}
                        value={price}
                        onChangeText={text => SetPrice(text)}
                        keyboardType='decimal-pad'
                    />
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input}
                        value={description}
                        onChangeText={text => SetDescription(text)}
                        keyboardType='default'
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    created: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        margin: 20,

    },
    formControl: {
        width: '100%',
    },
    label: {
        marginVertical: 10,
        fontFamily: Fonts.primary_bold,
        fontSize: 16,
    },
    input: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        marginVertical: 10,
        marginHorizontal: 5,
    },
})
export default EditProduduct;
EditProduduct.navigationOptions = navData => {
    const SubmitData = navData.navigation.getParam("submit");
    return {
        headerTitle: navData.navigation.getParam("EditProductID") ? "Edit Product" : "Add Product",
        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item iconName={"md-checkmark"} title='save'
                onPress={SubmitData} />
        </HeaderButtons>,
    }
}