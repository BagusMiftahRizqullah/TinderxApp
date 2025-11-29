import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'expo-image'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming, interpolate, runOnJS } from 'react-native-reanimated'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { UiText } from '../atoms/ui-text'
import { ProfileTagGroup } from '../molecules/profile-tag-group'
import { IndicatorBadge } from '../atoms/indicator-badge'
import { StatusPill } from '../atoms/status-pill'
import { PhotoProgress } from '../molecules/photo-progress'
import { Feather } from '@expo/vector-icons'
import { Profile } from '../../features/swipe/types'

interface SwipeCardProps {
  user: Profile
  onSwipeRight: (user: Profile) => void
  onSwipeLeft: (user: Profile) => void
  isSwipeEnabled?: boolean
  onProgress?: (fraction: number) => void
}

export interface SwipeCardHandle {
  swipeRight: () => void
  swipeLeft: () => void
}

const Card = styled(Animated.View)`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg}px;
  overflow: hidden;
  width: 100%;
`

const Info = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing(16)}px;
`

const NameRow = styled.View`
  flex-direction: row;
  align-items: baseline;
`

 

export const SwipeCard = forwardRef<SwipeCardHandle, SwipeCardProps>(function SwipeCard({ user, onSwipeRight, onSwipeLeft, isSwipeEnabled = true, onProgress }: SwipeCardProps, ref) {
  const [photoIndex, setPhotoIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [cardWidth, setCardWidth] = useState(0)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const rotation = useSharedValue(0)
  const likeOpacity = useSharedValue(0)
  const nopeOpacity = useSharedValue(0)
  const thresholdSV = useSharedValue(120)
  const likeGate = useSharedValue(0)
  const nopeGate = useSharedValue(0)

  const reset = useCallback(() => {
    translateX.value = withSpring(0)
    translateY.value = withSpring(0)
    rotation.value = withSpring(0)
    likeOpacity.value = withTiming(0)
    nopeOpacity.value = withTiming(0)
    likeGate.value = withTiming(0)
    nopeGate.value = withTiming(0)
  }, [])

  const completeSwipe = useCallback((direction: 'right' | 'left') => {
    const toX = direction === 'right' ? 1000 : -1000
    translateX.value = withTiming(toX, { duration: 220 }, () => {
      if (direction === 'right') runOnJS(onSwipeRight)(user)
      else runOnJS(onSwipeLeft)(user)
      runOnJS(reset)()
    })
  }, [onSwipeLeft, onSwipeRight, reset, user])

 

  const onGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: (_, ctx: any) => {
      runOnJS(setIsPaused)(true)
      ctx.startX = translateX.value
      ctx.startY = translateY.value
    },
    onActive: (evt, ctx: any) => {
      translateX.value = ctx.startX + evt.translationX
      translateY.value = ctx.startY + evt.translationY
      rotation.value = translateX.value / 20
      likeOpacity.value = translateX.value > 0 ? interpolate(translateX.value, [0, thresholdSV.value], [0, 1]) : 0
      nopeOpacity.value = translateX.value < 0 ? interpolate(translateX.value, [0, -thresholdSV.value], [0, 1]) : 0
      if (onProgress) {
        const f = Math.max(-1, Math.min(1, translateX.value / thresholdSV.value))
        runOnJS(onProgress)(f)
      }
      if (translateX.value > 6) {
        likeGate.value = withTiming(1, { duration: 120 })
        nopeGate.value = withTiming(0, { duration: 120 })
      } else if (translateX.value < -6) {
        nopeGate.value = withTiming(1, { duration: 120 })
        likeGate.value = withTiming(0, { duration: 120 })
      }
    },
    onEnd: () => {
      if (translateX.value > thresholdSV.value) runOnJS(completeSwipe)('right')
      else if (translateX.value < -thresholdSV.value) runOnJS(completeSwipe)('left')
      else {
        translateX.value = withSpring(0)
        translateY.value = withSpring(0)
        rotation.value = withSpring(0)
        likeOpacity.value = withTiming(0)
        nopeOpacity.value = withTiming(0)
        likeGate.value = withTiming(0, { duration: 200 }, () => {})
        nopeGate.value = withTiming(0, { duration: 200 }, () => {})
        if (onProgress) runOnJS(onProgress)(0)
        runOnJS(setIsPaused)(false)
      }
    }
  })

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { rotate: `${rotation.value}deg` }]
  }))

  const likeStyle = useAnimatedStyle(() => ({
    opacity: likeOpacity.value,
    left: 16,
    top: 24,
    zIndex: 5,
    transform: [
      { translateX: interpolate(translateX.value, [0, thresholdSV.value], [-12, 0]) },
      { scale: interpolate(likeOpacity.value, [0, 1], [0.95, 1]) }
    ]
  }))
  const nopeStyle = useAnimatedStyle(() => ({
    opacity: nopeOpacity.value,
    right: 16,
    top: 24,
    zIndex: 5,
    transform: [
      { translateX: interpolate(translateX.value, [0, -thresholdSV.value], [-12, 0]) },
      { scale: interpolate(nopeOpacity.value, [0, 1], [0.95, 1]) }
    ]
  }))

  const bottomLikeStyle = useAnimatedStyle(() => ({
    opacity: likeGate.value * (translateX.value > 0 ? interpolate(translateX.value, [0, thresholdSV.value], [0, 1]) : 0),
    transform: [{ scale: 0.9 + 0.1 * (translateX.value > 0 ? interpolate(translateX.value, [0, thresholdSV.value], [0, 1]) : 0) }]
  }))
  const bottomNopeStyle = useAnimatedStyle(() => ({
    opacity: nopeGate.value * (translateX.value < 0 ? interpolate(translateX.value, [0, -thresholdSV.value], [0, 1]) : 0),
    transform: [{ scale: 0.9 + 0.1 * (translateX.value < 0 ? interpolate(translateX.value, [0, -thresholdSV.value], [0, 1]) : 0) }]
  }))

  

  useEffect(() => {
    setPhotoIndex(0)
    setIsPaused(false)
  }, [user.id])

  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => {
      setPhotoIndex(prev => {
        const next = (prev + 1) % Math.max(1, user.photos.length)
        return next
      })
    }, 3000)
    return () => clearInterval(id)
  }, [isPaused, user.photos.length])

  useImperativeHandle(ref, () => ({
    swipeRight() {
      translateX.value = withTiming(1000, { duration: 220 }, () => {
        runOnJS(onSwipeRight)(user)
        runOnJS(reset)()
      })
    },
    swipeLeft() {
      translateX.value = withTiming(-1000, { duration: 220 }, () => {
        runOnJS(onSwipeLeft)(user)
        runOnJS(reset)()
      })
    }
  }), [onSwipeLeft, onSwipeRight, reset, user])

  const content = (
    <>
      <Image source={{ uri: user.photos[photoIndex] }} style={{ width: '100%', height: 570 }} contentFit="cover" />
      <PhotoProgress count={user.photos.length} activeIndex={photoIndex} />
      <LinearGradient colors={['transparent', 'rgba(0,0,0,0.6)']} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 200 }} />
      <StatusPill label="Online" />
      <Info>
        <NameRow>
          <UiText variant="title" color="background">{user.name}</UiText>
          <UiText variant="title" color="background"> {user.age}</UiText>
        </NameRow>
        <UiText variant="body" color="background" numberOfLines={2}>{user.bio}</UiText>
        <ProfileTagGroup tags={user.tags} />
      </Info>
      <Animated.View style={[{ position: 'absolute' }, likeStyle]}>
        <IndicatorBadge label="LIKE" />
      </Animated.View>
      <Animated.View style={[{ position: 'absolute' }, nopeStyle]}>
        <IndicatorBadge label="NOPE" />
      </Animated.View>
      
    </>
  )

  if (!isSwipeEnabled) return <Card>{content}</Card>

  return (
    <PanGestureHandler onGestureEvent={onGesture}>
      <Stack style={style}>
        <Card onLayout={e => { const w = e.nativeEvent.layout.width; if (w) { thresholdSV.value = w * 0.3; setCardWidth(w) } }}>{content}</Card>
        {(() => {
          const circle = Math.max(56, cardWidth * 0.18)
          const radius = Math.max(28, (cardWidth * 0.18) / 2)
          return (
            <Animated.View style={{ position: 'absolute', left: 0, right: 0, bottom: -circle * 0, alignItems: 'center', justifyContent: 'center', zIndex: 9999 }} pointerEvents="none">
              <Animated.View style={[{ position: 'absolute', zIndex: 9999, elevation: 50 }, bottomLikeStyle]}>
                <LinearGradient colors={["#34D399", "#10B981"]} style={{ width: circle, height: circle, borderRadius: radius, alignItems: 'center', justifyContent: 'center' }}>
                  <Feather name="heart" size={Math.max(26, cardWidth * 0.12)} color="#FFFFFF" />
                </LinearGradient>
              </Animated.View>
              <Animated.View style={[{ position: 'absolute', zIndex: 9999, elevation: 50 }, bottomNopeStyle]}>
                <LinearGradient colors={["#FF6FB1", "#FF2D55"]} style={{ width: circle, height: circle, borderRadius: radius, alignItems: 'center', justifyContent: 'center' }}>
                  <Feather name="x" size={Math.max(26, cardWidth * 0.12)} color="#FFFFFF" />
                </LinearGradient>
              </Animated.View>
            </Animated.View>
          )
        })()}
      </Stack>
    </PanGestureHandler>
  )
})
const Stack = styled(Animated.View)`
  width: 100%;
  position: relative;
`
