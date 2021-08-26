import { useEffect, useRef } from 'react'

function useRefreshInterval(fn: any, timer: number | null, allowAutoRefresh: boolean) {
  const localCallback = useRef(fn)

  useEffect(() => {
    localCallback.current = fn
  }, [fn])

  useEffect(() => {
    let id;
    if(allowAutoRefresh) {
      //Return if timer not specified
      if (!timer && timer !== 0) {
        return;
      }
       id = setInterval(() => {localCallback.current()}, timer)
    }
    return () => {
      clearInterval(id)
    }
  }, [timer, allowAutoRefresh])
}

export default useRefreshInterval