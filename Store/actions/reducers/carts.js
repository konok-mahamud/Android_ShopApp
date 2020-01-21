import { ADD_TO_CARD, REMOVE_FROM_CART } from "../Carts";
import { ORDER_ITEM } from '../Orders';
import CardItem from '../../../Models/Card-Item';
import { DELET_PRODUCT } from "../Products";
const initialState = {
    item: {},
    totalAmount: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CARD:
            const addedProduct = action.products;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;
            let updateOrnewItem;
            if (state.item[addedProduct.id]) {
                updateOrnewItem = new CardItem(state.item[addedProduct.id].quantity + 1,
                    prodPrice, prodTitle, state.item[addedProduct.id].sum + prodPrice);

            } else {
                updateOrnewItem = new CardItem(1, prodPrice, prodTitle, prodPrice);

            };
            return {
                ...state, item: { ...state.item, [addedProduct.id]: updateOrnewItem },
                totalAmount: state.totalAmount + prodPrice
            };
        case REMOVE_FROM_CART:
            const selectedItem = state.item[action.pid];
            console.log(selectedItem);
            const CurrentQty = selectedItem.quantity;
            let UpdateCartItems;
            if (CurrentQty > 1) {
                const UpdateCartItem = new CardItem(
                    CurrentQty - 1,
                    selectedItem.ProductPrice,
                    selectedItem.ProductTitle,
                    selectedItem.sum - selectedItem.ProductPrice,
                );
                UpdateCartItems = { ...state.item, [action.pid]: UpdateCartItem };
            } else {
                UpdateCartItems = { ...state.item };
                delete UpdateCartItems[action.pid];
                //UpdateCartItems={...state.item,[action.pid]:UpdateCartItem};
            }
            return {
                ...state,
                item: UpdateCartItems,
                totalAmount: state.totalAmount - selectedItem.ProductPrice
            }
        case ORDER_ITEM:
            return initialState;
        case DELET_PRODUCT:
            if(!state.item[action.pid]){
                return state;
            };
            const updateItem={...state.item};
            const updateAmount=state.item[action.pid].sum;
            delete updateItem[action.pid];
            return{
                ...state,
                item:updateItem,
                totalAmount:state.totalAmount-updateAmount,
            }

    }
    return state;
}