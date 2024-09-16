import { useDailyPicture } from '../hooks/useDailyPicture'
import styles from './DailyPictureBackground.module.css'

const DailyPictureBackground = () => {
  const { isLoading, error, imageUrl } = useDailyPicture()

  if (isLoading) {
    return <p>Loading background image...</p>
  }

  if (error) {
    return <p>Something went wrong: {error.message}</p>
  }

  return (
    <div
      className={styles.backgroundContainer}
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
  )
}

export default DailyPictureBackground
