import React from 'react'
import styled from 'styled-components/native'

interface PhotoProgressProps {
  count: number
  activeIndex: number
}

const Wrap = styled.View`
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  flex-direction: row;
  gap: 6px;
  z-index: 5;
`

const Segment = styled.View<{ active: boolean }>`
  flex: 1;
  height: 6px;
  border-radius: 4px;
  background-color: ${({ active }) => (active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.35)')};
`

export function PhotoProgress({ count, activeIndex }: PhotoProgressProps) {
  return (
    <Wrap>
      {Array.from({ length: count }).map((_, i) => (
        <Segment key={i} active={i === activeIndex} />
      ))}
    </Wrap>
  )
}

