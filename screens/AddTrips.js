import { View, Text, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../themes'
import BackButton from '../components/BackButton'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'
import { addDoc } from 'firebase/firestore'
import { tripsRef } from '../config/firebase'
import { useSelector } from 'react-redux'

const AddTrips = () => {
    const [place, setPlace] = useState("")
    const [country, setCountry] = useState("")
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(state => state.user)

    const navigation = useNavigation()

    const handleAddTrip = async () => {
        if (place && country) {
            setLoading(true)
            let doc = await addDoc(tripsRef, {
                place,
                country,
                userId : user.uid
            })
            setLoading(false)
            if(doc && doc.id) navigation.goBack()
        } else {
            ToastAndroid.show('Lütfen Boş Alanları Doldurun!', ToastAndroid.SHORT)
        }
    }

    return (
        <ScreenWrapper>
            <View className="justify-between h-full mx-4">

                <View>
                    <View className="relative mt-5">
                        <View className="absolute top-0 left-0 z-10">
                            <BackButton />
                        </View>
                        <Text className={`${colors.heading} text-xl font-bold text-center`}>Gezi Ekle</Text>
                    </View>
                    <View className="flex-row justify-center my-3 mt-5">
                        <Image className="h-72 w-72" source={require("../assets/images/4.png")} />
                    </View>
                    <View className="space-y-2 mx-2">
                        <Text className={`${colors.heading} text-lg font-bold`}>Dünya'nın neresinde</Text>
                        <TextInput onChangeText={item => setPlace(item)} value={place} className="p-4 bg-white rounded-full mb-3" />
                        <Text className={`${colors.heading} text-lg font-bold`}>Hangi Ülke</Text>
                        <TextInput onChangeText={item => setCountry(item)} value={country} className="p-4 bg-white rounded-full mb-3" />
                    </View>
                </View>

                <View>
                    {
                        loading ? (
                            <Loading />
                        ) : (
                            <TouchableOpacity onPress={handleAddTrip} style={{ backgroundColor: colors.button }} className="my-6 rounded-full p-3 shadow-sm">
                                <Text className="text-center text-white text-lg font-bold">Ekle</Text>
                            </TouchableOpacity>
                        )
                    }

                </View>



            </View>
        </ScreenWrapper>
    )
}

export default AddTrips