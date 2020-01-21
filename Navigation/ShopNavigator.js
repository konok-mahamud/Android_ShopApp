import React from 'react';
import {View,Button,SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';

import ProductOverviewScreen from '../Screens/Shop/ProductOverViewScreen';
import ProductDetailsScreen from '../Screens/Shop/ProductDetailsScreen';
import CartScreen from '../Screens/Shop/CartScreen';
import OrderScreen from '../Screens/Shop/OrderScreen';
import userProductScreen from '../Screens/User/UserProductScreen';
import EditProduduct from '../Screens/User/EditProductScreen';
import AuthenticationScreen from '../Screens/User/Authentication';
import StartUpScreen from '../Screens/User/StartUpScreen';
import * as ActionAuthentitor from '../Store/actions/Auth';

import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator,DrawerNavigatorItems } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Colors from '../Constant/Colors';
import Fonts from '../Constant/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons'

const DefaultNavOpt = {
    headerStyle: {
        backgroundColor: Colors.primary,
    },
    headerTintColor: 'white',
    headerTitleStyle: {
        fontFamily: Fonts.primary_bold,
    },
    headerBackTitleStyle: {
        fontFamily: Fonts.primary_italic,
    },
}
const ProductsNavigator = createStackNavigator({
    ProductOverview: ProductOverviewScreen,
    ProductDetails: ProductDetailsScreen,
    CartScreens: CartScreen,
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons name={"md-cart"} size={23} color={drawerConfig.tintColor} />
        )
    },
    defaultNavigationOptions: DefaultNavOpt
});

const orderNavigatin = createStackNavigator({
    orderScreen: OrderScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons name={"md-list"} size={23} color={drawerConfig.tintColor} />
        )
    },
    defaultNavigationOptions: DefaultNavOpt
});

const adminNavigation = createStackNavigator({
    AdminNav: userProductScreen,
    EditProduduct:EditProduduct
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons name={"md-create"} size={23} color={drawerConfig.tintColor} />
        )
    },
    defaultNavigationOptions: DefaultNavOpt
});

const drawerNavigation = createDrawerNavigator({
    DashBoard: ProductsNavigator,
    Order: orderNavigatin,
    Admin:adminNavigation,
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    },
    contentComponent: props=>{
        const dispatch=useDispatch();
        return(
            <View style={{flex:1}}>
                <SafeAreaView forceInset={{top:'always', horizontal:'never'}}>
                <DrawerNavigatorItems {...props} />
                <Button title="Logout" color={Colors.primary}
                 onPress={()=>{dispatch(ActionAuthentitor.logout());
                // props.navigation.navigate("Authenticator");
                 }} />
                </SafeAreaView>
            </View>
        )
    }
} 
);

const authenticationNav=createStackNavigator({
    autentication:AuthenticationScreen
},{
    defaultNavigationOptions:DefaultNavOpt
});

const mainNav=createSwitchNavigator({
    TryToLogin:StartUpScreen,
    Authenticator:authenticationNav,
    mainDashBoard:drawerNavigation,
})

export default createAppContainer(mainNav);