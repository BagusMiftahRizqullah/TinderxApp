import React from 'react'
import { Image } from 'expo-image'
import styled from 'styled-components/native'

interface ImageCarouselProps {
  images: string[]
  height?: number
}

const Wrap = styled.View`
  width: 100%;
`

export function ImageCarousel({ images, height = 520 }: ImageCarouselProps) {
  return (
    <Wrap>
      <Image source={{ uri: images[0] }} style={{ width: '100%', height }} contentFit="cover" />
    </Wrap>
  )
}

