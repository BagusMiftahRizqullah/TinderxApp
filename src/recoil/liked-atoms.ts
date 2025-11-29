import { atom } from 'recoil'
import { Profile } from '../features/swipe/types'

export const likedUsersAtom = atom<Profile[]>({
  key: 'likedUsers',
  default: []
})

