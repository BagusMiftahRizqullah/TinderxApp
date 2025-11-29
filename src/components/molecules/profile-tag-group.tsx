import React from 'react'
import styled from 'styled-components/native'
import { TagChip } from '../atoms/tag-chip'

interface ProfileTagGroupProps {
  tags: string[]
}

const Wrap = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`

export function ProfileTagGroup({ tags }: ProfileTagGroupProps) {
  return <Wrap>{tags.map(t => <TagChip key={t} label={t} />)}</Wrap>
}

