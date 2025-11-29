import React, { useEffect } from 'react'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { Easing, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { UiText } from '../../components/atoms/ui-text'
import { useNavigation } from '@react-navigation/native'

const Full = styled.View`
  flex: 1;
`

const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export function SplashPage() {
  const nav = useNavigation<any>()
  const translateY = useSharedValue(20)
  const opacity = useSharedValue(0)

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) })
    translateY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) })
    const t = setTimeout(() => nav.reset({ index: 0, routes: [{ name: 'Tabs' }] }), 1400)
    return () => clearTimeout(t)
  }, [])

  const aStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }]
  }))

  return (
    <Full>
      <LinearGradient colors={["#FD267A", "#FF7854"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
        <Center>
          <Animated.View style={[aStyle, { flexDirection: 'row', alignItems: 'center', gap: 8 }]}>
            <MaterialCommunityIcons name="fire" size={38} color="#FFFFFF" />
            <UiText variant="title" color="#FFFFFF" size={34}>tinder</UiText>
          </Animated.View>
        </Center>
      </LinearGradient>
    </Full>
  )
}

