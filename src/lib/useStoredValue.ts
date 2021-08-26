import { useEffect, useRef, useState } from 'react'

function useStoredValue(value: string, type?: string) {
  const [prevArray, setPrevArray] = useState<string[]>([]);
  let [current, setCurrent] = useState("");
  const [nextArray, setNextArray] = useState<string[]>([]);

  useEffect(() => {
    if(value !== current) {
      if(current !== "") {
        setPrevArray([...prevArray, current]);
      }
      setCurrent(value);
    }

    if(type == "prev") {
      setNextArray([...nextArray, current]);
      setCurrent(prevArray.pop() as string);
    }else if(type == "next") {
      setPrevArray([...prevArray, current]);
      setCurrent(nextArray.pop() as string);
    }
  },[type, value])
  return [prevArray.length, current, nextArray.length];
}

export default useStoredValue;