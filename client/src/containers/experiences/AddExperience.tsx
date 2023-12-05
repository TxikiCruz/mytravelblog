import { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import { URL } from '../../config'
import { Experience } from '../../store/slice-experiences'
import SelectCategories from '../../components/common/SelectCategories'
import Msgbox, { ParamsMsgBox } from '../../components/common/Msgbox'
import ImageUpload from '../ImageUpload'

type PropsAddExperience = {
  user: string
  handleFetchExperiences: () => void
  isFormAddVisible: boolean
}

const AddExperience = ({ user, handleFetchExperiences, isFormAddVisible }: PropsAddExperience) => {
  const [values, setValues] = useState<Experience>()
  //const [selectedFile, setSelectedFile] = useState(null)
  const [selectedFilename, setSelectedFilename] = useState(null)
  //const [isFileValid, setIsFileValid] = useState(false)
  //const [loadingFile, setLoadingFile] = useState(false)
  const loadingFile = false
  const [message, setMessage] = useState<ParamsMsgBox>({body: '', classname: ''})

  const handleChangeNew = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.currentTarget
    if (target) setValues({ ...values, [target.name]: target.value })
  }

  const handleSubmitNew = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (!loadingFile) {
        await axios.post(`${URL}/admin/experiences/add`, { 
          user: user, 
          title: values.title, 
          category: values.category, 
          image: selectedFilename, 
          content: values.content
        })
        setMessage({ body: `New Experience added!`, classname: 'msg_ok' })
        handleFetchExperiences()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return <div className="content_add">
  {isFormAddVisible &&
    <form className="form" onSubmit={handleSubmitNew}>
      <input 
        type="text" 
        name="title" 
        className="form_control" 
        placeholder="Write your title" 
        onChange={handleChangeNew} 
      />
      <textarea 
        name="content" 
        className="form_control" 
        placeholder="Write your content" 
        onChange={handleChangeNew} 
        maxLength={500}
      />

      <SelectCategories handleChange={handleChangeNew} />

      <ImageUpload setSelectedFilename={setSelectedFilename} isImageWithTitle={false} />

      <button className="btn btn_admin">Add</button>
    </form>
  }

  <Msgbox body={message.body} classname={message.classname} />
</div>
}

export default AddExperience
