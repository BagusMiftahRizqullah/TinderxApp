import React, { useEffect, useRef } from 'react'
import styled from 'styled-components/native'
import { SwipeCard, SwipeCardHandle } from './swipe-card'
import { Profile } from '../../features/swipe/types'
import Animated, { FadeInUp } from 'react-native-reanimated'

interface SwipeDeckProps {
  users: Profile[]
  onSwipeRight: (user: Profile) => void
  onSwipeLeft: (user: Profile) => void
  setControls?: (controls: { swipeRight: () => void; swipeLeft: () => void }) => void
  onProgress?: (fraction: number) => void
}

const Deck = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(16)}px;
`

export function SwipeDeck({ users, onSwipeRight, onSwipeLeft, setControls, onProgress }: SwipeDeckProps) {
  const top = users[0]
  if (!top) return <Deck />
  const cardRef = useRef<SwipeCardHandle>(null)
  useEffect(() => {
    if (!setControls) return
    setControls({
      swipeRight: () => cardRef.current?.swipeRight(),
      swipeLeft: () => cardRef.current?.swipeLeft()
    })
  }, [setControls, top?.id])
  return (
    <Deck>
      <Animated.View key={top.id} entering={FadeInUp.duration(240).springify()} style={{ width: '100%' }}>
        <SwipeCard ref={cardRef} user={top} onSwipeRight={onSwipeRight} onSwipeLeft={onSwipeLeft} onProgress={onProgress} />
      </Animated.View>
    </Deck>
  )
}
