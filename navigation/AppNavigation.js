import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import AddTrips from '../screens/AddTrips';
import AddExpense from '../screens/AddExpense';
import TripExpenses from '../screens/TripExpenses';
import Welcome from '../screens/Welcome';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import { useDispatch, useSelector } from "react-redux"
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { setUser } from "../redux/slices/user"

const Stack = createNativeStackNavigator();


const AppNavigation = () => {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()

    onAuthStateChanged(auth, u => {
        dispatch(setUser(u))
    })
    
    if (user) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
                    <Stack.Screen options={{ headerShown: false }} name="AddTrip" component={AddTrips} />
                    <Stack.Screen options={{ headerShown: false }} name="AddExpense" component={AddExpense} />
                    <Stack.Screen options={{ headerShown: false }} name="TripExpenses" component={TripExpenses} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    } else {
        return (
            <NavigationContainer >
                <Stack.Navigator initialRouteName="Welcome">
                    <Stack.Screen options={{ headerShown: false, presentation: 'modal' }} name="SignIn" component={SignIn} />
                    <Stack.Screen options={{ headerShown: false, presentation: 'modal' }} name="SignUp" component={SignUp} />
                    <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default AppNavigation




