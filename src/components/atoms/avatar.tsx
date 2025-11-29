import React from 'react'
import styled from 'styled-components/native'
import { Image } from 'expo-image'

interface AvatarProps {
  uri: string
  size?: number
}

const Img = styled(Image)<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
`

export function Avatar({ uri, size = 48 }: AvatarProps) {
  return <Img source={{ uri }} size={size} contentFit="cover" />
}

