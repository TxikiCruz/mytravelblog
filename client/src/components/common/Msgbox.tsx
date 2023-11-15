import { useEffect, useState } from "react"

export type ParamsMsgBox = {
  body: string
  classname: string
}

const Msgbox = ({ body, classname }: ParamsMsgBox) => {
  const [msg, setMsg] = useState('')

  useEffect(() => {
    setMsg(body)

    const timer = setTimeout(() => {
      setMsg('')
    }, 3000)
    return () => clearTimeout(timer)
  }, [body])

  return <div className={`modal ${classname && msg && 'on'}`}>
    <div className="modal_content">
      <p className={`msg ${classname}`}>{msg}</p>
    </div>
  </div>
}

export default Msgbox