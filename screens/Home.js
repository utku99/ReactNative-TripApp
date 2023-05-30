import { View, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../themes'
import randomImage from '../assets/images/randomImage.js'
import EmptyList from '../components/EmptyList'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'
import { auth, tripsRef } from '../config/firebase'
import { useSelector } from 'react-redux'
import { getDocs, query, where } from 'firebase/firestore'


const handleLogout = async () => {
  await signOut(auth)
}

const Home = () => {

  const { user } = useSelector(state => state.user)
  const [trips, setTrips] = useState([])

  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const size = Dimensions.get("window").height /2 -20

  const fetchTrips = async () => {
    const q = query(tripsRef, where("userId", "==", user.uid))
    const querySnaphsot = await getDocs(q)
    let data = []
    querySnaphsot.forEach(doc => {
      data.push({ ...doc.data(), id: doc.id })
    })
    setTrips(data)
  }

  useEffect(() => {
    if (isFocused) fetchTrips()
  }, [isFocused])

  return (
    <ScreenWrapper className="flex-1">
      <View className="flex-row justify-between items-center p-4">
        <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>Logo</Text>
        <TouchableOpacity onPress={handleLogout} className="p-2 px-3 bg-white border border-gray-200 rounded-full">
          <Text className={colors.heading}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4">
        <Image source={require("../assets/images/banner.png")} className="w-60 h-60" />
      </View>
      <View className="px-4 space-y-4">
        <View className="flex-row justify-between items-center">
          <Text className={`${colors.heading} font-bold text-xl`}>Son Geziler</Text>
          <TouchableOpacity onPress={() => navigation.navigate("AddTrip")} className="p-2 px-3 bg-white border border-gray-200 rounded-full">
            <Text className={colors.heading}>Gezi Ekle</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: size }} >
          {/*Liste halinde verileri görüntülemek için kullanılır. renderItem prop'u aracılığıyla her liste öğesinin nasıl render edileceğini belirlemenizi sağlar. keyExtractor her bir liste öğesinin bir keye sahip olmasını sağlar.*/}
          <FlatList
            data={trips}
            keyExtractor={item => item.id}
            horizontal={false}
            numColumns={2}
            ListEmptyComponent={<EmptyList message={"Her hangi bir gezi kayıt etmediniz"} />}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            className="mx-1"
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate("TripExpenses", { ...item })} className="bg-white p-3 rounded-2xl m-1 shadow-sm w-[48%]">
                  <View>
                    <Image source={randomImage()} className="w-full h-36 mb-2" />
                    <Text className={`${colors.heading} font-bold`}>{item.place}</Text>
                    <Text className={`${colors.heading} text-xs`}>{item.country}</Text>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Home