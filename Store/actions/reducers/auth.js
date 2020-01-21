import { AUTHENTICATE, LOGOUT } from "../Auth";

const initialItem = {
    token: null,
    userID: null
};

export default (state = initialItem, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userID: action.userid
            };
        case LOGOUT:
            return {
                initialItem
            };
        // case LOGIN:
        //     return {
        //         token: action.token,
        //         userID: action.userID
        //     };
        default:
            return state;
    }
};