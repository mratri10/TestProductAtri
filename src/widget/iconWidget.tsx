import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

function IconApp({type="", name, size, color}:IconType) {

    switch (type) {
        case 'AntDesign':
            return <AntDesign name={name} size={size} color={color}/>
        case 'Ionicons':
            return <Ionicons name={name} size={size} color={color}/>
        case 'EvilIcons':
            return <EvilIcons name={name} size={size} color={color}/>
        default:
            return <FontAwesome5 name={name} size={size} color={color}/>
    }
    
}

export default IconApp