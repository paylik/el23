import { useCallback } from 'react'

export const useMessage = (toast) => {
  return useCallback((text) => {
    if (text) toast.current.show({severity:'error', summary: 'None', detail: text, life: 3000})
  }, [toast])
}
