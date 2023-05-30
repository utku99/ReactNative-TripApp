import { View, Text, StatusBar } from 'react-native'
import React from 'react'

const ScreenWrapper = ({ children }) => {
    const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 30 
    return (
        <View style={{ paddingTop: statusBarHeight}}>
            {children}
        </View>
    )
}

export default ScreenWrapper