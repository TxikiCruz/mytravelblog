import { useEffect, useState } from "react"

type ParamsMsgBox = {
  message: string
  classname: string
}

const Msgbox = ({ message, classname }: ParamsMsgBox) => {
  const [msg, setMsg] = useState('')

  useEffect(() => {
    setMsg(message)

    const timer = setTimeout(() => {
      setMsg('')
    }, 3000)
    return () => clearTimeout(timer)
  }, [message])

  return <div className={`modal ${classname && msg && 'on'}`}>
    <div className="modal_content">
      <p className={`msg ${classname}`}>{msg}</p>
    </div>
  </div>
}

export default Msgbox