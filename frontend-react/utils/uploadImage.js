// utils/uploadImage.js
import { API_SERVER } from '@/components/common/config'

export const uploadImage = async (file,profile) => {
  const formData = new FormData()
  formData.append('avatar', file)
  formData.append('member_id', profile.member_id)

  try {
    const response = await fetch(`${API_SERVER}/profile/upload/avatar`, {
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
