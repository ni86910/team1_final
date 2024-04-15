import { createContext, useContext, useEffect, useState } from 'react'
import { JWT_LOGIN_POST } from '@/components/common/config'

const AuthContext = createContext()

// 1. 保有登入的狀態
// 2. 登入的功能
// 3. 登出
const logoutState = {
  member_id: 0, // 如果不是 0 表示已經登入
  m_account: '',
  m_name: '',
  token: '',
}

const authStorageKey = 'Fit_U-auth'

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState(logoutState)

  const login = async (m_account, m_pwd) => {
    // 處理登入的狀況
    const r = await fetch(JWT_LOGIN_POST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ m_account, m_pwd }),
    })
    if (!r.ok) return false // 登入沒有成功
    const result = await r.json()
    if (!result.success) return false // 登入沒有成功

    localStorage.setItem(authStorageKey, JSON.stringify(result.data))
    setAuth({ ...result.data })
    return true
  }

  const logout = () => {
    localStorage.removeItem(authStorageKey)
    setAuth({ ...logoutState })
  }

  const getAuthHeader = () => {
    if (auth.id) {
      return {
        Authorization: `Bearer ${auth.token}`,
      }
    }
    return {}
  }

  useEffect(() => {
    const str = localStorage.getItem(authStorageKey)
    if (str) {
      try {
        const localState = JSON.parse(str)
        setAuth(localState)
      } catch (ex) {
        console.log(ex)
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ auth, login, logout, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export default AuthContext
