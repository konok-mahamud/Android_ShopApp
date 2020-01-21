import Product from "../../Models/Products";

export const DELET_PRODUCT = 'DELET_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async (dispatch,getState) => {
        const userId=getState().Auth.userID;
      //  console.log(userId);
   try{
    const response = await fetch('https://shopapp-1698d.firebaseio.com/product.json');
    if(!response.ok){
        throw new Error("Something went wrong !");
    }
    const resData = await response.json();
    
    const LoadedProducts = [];
    for (const key in resData) {
        LoadedProducts.push(new Product(key, resData[key].userId,
            resData[key].title, resData[key].imageURL, resData[key].description, resData[key].price));
    };
    dispatch({ type: SET_PRODUCTS, products:LoadedProducts,userProduct:LoadedProducts.filter(prod=>prod.ownerID===userId) });
   }catch(err){
       throw err;
   };
    };
};


export const createProduct = (title, description, imageURL, price) => {
    return async (dispatch,getState) => {
        const token=getState().Auth.token;
        const userId=getState().Auth.userID;
        const response = await fetch(`https://shopapp-1698d.firebaseio.com/product.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageURL,
                price,
                userId

            })
        });
        const resData = await response.json();


        dispatch({
            type: CREATE_PRODUCT,
            ProductData: {
                id: resData.name,
                title,
                description,
                imageURL,
                price,
                userId 
            },
        })
    }
};


export const deletProduct = (ProductID) => {
    return async  (dispatch,getState)=>{
        const token=getState().Auth.token;
        await fetch(`https://shopapp-1698d.firebaseio.com/product/${ProductID}.json?auth=${token}`, {
            method: 'DELETE',
         
        });
        dispatch({ type: DELET_PRODUCT, pid: ProductID });
    }
    
   
};

export const updateProduct = (id, title, description, imageURL) => {
    return async (dispatch,getState) => {
      //  console.log(getState());
      const token=getState().Auth.token;
        const response= await fetch(`https://shopapp-1698d.firebaseio.com/product/${id}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageURL,
              
            })
        });
        if(!response.ok){
            throw new Error("Something went wrong!!");
        };
    dispatch( {
        type: UPDATE_PRODUCT,
        pid: id,
        ProductData: {
            title,
            description,
            imageURL,

        },
    });
}};