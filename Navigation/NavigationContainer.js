import React,{useEffect,useRef} from 'react';
import {NavigationActions} from 'react-navigation';
import {useSelector} from 'react-redux';
import ShopNavigator from './ShopNavigator';

const NavigationComponent=Props=>{
    const navRaf=useRef();
    const isAuth=useSelector(state=>!!state.Auth.token);

    useEffect(()=>{
        if(!isAuth){
            navRaf.current.dispatch(NavigationActions.navigate({routeName:'Authenticator'}));
        }
    },[isAuth])
    return(
        <ShopNavigator ref={navRaf} />
    )
};

export default NavigationComponent;