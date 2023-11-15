import { useState, useEffect } from 'react'
import axios from 'axios'
import { sortBy } from 'lodash'
import { MdDelete, MdEdit, MdClose, MdCheckCircleOutline } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../hooks/useDispatchSelector'
import { Cat, fetchCats, catsSelector } from '../store/slice-categories'
//import { useSelector, useDispatch } from 'react-redux'
//import { getCats, getCatsStatus, getCatsError, fetchCats } from '../store/slice-categories'
import { URL } from '../config'
import SelectContinent from '../components/common/SelectContinent'
import Pagination from '../components/common/Pagination'
import Msgbox from '../components/common/Msgbox'

const Categories = () => {
  // fetch Categories
  const [cats, setCats] = useState<Array<Cat>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const selectedCats = useAppSelector(catsSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setLoading(selectedCats.loading)
    setError(selectedCats.error)
    setCats(selectedCats.cats)
  }, [selectedCats])

  function handleFetchCats() {
    dispatch(fetchCats())
  }

  useEffect(() => {
    handleFetchCats()
  }, [])
  
  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const sortedCats = sortBy(cats, [cat => cat.name.toLowerCase()])
  const currentCats = sortedCats.slice(indexOfFirstItem, indexOfLastItem)
  const paginate = (i: number) => setCurrentPage(i)

  // handle form events
  const [valueInputAdd, setValueInputAdd] = useState('')
  const [valueInputUpdate, setValueInputUpdate] = useState('')
  const [message, setMessage] = useState({ body: '', classname: '' })
  const [updateActive, setUpdateActive] = useState<string | null>(null)
  const reg = /^[A-Za-z\s]+$/

  //const dispatch = useDispatch()
  //const cats = useSelector(getCats)
  //const catsStatus = useSelector(getCatsStatus)
  //const error = useSelector(getCatsError)

  // useEffect(() => {
  //   if (catsStatus === 'idle') {
  //     dispatch(fetchCats())
  //   }

  //   if (error) {
  //     console.log(error)
  //   }
  // }, [catsStatus, dispatch])

  const handleChangeInputAdd = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.currentTarget
    if (target) setValueInputAdd(target.value)
  }

  const handleChangeInputUpdate = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.currentTarget
    if (target) setValueInputUpdate(target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      let url = `${URL}/admin/categories/add`
      let result = cats.findIndex(item => item.name === valueInputAdd)

      if (result === -1) {
        if (reg.exec(valueInputAdd)) {
          await axios.post(url, { name: valueInputAdd })
          handleFetchCats()
          setMessage({ body: `Category ${valueInputAdd} added!`, classname: 'msg_ok' })
        } else {
          setMessage({ body: 'The category has to be a text', classname: 'msg_error' })
        }
      } else {
        setMessage({ body: 'The category already exists', classname: 'msg_error' })
      }

      setValueInputAdd('')
    } catch (error) {
      console.log(error)
    }
  }

  const onClickDelete = async (ele: Cat) => {
    setUpdateActive(null)
    try {
      let url = `${URL}/admin/categories/delete`
      await axios.post(url, { name: ele.name })
      handleFetchCats()
      setMessage({ body: `Category ${ele.name} deleted!`, classname: 'msg_ok' })
    } catch (error) {
      console.log(error)
    }
  }

  const onClickShowUpdate = async (idx: string) => {
    setUpdateActive(idx)
  }

  const onClickCloseUpdate = async () => {
    setUpdateActive(null)
  }

  const onClickUpdate = async (ele: Cat) => {
    try {
      let url = `${URL}/admin/categories/update`
      if (reg.exec(valueInputUpdate)) {
        await axios.post(url, { name: ele.name, newName: valueInputUpdate })
        handleFetchCats()  
        setUpdateActive(null)
        setValueInputUpdate('')
        setMessage({ body: `Category ${ele.name} updated to ${valueInputUpdate}!`, classname: 'msg_ok' })
      } else {
        setMessage({ body: `Write a correct category`, classname: 'msg_error' })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return <div className="content cats">
    <div className="content_top">
      <h2 className="content_top_title">Categories</h2>
    </div>

    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="form_control" 
          placeholder="Write your category" 
          value={valueInputAdd}
          onChange={handleChangeInputAdd} 
        />

        <SelectContinent />
        
        <button className="btn btn_admin">Add new category</button>
      </form>
    </div>

    <div className="table">
      <div className="tRow tHead">
        <div className="tCol w30">
          <span><strong>Category</strong></span>
        </div>
        <div className="tCol w40">
          <span><strong>Continent</strong></span>
        </div>
        <div className="tCol w30 right">
          <span><strong>Actions</strong></span>
        </div>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      {
        currentCats.length > 0 && currentCats.map((ele) => {
          return <div className="tRow" key={ele._id}>
            <div className="tCol w30">
              <span>{ele.name}</span>
            </div>
            <div className="tCol w40">
              <span>{ele.continent}</span>
              {updateActive === ele._id ?
                <input 
                  type="text" 
                  className="form_control" 
                  placeholder="Write the new category" 
                  value={valueInputUpdate}
                  onChange={handleChangeInputUpdate} 
                />
                : null}
            </div>
            <div className="tCol w30">
              <div className="icons">
                {updateActive !== ele._id ?
                  <button 
                    type="button"
                    className="btn_action" 
                    onClick={() => onClickShowUpdate(ele._id)} 
                    title="Edit"
                  >
                    <MdEdit />
                  </button>
                  : null}
                {updateActive === ele._id ?
                  <>
                    <button 
                      type="button" 
                      className="btn_action green" 
                      onClick={() => onClickUpdate(ele)} 
                      title="Save"
                    >
                      <MdCheckCircleOutline />
                    </button>
                    <button 
                      type="button" 
                      className="btn_action" 
                      onClick={onClickCloseUpdate} 
                      title="Close"
                    >
                      <MdClose />
                    </button>
                  </> : null}

                  <button 
                    type="button" 
                    className="btn_action" 
                    onClick={() => onClickDelete(ele)} 
                    title="Remove"
                  >
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        })
      }
    </div>

    {
      cats.length > 0 && cats.length > itemsPerPage &&

      <Pagination
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalItems={cats.length}
        paginate={paginate}
      />
    }

    <Msgbox message={message.body} classname={message.classname} />
  </div>
}

export default Categories
