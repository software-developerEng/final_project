import { Stack } from 'expo-router'
import { useCallback } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

const Layout = () => {
    const [fontsLoaded] = useFonts({
        DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
        DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
        DMRegular: require('../assets/fonts/DMSans-Regular.ttf')
    })

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync()
        }
    }, [fontsLoaded])

    if (!fontsLoaded) return null

    return (
        <Stack  initialRouteName="Splashscreen"  onLayout={onLayoutRootView}>
            <Stack.Screen name={"index"} options={{ headerShown: false, }} />
            <Stack.Screen name={"Splashscreen"} options={{ headerShown: false, }} />
            <Stack.Screen name={"loginregister"} options={{ headerShown: false, }} />
            <Stack.Screen name={"Login"} options={{ headerShown: false, }} />
            <Stack.Screen name={"(tabs)"} options={{ headerShown: false, }} />
            <Stack.Screen name={"Register"} options={{ headerShown: false, }} />
            <Stack.Screen name={"Settings"} options={{ headerShown: false, }} />
            <Stack.Screen name={"Maps"} options={{ headerShown: false, }} />
            
        </Stack>
    )
}

export default Layout