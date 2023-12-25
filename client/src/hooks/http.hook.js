import { useState, useCallback } from "react"

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true)
    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
        // headers['Limit'] = '16K'
      }
      const response = await fetch(url, { method, body, headers })
      console.log("ASASASAS", response)
      const data = await response.json()
      console.log("22222222", data)

      if (!response.ok) {
        throw new Error(data.message || 'Response Error')
      }
      setLoading(false)
      return data
    }
    catch (e) {
      setLoading(false)
      setError(e.message)
      throw e
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return { loading, request, error, clearError }
}
