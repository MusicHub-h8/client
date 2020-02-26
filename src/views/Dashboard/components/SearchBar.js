import React, { useState } from 'react'
import './styles.css'
export default function Searchbar(props) {
  const [keyword, setKeyword] = useState('')

  const handleChange = (event) => {
    setKeyword(event.target.value)
    props.searchByRoomTitle(event.target.value)
  }

  return (
    <div>
      <form>
        <input
          className='searchBar'
          type='search'
          autoComplete='off'
          value={keyword}
          onChange={(event) => handleChange(event)}
          name='search'
          placeholder='Search by room title'
        ></input>
      </form>
    </div>
  )
}
