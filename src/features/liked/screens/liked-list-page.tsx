import React from 'react'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRecoilValue } from 'recoil'
import { likedUsersAtom } from '../../../recoil/liked-atoms'
import { LikedUserListGrid } from '../../../components/organisms/liked-user-list-grid'
import { UiText } from '../../../components/atoms/ui-text'

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

const Empty = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export function LikedListPage() {
  const liked = useRecoilValue(likedUsersAtom)
  if (!liked.length) {
    return (
      <Container>
        <Empty>
          <UiText variant="title">No Likes Yet</UiText>
          <UiText variant="body" color="textSecondary">Start swiping to like profiles</UiText>
        </Empty>
      </Container>
    )
  }
  return (
    <Container>
      <LikedUserListGrid users={liked} />
    </Container>
  )
}

