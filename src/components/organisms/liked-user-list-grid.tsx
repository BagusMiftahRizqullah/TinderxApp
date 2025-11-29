import React from 'react'
import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import { SwipeCard } from './swipe-card'
import { Profile } from '../../features/swipe/types'

interface LikedUserListGridProps {
  users: Profile[]
}

const Wrap = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(16)}px;
`

export function LikedUserListGrid({ users }: LikedUserListGridProps) {
  const renderItem = ({ item }: { item: Profile }) => <SwipeCard user={item} isSwipeEnabled={false} onSwipeLeft={() => {}} onSwipeRight={() => {}} />
  return (
    <Wrap>
      <FlatList data={users} renderItem={renderItem} keyExtractor={u => u.id} />
    </Wrap>
  )
}

