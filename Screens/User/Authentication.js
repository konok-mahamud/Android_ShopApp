import React, { useState, useCallback, useEffect, useReducer } from 'react';
import { View, ActivityIndicator, ScrollView, Button, StyleSheet, KeyboardAvoidingView,Alert } from 'react-native';
import Fonts from '../../Constant/Fonts';
import Card from '../Shop/UI/Card';
import Input from '../Shop/UI/Input';
import Colors from '../../Constant/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import * as AuthActions from '../../Store/actions/Auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};
const Authentication = props => {
    const dispatch = useDispatch();
    const [isLogin, SetisLogin] = useState(false);
    const [isLoading, SetisLoading] = useState(false);
    const [isError, SetisError] = useState();
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });
useEffect(()=>{
if(isError){
    Alert.alert("An error Occured",isError,[{text:"OK" }])
 //   SetisError(null);
}

},[isError])
    const AuthHandler = async () => {
        SetisError(null);
        SetisLoading(true);
      try{
        if (isLogin) {
            await dispatch(AuthActions.login(formState.inputValues.email, formState.inputValues.password));
            props.navigation.navigate("mainDashBoard");
        } else {
            await dispatch(AuthActions.singUp(formState.inputValues.email, formState.inputValues.password));
        }
      }catch(err){
          SetisError(err.message);
          SetisLoading(false);
      };
        

    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );

    return (
        <KeyboardAvoidingView behavior={'height'} keyboardVerticalOffset={80}  style={styles.screen}>
            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                <Card style={styles.authenticity}>
                    <ScrollView>

                        <Input id='email' label='E-mail' keyboardType='email-address'
                            required email autoCapitalized='none' errorText='please enter a valid email'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />

                        <Input id='password' label='Password' keyboardType='default' secureTextEntry
                            required minLength={5} errorText='please enter a valid password'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <View style={styles.buttoncontainer}>
                            {isLoading ? <ActivityIndicator size='small' color={Colors.primary} />
                                :
                                (<Button style={styles.btn} title={isLogin ? "Login" : 'SignUp'}
                                    color={Colors.primary} onPress={AuthHandler} />)
                            }
                        </View >
                        <View style={styles.buttoncontainer}>
                            <Button style={styles.btn} title={`Switch to ${isLogin ? 'SignUp' : 'Login'}`} color={Colors.accent}
                                onPress={() => { SetisLogin(att => !att) }} />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,

    },
    btn: {
        width: '50%',
    },
    buttoncontainer: {
        padding: 5,



    },
    authenticity: {
        width: '80%',
        maxHeight: 400,
        maxWidth: 400,
        padding: 20,
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
export default Authentication;

Authentication.navigationOptions = {
    headerTitle: 'Authentication'
}