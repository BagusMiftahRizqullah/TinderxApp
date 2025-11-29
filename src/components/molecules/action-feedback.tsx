import React, { useCallback, useEffect, useMemo } from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming, runOnJS } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import * as Haptics from 'expo-haptics'
import { Audio } from 'expo-av'

interface UseActionFeedbackOptions {
  speed?: 0.5 | 1 | 2
}

const Overlay = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 120px;
  align-items: center;
  justify-content: center;
  z-index: 20;
  pointer-events: none;
`

const IconWrap = styled(Animated.View)`
  align-items: center;
  justify-content: center;
`

const CrossBar = styled(Animated.View)`
  position: absolute;
  width: 82px;
  height: 14px;
  border-radius: 7px;
  background-color: #ffffff;
  shadow-color: #000000;
  shadow-opacity: 0.12;
  shadow-radius: 10px;
`

function useSound(uri: string) {
  const soundRef = React.useRef<Audio.Sound | null>(null)
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const { sound } = await Audio.Sound.createAsync({ uri }, { volume: 0.6 })
        if (mounted) soundRef.current = sound
      } catch (e) {
        // ignore when native module not available; keep silent fallback
      }
    })()
    return () => {
      mounted = false
      soundRef.current?.unloadAsync().catch(() => {})
    }
  }, [uri])
  return React.useCallback(() => {
    soundRef.current?.replayAsync()
  }, [])
}

export function useActionFeedback(opts: UseActionFeedbackOptions = {}) {
  const speed = opts.speed ?? 1
  const likeProg = useSharedValue(0)
  const nopeProg = useSharedValue(0)
  const durationBase = 400
  const likeDuration = Math.max(300, Math.min(500, durationBase / (1 / speed)))
  const nopeDuration = Math.max(300, Math.min(500, durationBase / (1 / speed)))

  const playLikeSound = useSound('https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3')
  const playNopeSound = useSound('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3')

  const triggerLike = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    playLikeSound()
    likeProg.value = 0
    likeProg.value = withTiming(1, { duration: likeDuration, easing: Easing.out(Easing.cubic) })
  }, [likeDuration])

  const triggerNope = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    playNopeSound()
    nopeProg.value = 0
    nopeProg.value = withTiming(1, { duration: nopeDuration, easing: Easing.inOut(Easing.cubic) })
  }, [nopeDuration])

  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(likeProg.value, [0, 0.2, 1], [0, 1, 0]),
    transform: [
      { scale: interpolate(likeProg.value, [0, 0.6, 1], [0.6, 1.15, 1]) },
      { translateY: interpolate(likeProg.value, [0, 1], [12, -4]) }
    ]
  }))

  const shineStyle = useAnimatedStyle(() => ({
    opacity: interpolate(likeProg.value, [0, 0.4, 1], [0, 1, 0]),
    transform: [
      { scale: interpolate(likeProg.value, [0, 1], [0.6, 1.3]) },
      { rotate: `${interpolate(likeProg.value, [0, 1], [0, 45])}deg` }
    ]
  }))

  const crossAStyle = useAnimatedStyle(() => ({
    opacity: interpolate(nopeProg.value, [0, 0.1, 1], [0, 1, 0]),
    transform: [
      { rotate: `${interpolate(nopeProg.value, [0, 1], [45, 35])}deg` },
      { scale: interpolate(nopeProg.value, [0, 0.7, 1], [0.5, 1, 1.15]) }
    ]
  }))
  const crossBStyle = useAnimatedStyle(() => ({
    opacity: interpolate(nopeProg.value, [0, 0.1, 1], [0, 1, 0]),
    transform: [
      { rotate: `${interpolate(nopeProg.value, [0, 1], [-45, -35])}deg` },
      { scale: interpolate(nopeProg.value, [0, 0.7, 1], [0.5, 1, 1.15]) }
    ]
  }))

  const shards = Array.from({ length: 8 }).map((_, i) => ({
    key: i,
    style: useAnimatedStyle(() => ({
      opacity: interpolate(nopeProg.value, [0, 0.2, 1], [0, 1, 0]),
      position: 'absolute' as const,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: i % 2 === 0 ? '#7C3AED' : '#3B82F6',
      transform: [
        { translateX: interpolate(nopeProg.value, [0, 1], [0, Math.cos((i / 8) * Math.PI * 2) * 36]) },
        { translateY: interpolate(nopeProg.value, [0, 1], [0, Math.sin((i / 8) * Math.PI * 2) * 18]) },
        { scale: interpolate(nopeProg.value, [0, 1], [0.6, 1]) }
      ]
    }))
  }))

  function ActionOverlay() {
    return (
      <Overlay>
        <IconWrap style={likeStyle}>
          <LinearGradient colors={["#FF6FB1", "#FF3B30"]} style={{ width: 84, height: 84, borderRadius: 42, alignItems: 'center', justifyContent: 'center' }}>
            <LinearGradient colors={["#FFFFFFAA", "#FFFFFF00"]} style={{ position: 'absolute', width: 60, height: 60, borderRadius: 30 }} />
            <Animated.Text style={{ color: '#FFFFFF', fontSize: 36, fontWeight: '700' }}>❤</Animated.Text>
          </LinearGradient>
          <IconWrap style={[shineStyle, { position: 'absolute' }]}> 
            <LinearGradient colors={["#FFFFFF80", "#FFFFFF00"]} style={{ width: 100, height: 14, borderRadius: 7 }} />
          </IconWrap>
        </IconWrap>

        <IconWrap style={[{ marginTop: 0 }, crossAStyle]}>
          <CrossBar />
        </IconWrap>
        <IconWrap style={[{ marginTop: 0 }, crossBStyle]}>
          <CrossBar />
        </IconWrap>
        {shards.map(s => (
          <Animated.View key={s.key} style={s.style} />
        ))}
      </Overlay>
    )
  }

  return { ActionOverlay, triggerLike, triggerNope }
}
