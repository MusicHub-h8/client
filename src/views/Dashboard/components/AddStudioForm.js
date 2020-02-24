import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestAddRoom } from '../../../store/actions';

const AddStudioForm = props => {
  const dispatch = useDispatch();
  const [musicTitle, setMusicTitle] = useState('');
  const [description, setDescription] = useState('');

  const onSubmitAddStudio = event => {
    event.preventDefault();
    const access_token = localStorage.getItem('access_token');
    setMusicTitle('');
    setDescription('');
    props.handleShowForm();
    dispatch(
      requestAddRoom({
        music_title: musicTitle,
        description,
        access_token,
      })
    );
  };

  const handleChangeMusicTitle = event => {
    setMusicTitle(event.target.value);
  };

  const handleChangeDescription = event => {
    setDescription(event.target.value);
  };

  return (
    <div className='add-studio-form'>
      <span
        className='cursor-pointer'
        style={{ alignSelf: 'flex-end' }}
        onClick={props.handleShowForm}
      >
        Cancel
      </span>
      <h1>Add Studio</h1>
      <form action='POST' onSubmit={onSubmitAddStudio}>
        <label htmlFor='musicTitle'>Music Title</label>
        <br />
        <input
          id='musicTitle'
          className='input-form'
          type='text'
          required
          onChange={handleChangeMusicTitle}
          value={musicTitle}
        />
        <br />
        <label htmlFor='description'>Description</label>
        <br />
        <input
          id='description'
          className='input-form'
          type='text'
          onChange={handleChangeDescription}
          value={description}
        />
        <br />
        <input className='submit-add-studio' type='submit' value='Add Studio' />
      </form>
    </div>
  );
};

export default AddStudioForm;
