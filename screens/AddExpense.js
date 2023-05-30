import { View, Text, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../themes'
import BackButton from '../components/BackButton'
import { useNavigation } from '@react-navigation/native'
import { categories } from "../constants/index"
import { addDoc } from 'firebase/firestore'
import { expensesRef } from '../config/firebase'
import Loading from '../components/Loading'


const AddExpense = (props) => {
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()
  let { id } = props.route.params

  const handleAddExpense = async () => {
    if (title && amount && category) {
      //navigation.goBack()
      setLoading(true)
      let doc = await addDoc(expensesRef, {
        title,
        amount,
        category,
        tripId: id
      })
      setLoading(false)
      if (doc && doc.id) navigation.goBack()
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
            <Text className={`${colors.heading} text-xl font-bold text-center`}>Harcama Ekle</Text>
          </View>
          <View className="flex-row justify-center my-3 mt-5 h-1/4 w-full">
            <Image className=" h-full w-[75%]" source={require("../assets/images/expenseBanner.png")} />
          </View>
          <View className="space-y-2 mx-2">
            <Text className={`${colors.heading} text-lg font-bold`}>Ne İçin</Text>
            <TextInput onChangeText={item => setTitle(item)} value={title} className="p-4 bg-white rounded-full mb-3" />
            <Text className={`${colors.heading} text-lg font-bold`}>Ne Kadar</Text>
            <TextInput onChangeText={item => setAmount(item)} value={amount} className="p-4 bg-white rounded-full mb-3" />
          </View>
          <View className="mx-3 space-x-2">
            <Text className="text-lg font-bold">Kategori</Text>
            <View className="flex-row flex-wrap items-center">
              {
                categories.map(item => {
                  let bgColor = "bg-white"
                  if (item.value === category) bgColor = "bg-green-200"
                  return (
                    <TouchableOpacity onPress={() => setCategory(item.value)} key={item.value} className={`rounded-full ${bgColor} px-4 p-3 mb-2 mr-2`}>
                      <Text>{item.title}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
        </View>

        <View>
          {
            loading ? (
              <Loading />
            ) : (
              <TouchableOpacity onPress={handleAddExpense} style={{ backgroundColor: colors.button }} className="my-6 rounded-full p-3 shadow-sm">
                <Text className="text-center text-white text-lg font-bold">Ekle</Text>
              </TouchableOpacity>
            )
          }
        </View>



      </View>
    </ScreenWrapper>
  )
}

export default AddExpense