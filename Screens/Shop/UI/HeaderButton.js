import React from 'react';
import {HeaderButton}  from 'react-navigation-header-buttons';
import Colors from '../../../Constant/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons'

const CustomheaderButton=props=>{
    return(
        <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color='white' /> 
    )
}

export default CustomheaderButton;