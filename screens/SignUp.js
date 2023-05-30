import { View, Text, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../themes'
import BackButton from '../components/BackButton'
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../config/firebase"
import { setUserLoading } from '../redux/slices/user'
import Loading from '../components/Loading'
import { useDispatch, useSelector } from 'react-redux'


const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { userLoading } = useSelector(state => state.user)

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const handleSubmit = async () => {
        if (email && password) {
            try {
                dispatch(setUserLoading(true))
                await createUserWithEmailAndPassword(auth, email, password)
                dispatch(setUserLoading(false))
            } catch (error) {
                dispatch(setUserLoading(false))
                console.log("Error login user", error)
            }
        } else {
            ToastAndroid.show('Lütfen Boş Alanları Doldurun!', ToastAndroid.SHORT)
        }
    }



    return (
        <ScreenWrapper>
            <View className="justify-between h-full mx-4">

                <View>
                    <View className="relative">
                        <View className="absolute top-0 left-0 z-10">
                            <BackButton />
                        </View>
                        <Text className={`${colors.heading} text-xl font-bold text-center`}>Kayıt Ol</Text>
                    </View>
                    <View className="flex-row justify-center my-3 mt-5">
                        <Image className="h-80 w-80" source={require("../assets/images/signup.png")} />
                    </View>
                    <View className="space-y-2 mx-2">
                        <Text className={`${colors.heading} text-lg font-bold`}>Email</Text>
                        <TextInput onChangeText={item => setEmail(item)} value={email} className="p-4 bg-white rounded-full mb-3" />
                        <Text className={`${colors.heading} text-lg font-bold`}>Şifre</Text>
                        <TextInput secureTextEntry onChangeText={item => setPassword(item)} value={password} className="p-4 bg-white rounded-full mb-3" />
                    </View>
                </View>

                <View>
                    {
                        userLoading ? <Loading /> :
                            <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: colors.button }} className="my-6 rounded-full p-3 shadow-sm">
                                <Text className="text-center text-white text-lg font-bold">Kayıt Ol</Text>
                            </TouchableOpacity>
                    }
                </View>



            </View>
        </ScreenWrapper>
    )
}

export default SignUp