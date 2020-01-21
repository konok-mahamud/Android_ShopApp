import PRODUCTS from '../../../Data/dummy-data';
import { DELET_PRODUCT, UPDATE_PRODUCT, CREATE_PRODUCT, SET_PRODUCTS } from '../Products';
import Product from '../../../Models/Products';

const initialState = {
    availableProduct: [],
    UserProduct:[]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return{
                availableProduct:action.products,
                UserProduct:action.userProduct,

            }
        case DELET_PRODUCT:
            return {
                ...state,
                UserProduct: state.UserProduct.filter(prod => prod.id !== action.pid),
                availableProduct: state.UserProduct.filter(prod => prod.id !== action.pid),
            };
        case CREATE_PRODUCT:
             
            const newProduct = new Product(action.ProductData.id, action.ProductData.userId,
            action.ProductData.title, action.ProductData.imageURL,
             action.ProductData.description, action.ProductData.price);
            return {
                ...state,
                availableProduct: state.availableProduct.concat(newProduct),
                UserProduct: state.availableProduct.concat(newProduct),
            };
        case UPDATE_PRODUCT:
            const ProductIndex = state.UserProduct.findIndex(prod => prod.id === action.pid);
            
            const updateProduct = new Product(action.pid, state.UserProduct[ProductIndex].ownerID,
                action.ProductData.title, action.ProductData.imageURL,
                action.ProductData.description, state.UserProduct[ProductIndex].price);

            const updateUserProduct = [...state.UserProduct];
            updateUserProduct[ProductIndex] = updateProduct;
            const availableProductIndex = state.availableProduct.findIndex(prod => prod.id === action.pid);
            const updateAvailableProduct = [...state.availableProduct];
            updateAvailableProduct[availableProductIndex] = updateProduct;
            return {
                ...state,
                availableProduct: updateAvailableProduct,
                UserProduct: updateUserProduct,
            };


    }
    return state;
};