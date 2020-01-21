import { ORDER_ITEM, SET_ORDER } from '../Orders';
import Order from '../../../Models/Order';

const initialState = {
    orders: []
}
export default (state = initialState, action) => {

    switch (action.type) {
        case ORDER_ITEM:
            const newOrder = new Order(
                action.orderData.id,
                action.orderData.items,
                action.orderData.amount,
                action.orderData.date
            )
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            };

            case SET_ORDER:
               return{
                orders:action.setorderdata,
               };

    };
    return state;
}