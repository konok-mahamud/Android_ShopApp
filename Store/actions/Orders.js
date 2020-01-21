import Order from "../../Models/Order";

export const ORDER_ITEM = 'ORDER_ITEM';
export const SET_ORDER = 'SET_ORDER';


export const fetchOrder = () => {

    return async (dispatch, getState) => {
        const userId = getState().Auth.userID;
        //console.log(getState());
        console.log(userId);
        try {
            const response = await fetch(`https://shopapp-1698d.firebaseio.com/order/${userId}.json`);
            if (!response.ok) {
                throw new Error("Something went wrong !");
            }
            const resData = await response.json();

            const orderData = [];
            for (const key in resData) {
                orderData.push(new Order(key, resData[key].CartItem,
                    resData[key].Totalamount, new Date(resData[key].Date)
                ));
            };

            dispatch({ type: SET_ORDER, setorderdata: orderData })
        } catch (err) {
            throw err;
        }
    };

}

export const order_item = (cartItem, totalamount) => {
    return async (dispatch, getState) => {
        const userId = getState().Auth.userID;
        const token=getState().Auth.token;

        const date = new Date();
        const response = await fetch(`https://shopapp-1698d.firebaseio.com/order/${userId}.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CartItem: cartItem,
                Totalamount: totalamount,
                Date: date.toISOString(),
               

            })
        });
        if (!response.ok) {
            throw new Error("Something Wrong !");
        };




        const resData = await response.json();

        dispatch({
            type: ORDER_ITEM,
            orderData: {
                id: resData.name,
                items: cartItem,
                amount: totalamount,
                date: date,
                 
            }
        });

    };
};