import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainSwipePage } from '../features/swipe/screens/main-swipe-page'
import { LikedListPage } from '../features/liked/screens/liked-list-page'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'react-native'
import { UiText } from '../components/atoms/ui-text'
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons'

function DiscoverPage() {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <UiText variant="title">Discover</UiText>
    </SafeAreaView>
  )
}

function ChatPage() {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <UiText variant="title">Chats</UiText>
    </SafeAreaView>
  )
}

function ProfilePage() {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <UiText variant="title">Profile</UiText>
    </SafeAreaView>
  )
}

export type RootTabParamList = {
  Home: undefined
  Discover: undefined
  Liked: undefined
  Chat: undefined
  Profile: undefined
}

const Tab = createBottomTabNavigator<RootTabParamList>()

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 64, backgroundColor: '#FFFFFF', borderTopColor: 'transparent' },
        tabBarIcon: ({ focused }) => {
          const color = focused ? '#111827' : '#9CA3AF'
          if (route.name === 'Home') return <MaterialCommunityIcons name="fire" size={24} color="#FF5A5F" />
          if (route.name === 'Liked') {
            return (
              <View style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
                <Feather name="star" size={22} color={color} />
              </View>
            )
          }
          if (route.name === 'Discover') {
            return (
              <View style={{ width: 24, height: 24 }}>
                <Feather name="grid" size={22} color={color} />
                <View style={{ position: 'absolute', top: -2, right: -2, width: 6, height: 6, borderRadius: 3, backgroundColor: '#FF3B30' }} />
              </View>
            )
          }
          if (route.name === 'Chat') return <Feather name="message-circle" size={22} color={color} />
          return <Feather name="user" size={22} color={color} />
        }
      })}
    >
      <Tab.Screen name="Home" component={MainSwipePage} />
      <Tab.Screen name="Liked" component={LikedListPage} />
      <Tab.Screen name="Discover" component={DiscoverPage} />
      <Tab.Screen name="Chat" component={ChatPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  )
}

type RootStackParamList = {
  Splash: undefined
  Tabs: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={require('../features/splash/splash-page').SplashPage} />
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
