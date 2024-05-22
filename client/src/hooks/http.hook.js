import { useCallback, useState } from "react"

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
      const response = await fetch(url, {method, body, headers})
      console.log("RESSSSSS", response)
      let data

      if (response.ok) {
        data = await response.json()
      } else {
        // data = response.statusText
        throw new Error(response.statusText)
      }
      setLoading(false)
      return data
    } catch (e) {
      setLoading(false)
      setError(e.message)
      throw e
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return {loading, request, error, clearError}
}
