import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { Image } from 'react-native'
import { colors } from '../themes'
import { useNavigation } from '@react-navigation/native'

const Welcome = () => {
    const navigation = useNavigation()
    return (
        <ScreenWrapper>
            <View className="h-full justify-around">
                <View className="flex-row justify-center mt-10">
                    <Image source={require("../assets/images/welcome.gif")} className="h-96 w-96 shadow"/>
                </View>
                <View className="mx-5 mb-20">
                    <Text className={`text-center font-bold text-4xl ${colors.heading} mb-10`}>LOGO</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate("SignIn")} className="shadow p-3 rounded-full mb-5" style={{backgroundColor: colors.button}}>
                        <Text className="text-center text-white text-lg font-bold">Giriş Yap</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate("SignUp")} className="shadow p-3 rounded-full" style={{backgroundColor: colors.button}}>
                        <Text className="text-center text-white text-lg font-bold">Üyo Ol</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Welcome