import React, { createContext, useState } from 'react'

export const registerContext = createContext()
export const loginContext = createContext()
export const userdetContext = createContext()
export const BussContext=createContext()

function Contextshare({ children }) {

  const [registerData, setregisterData] = useState("")
  const [loginData, setloginData] = useState("")
  const [bus,setbus]=useState("")
  return (
    <div>
      <registerContext.Provider value={{ registerData, setregisterData }}>
        <loginContext.Provider value={{ loginData, setloginData }}>
          <BussContext.Provider value={{ bus,setbus }}>
            {children}
          </BussContext.Provider>
        </loginContext.Provider>
      </registerContext.Provider>
    </div>
  )
}

export default Contextshare