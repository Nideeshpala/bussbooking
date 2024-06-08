import React, { createContext, useState } from 'react'

export const registerContext = createContext()
export const loginContext = createContext()
export const userdetContext = createContext()
export const BussContext = createContext()
export const bookedContext = createContext()
export const pdfContext = createContext()

export const selectedticketContext = createContext()


function Contextshare({ children }) {

  const [registerData, setregisterData] = useState("")
  const [loginData, setloginData] = useState("")
  const [bus, setbus] = useState("")
  const [booked, setbooked] = useState("")
  const [bok, setbok] = useState("")
  const [selectedticketdetails, setselectedticketdetails] = useState("")
  return (
    <div>
      <registerContext.Provider value={{ registerData, setregisterData }}>
        <loginContext.Provider value={{ loginData, setloginData }}>
          <BussContext.Provider value={{ bus, setbus }}>
            <bookedContext.Provider value={{ booked, setbooked }}>
              <pdfContext.Provider value={{ bok, setbok }}>
                <selectedticketContext.Provider value={{ selectedticketdetails,setselectedticketdetails }}>
                  {children}
                </selectedticketContext.Provider>
              </pdfContext.Provider>
            </bookedContext.Provider>
          </BussContext.Provider>
        </loginContext.Provider>
      </registerContext.Provider>
    </div>
  )
}

export default Contextshare