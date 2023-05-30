import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../themes'
import EmptyList from '../components/EmptyList'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import BackButton from "../components/BackButton"
import ExpenseCard from '../components/ExpenseCard'
import { expensesRef } from '../config/firebase'
import { getDocs, query, where } from 'firebase/firestore'


const TripExpenses = (props) => {
    const navigation = useNavigation()
    const { id, place, country } = props.route.params
    const [expenses, setExpenses] = useState([])

    const isFocused = useIsFocused()

    const fetchExpenses = async () => {
        const q = query(expensesRef, where("tripId", "==", id))
        const querySnaphsot = await getDocs(q)
        let data = []
        querySnaphsot.forEach(doc => {
            data.push({ ...doc.data(), id: doc.id })
        })
        setExpenses(data)
    }

    useEffect(() => {
        if (isFocused) fetchExpenses()
    }, [isFocused])

    return (
        <ScreenWrapper className="flex-1">

            <View className="px-4">

                <View className="relative mt-5">
                    <View className="absolute top-2 left-0 z-10">
                        <BackButton />
                    </View>
                    <View>
                        <Text className={`${colors.heading} text-xl font-bold text-center`}>{place}</Text>
                        <Text className={`${colors.heading} text-xs text-center`}>{country}</Text>
                    </View>
                </View>

                <View className="flex-row justify-center items-center rounded-xl mb-4">
                    <Image source={require("../assets/images/7.png")} className="w-80 h-80" />
                </View>

                <View className="space-y-3">
                    <View className="flex-row justify-between items-center">
                        <Text className={`${colors.heading} font-bold text-xl`}>Harcamalar</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("AddExpense", { id, place, country })} className="p-2 px-3 bg-white border border-gray-200 rounded-full">
                            <Text className={colors.heading}>Harcama Ekle</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 250 }}>
                        {/*Liste halinde verileri görüntülemek için kullanılır. renderItem prop'u aracılığıyla her liste öğesinin nasıl render edileceğini belirlemenizi sağlar. keyExtractor her bir liste öğesinin bir keye sahip olmasını sağlar.*/}
                        <FlatList
                            data={expenses}
                            keyExtractor={item => item.id}
                            ListEmptyComponent={<EmptyList message={"Her hangi bir harcama kayıt etmediniz"} />}
                            showsVerticalScrollIndicator={false}
                            className="mx-1"
                            renderItem={({ item }) => {
                                return (
                                    <ExpenseCard item={item} />
                                )
                            }}
                        />
                    </View>
                </View>

            </View>

        </ScreenWrapper>
    )
}

export default TripExpenses