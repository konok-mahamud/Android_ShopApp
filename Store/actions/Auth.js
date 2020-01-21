import { AsyncStorage } from 'react-native';
//export const SIGN_UP = 'SIGN_UP';
//export const LOGIN="LOGIN";
export const LOGOUT = 'LOGOUT';
export const AUTHENTICATE = 'AUTHENTICATE';

let timer;

export const authenticate = (token, userid,expiryTime) => {
    return dispatch=> {
        dispatch(SetLogoutTimer(expiryTime));
        dispatch ({type: AUTHENTICATE, token: token, userid: userid});
    }
}

export const singUp = (email, pass) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC9BSN69WSb-qfkjnRWlTuxi6ibHTyEjuY',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: pass,
                    returnSecureToken: true
                })
            }
        );
        if (!response.ok) {
            const ErrorresData = await response.json();
            // console.log(ErrorresData);
            const errorID = ErrorresData.error.message;
            let msg = "something Wrong";
            if (errorID === "EMAIL_EXISTS") {
                msg = "this email is already exists.";
            }
            throw new Error(msg);
        };
        const resData = await response.json();
        //console.log(resData);

        dispatch(authenticate(resData.idToken, resData.localId,parseInt(resData.expiresIn)*1000));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        SavetoStorage(resData.idToken, resData.localId, expirationDate);
    };
}


export const login = (email, pass) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC9BSN69WSb-qfkjnRWlTuxi6ibHTyEjuY',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: pass,
                    returnSecureToken: true
                })
            }
        );
        if (!response.ok) {
            const ErrorresData = await response.json();
            console.log(ErrorresData);
            const errorID = ErrorresData.error.message;
            let msg = "something Wrong";
            if (errorID === "EMAIL_NOT_FOUND") {
                msg = "this email is not found.";
            } else if (errorID === "INVALID_PASSWORD") {
                msg = "password is wrong";
            };
            throw new Error(msg);
        };
        const resData = await response.json();
        console.log(resData);
        dispatch(authenticate(resData.idToken, resData.localId, parseInt(resData.expiresIn)*1000));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        SavetoStorage(resData.idToken, resData.localId, expirationDate);
    };
}

export const logout = () => {
    ClearTimer();
    AsyncStorage.removeItem("userDATA");
    return { type: LOGOUT };
};
const ClearTimer = () => {
    if (timer) {
        clearTimeout(timer);
    };
};
const SetLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime)
    }
}
const SavetoStorage = (token, userid, expirationDate) => {
    AsyncStorage.setItem("userDATA",
        JSON.stringify({
            token: token,
            userid: userid,
            expiryDate: expirationDate.toISOString()
        })
    );
};
