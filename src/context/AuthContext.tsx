import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "@/config/firebase"
import { User } from "firebase/auth"

interface AuthContextType {
  currentUser: User | null
}

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return authContext
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const value: AuthContextType = {
    currentUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
