import React from 'react'
import { TextInput, View } from 'react-native';
import { bottomSpace, ITEM_WIDTH } from './util';
import {AntDesign} from '@expo/vector-icons'

export default ({
    value,
    onChangeText,
    placeholder
}) => {
    
    return (
        <View style={{ marginBottom: bottomSpace, flexDirection: 'row', width: ITEM_WIDTH }}>
          <TextInput 
           value={value}
           onChangeText={onChangeText}
           placeholder={placeholder}
           style={{
            width: ITEM_WIDTH,
            backgroundColor: "yellow",
           }}
           />
           <AntDesign name="plus" size={18} color='#595959'/>
        </View>
    )
}