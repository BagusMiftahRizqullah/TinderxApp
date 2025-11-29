import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { Profile } from '../features/swipe/types'

const OpponentSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number(),
  bio: z.string(),
  tags: z.array(z.string()),
  photos: z.array(z.string())
})

export function fetchOpponents(): Promise<Profile[]> {
  const data: Profile[] = [
    {
      id: '1',
      name: '에스더',
      age: 30,
      bio: '서울에서 운동 좋아해요',
      tags: ['Fitness', 'Coffee'],
      photos: [
        'https://picsum.photos/seed/esther/600/800',
        'https://picsum.photos/seed/esther2/600/800',
        'https://picsum.photos/seed/esther3/600/800'
      ]
    },
    {
      id: '2',
      name: 'Mia',
      age: 27,
      bio: 'Engineer',
      tags: ['Tech', 'Fitness'],
      photos: [
        'https://picsum.photos/seed/mia/600/800',
        'https://picsum.photos/seed/mia2/600/800',
        'https://picsum.photos/seed/mia3/600/800'
      ]
    },
    {
      id: '3',
      name: 'Luna',
      age: 24,
      bio: 'Photographer',
      tags: ['Art', 'Cats'],
      photos: [
        'https://picsum.photos/seed/luna/600/800',
        'https://picsum.photos/seed/luna2/600/800',
        'https://picsum.photos/seed/luna3/600/800'
      ]
    },
    {
      id: '4',
      name: 'Noah',
      age: 29,
      bio: 'Traveler',
      tags: ['Travel', 'Food'],
      photos: [
        'https://picsum.photos/seed/noah/600/800',
        'https://picsum.photos/seed/noah2/600/800',
        'https://picsum.photos/seed/noah3/600/800'
      ]
    },
    {
      id: '5',
      name: 'Emma',
      age: 26,
      bio: 'Designer',
      tags: ['Design', 'Books'],
      photos: [
        'https://picsum.photos/seed/emma/600/800',
        'https://picsum.photos/seed/emma2/600/800',
        'https://picsum.photos/seed/emma3/600/800'
      ]
    },
    {
      id: '6',
      name: 'Leo',
      age: 28,
      bio: 'Barista',
      tags: ['Coffee', 'Music'],
      photos: [
        'https://picsum.photos/seed/leo/600/800',
        'https://picsum.photos/seed/leo2/600/800',
        'https://picsum.photos/seed/leo3/600/800'
      ]
    },
    {
      id: '7',
      name: 'Ava',
      age: 25,
      bio: 'Designer & runner',
      tags: ['Art', 'Run'],
      photos: [
        'https://picsum.photos/seed/ava/600/800',
        'https://picsum.photos/seed/ava2/600/800'
      ]
    },
    {
      id: '8',
      name: 'Kai',
      age: 31,
      bio: 'Foodie explorer',
      tags: ['Food', 'Travel'],
      photos: [
        'https://picsum.photos/seed/kai/600/800',
        'https://picsum.photos/seed/kai2/600/800'
      ]
    }
  ]
  data.forEach(p => OpponentSchema.parse(p))
  return Promise.resolve(data)
}

export function useOpponentsQuery() {
  return useQuery<Profile[]>({ queryKey: ['opponents'], queryFn: fetchOpponents })
}
