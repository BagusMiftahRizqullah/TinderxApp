import React from 'react'
import styled from 'styled-components/native'
import { UiText } from './ui-text'

interface StatusPillProps {
  label: string
}

const Pill = styled.View`
  position: absolute;
  left: 16px;
  top: 12px;
  background-color: #DCFCE7;
  border-radius: 16px;
  padding: 6px 10px;
`

export function StatusPill({ label }: StatusPillProps) {
  return (
    <Pill>
      <UiText variant="caption" color="success">{label}</UiText>
    </Pill>
  )
}

