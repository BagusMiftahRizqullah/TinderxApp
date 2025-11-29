import React from 'react'
import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'

interface SwipeActionButtonsProps {
  onUndo: () => void
  onNope: () => void
  onLike: () => void
}

const Row = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(16)}px;
`

const Circle = styled.Pressable<{ size: number; bg: string }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  background-color: ${({ bg }) => bg};
  align-items: center;
  justify-content: center;
  shadow-color: #000000;
  shadow-opacity: 0.12;
  shadow-radius: 12px;
  elevation: 3;
`

export function SwipeActionButtons({ onUndo, onNope, onLike }: SwipeActionButtonsProps) {
  return (
    <Row>
      <Circle size={64} bg="#FFFFFF" onPress={onUndo} accessibilityLabel="Undo">
        <Feather name="rotate-ccw" size={28} color="#9CA3AF" />
      </Circle>
      <Circle size={72} bg="#FFFFFF" onPress={onNope} accessibilityLabel="Nope">
        <Feather name="x" size={32} color="#FF5A5F" />
      </Circle>
      <Circle size={72} bg="#FFFFFF" onPress={onLike} accessibilityLabel="Like">
        <Feather name="heart" size={32} color="#34D399" />
      </Circle>
    </Row>
  )
}
