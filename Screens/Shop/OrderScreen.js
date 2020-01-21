import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Text, ActivityIndicator, View ,StyleSheet} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../Screens/Shop/UI/HeaderButton';
import OrderItem from '../../Component/Shop/OrderItem';
import * as ActionOrderData from '../../Store/actions/Orders';
import Colors from '../../Constant/Colors';

const OrderScreen = props => {
  const orderItem = useSelector(state => state.Order.orders);
  const dispatch = useDispatch();
  const [isLoading, SetisLoading] = useState(false);
  const [Iserror, SetisError] = useState();

  const loadedOrder = useCallback(async () => {
    SetisError(null);
    SetisLoading(true);
    try {
      await dispatch(ActionOrderData.fetchOrder());
    } catch (err) {
      SetisError(err.message);
    }
    SetisLoading(false);

  }, [SetisError, SetisLoading, dispatch]
  );

  useEffect(() => {
    loadedOrder();
  }, [loadedOrder]);

  if (Iserror) {
    console.log("error");
    return (
      <View><Text>an error</Text></View>
    )
  };
  if (isLoading) {
    return (
      <ActivityIndicator size={'large'} color={Colors.primary} />
    )
  };
  if(orderItem===0){
    console.log("dssjdk");
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>NO order Item Founds</Text></View>
    )
  }
  return (

    <FlatList data={orderItem}
      keyExtractor={item => item.id}
      renderItem={itemdata => <OrderItem
        date={itemdata.item.readableDate}
        totalamount={itemdata.item.totalamount}
        items={itemdata.item.itemdata}
      />}
    />
  )
}
OrderScreen.navigationOptions = navData => {
  return {
    headerTitle: 'My Order',
    headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item iconName={"md-menu"} title='menu'
        onPress={() => { navData.navigation.toggleDrawer() }} />
    </HeaderButtons>
  }
}
export default OrderScreen;