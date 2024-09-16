import { useQuery } from '@tanstack/react-query'
import { NasaApodResponse } from '@/types.ts'

const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY

export const useDailyPicture = () => {
  const { isLoading, error, data } = useQuery<NasaApodResponse, Error>({
    queryKey: ['dailyPicture'],
    queryFn: () =>
      fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`).then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json()
      }),
  })

  const imageUrl = data && data.media_type === 'image' ? data.url : null
  const hdUrl = data && data.media_type === 'image' ? data.hdurl : null

  return { isLoading, error, imageUrl, hdUrl }
}
