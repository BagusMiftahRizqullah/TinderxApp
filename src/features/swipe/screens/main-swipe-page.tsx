import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components/native'
import { useOpponentsQuery } from '../../../api/opponent.api'
import { SwipeDeck } from '../../../components/organisms/swipe-deck'
import { useRecoilState } from 'recoil'
import { likedUsersAtom } from '../../../recoil/liked-atoms'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UiText } from '../../../components/atoms/ui-text'
import { Profile } from '../types'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { useActionFeedback } from '../../../components/molecules/action-feedback'
import Animated, { useDerivedValue, useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { useWindowDimensions } from 'react-native'

const dummyProfiles: Profile[] = Array.from({ length: 50 }, (_, i) => {
  const index = i + 1
  const names = ['에스더', 'Mia', 'Luna', 'Noah', 'Emma', 'Ava', 'Kai', 'Leo', 'Ivy', 'Zoe']
  const name = names[i % names.length]
  const age = 22 + (i % 15)
  const bios = [
    '서울에서 운동 좋아해요',
    'Engineer and coffee lover',
    'Photographer and cat person',
    'Traveler and foodie',
    'Designer and reader'
  ]
  const bio = bios[i % bios.length]
  const tags = [['Fitness', 'Coffee'], ['Tech', 'Fitness'], ['Art', 'Cats'], ['Travel', 'Food'], ['Design', 'Books']][i % 5]
  const seed = `${name}-${index}`
  return {
    id: String(index),
    name,
    age,
    bio,
    tags,
    photos: [`https://picsum.photos/seed/${encodeURIComponent(seed)}/600/800`]
  }
})

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

const TopBar = styled.View`
  padding: ${({ theme }) => theme.spacing(12)}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
`

const Brand = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export function MainSwipePage() {
  const { data } = useOpponentsQuery()
  const [likedUsers, setLikedUsers] = useRecoilState(likedUsersAtom)
  const initial = useMemo<Profile[]>(() => dummyProfiles, [])
  const [queue, setQueue] = useState<Profile[]>(initial)
  const [last, setLast] = useState<Profile | null>(null)
  const [controls, setControls] = useState<{ swipeRight: () => void; swipeLeft: () => void } | null>(null)
  const { ActionOverlay, triggerLike, triggerNope } = useActionFeedback({ speed: 1 })
  const dims = useWindowDimensions()
  const progress = useSharedValue(0)
  const hideTimerRef = React.useRef<NodeJS.Timeout | null>(null)
  const likeDV = useDerivedValue(() => withTiming(progress.value > 0 ? Math.min(1, progress.value) : 0, { duration: 180 }))
  const nopeDV = useDerivedValue(() => withTiming(progress.value < 0 ? Math.min(1, -progress.value) : 0, { duration: 180 }))
  const likeStyle = useAnimatedStyle(() => ({ opacity: likeDV.value, transform: [{ scale: 0.9 + 0.1 * likeDV.value }] }))
  const nopeStyle = useAnimatedStyle(() => ({ opacity: nopeDV.value, transform: [{ scale: 0.9 + 0.1 * nopeDV.value }] }))

  useEffect(() => {
    setQueue(initial)
  }, [initial])

  function onLike(user: Profile) {
    setLikedUsers([...likedUsers, user])
    setLast(user)
    setQueue(prev => prev.slice(1))
  }

  function onNope(user: Profile) {
    setLast(user)
    setQueue(prev => prev.slice(1))
  }

  function onUndo() {
    if (!last) return
    setQueue(prev => [last!, ...prev])
    setLast(null)
  }

  return (
    <Container>
      <TopBar>
        <Brand>
          <MaterialCommunityIcons name="fire" size={32} color="#FF5A5F" />
          <UiText variant="subtitle" color="#FF5A5F" size={24}>tinder</UiText>
        </Brand>
      </TopBar>
      <SwipeDeck users={queue} onSwipeRight={onLike} onSwipeLeft={onNope} setControls={setControls} onProgress={(f) => {
        progress.value = f
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
        hideTimerRef.current = setTimeout(() => { progress.value = 0 }, 1000)
      }} />
      <OverlayRow>
        <Circle size={56} onPress={onUndo} accessibilityLabel="Undo">
          <Feather name="rotate-ccw" size={24} color="#9CA3AF" />
        </Circle>
        <Circle size={72} onPress={() => { triggerNope(); if (controls) controls.swipeLeft(); else { const u = queue[0]; if (u) onNope(u) } }} accessibilityLabel="Nope">
          <Feather name="x" size={30} color="#FF2D55" />
        </Circle>
        <Circle size={64} onPress={() => { triggerLike(); if (controls) controls.swipeRight(); else { const u = queue[0]; if (u) onLike(u) } }} accessibilityLabel="Super Like">
          <Feather name="star" size={26} color="#3B82F6" />
        </Circle>
        <Circle size={72} onPress={() => { triggerLike(); if (controls) controls.swipeRight(); else { const u = queue[0]; if (u) onLike(u) } }} accessibilityLabel="Like">
          <Feather name="heart" size={30} color="#34D399" />
        </Circle>
        <Circle size={56} onPress={() => {}} accessibilityLabel="Boost">
          <Feather name="zap" size={24} color="#A855F7" />
        </Circle>
      </OverlayRow>
      <ActionOverlay />
      
    </Container>
  )
}
const OverlayRow = styled.View`
  position: absolute;
  bottom: 24px;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  z-index: 10;
`

const Circle = styled.Pressable<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  background-color: #FFFFFF;
  align-items: center;
  justify-content: center;
  shadow-color: #000000;
  shadow-opacity: 0.12;
  shadow-radius: 12px;
  elevation: 3;
`
