// utils/uploadImage.js
import { API_SERVER } from '@/components/common/config'

export const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await fetch(`${API_SERVER}/upload/profile-image`, {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      const data = await response.json()
      return data.imageUrl
    } else {
      console.error('頭像上傳失敗')
      return null
    }
  } catch (error) {
    console.error('頭像上傳時出錯:', error)
    return null
  }
}
