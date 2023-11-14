import { useState } from 'react'
import axios from 'axios'
import { URL } from '../../config'
import SelectCategories from '../../components/common/SelectCategories'
import Msgbox from '../../components/common/Msgbox'
import ImageUpload from '../ImageUpload'

const AddExperience = ({ user, handleFetchExperiences, isFormAddVisible }) => {
  const [values, setValues] = useState({ title: '', category: '', content: '' })
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedFilename, setSelectedFilename] = useState(null)
  const [isFileValid, setIsFileValid] = useState(false)
  const [loadingFile, setLoadingFile] = useState(false)
  const [message, setMessage] = useState({ body: '', classname: '' })

  const handleChangeNew = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmitNew = async (e) => {
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
      //setMessage({ body: 'Write a title and a category', classname: 'msg_error' })
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
      />

      <SelectCategories handleChange={handleChangeNew} />

      <ImageUpload setSelectedFilename={setSelectedFilename} isImageWithTitle={false} />

      <button className="btn btn_admin">Add</button>
    </form>
  }

  <Msgbox message={message.body} classname={message.classname} />
</div>
}

export default AddExperience
