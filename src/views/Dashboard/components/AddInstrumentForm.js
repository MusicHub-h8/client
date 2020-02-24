import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../../store/actions';
import './styles.css';
import axios from '../../../api/axiosInstance';

const AddInstrumentForm = props => {
  const dispatch = useDispatch();
  const [instruments, setInstruments] = useState([]);
  const handleChange = e => {
    if (!e.target.checked) {
      setInstruments(
        instruments.filter(instrument => instrument !== e.target.value)
      );
    } else {
      setInstruments([...instruments, e.target.value]);
    }
  };

  const handleSubmitInstruments = () => {
    const access_token = localStorage.getItem('access_token');
    axios({
      method: 'PATCH',
      url: '/users/instruments',
      data: {
        instruments,
      },
      headers: {
        access_token,
      },
    })
      .then(({ data }) => {
        dispatch(setCurrentUser(data));
        localStorage.setItem('currentUser', JSON.stringify(data));
        props.handleShowForm();
      })
      .catch(console.log);
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
      <h3>Add Intruments</h3>
      <div className='custom-control custom-checkbox'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='Guitar'
          value='Guitar'
          onChange={handleChange}
        />
        <label className='custom-control-label' htmlFor='Guitar'>
          Guitar
        </label>
      </div>
      <div className='custom-control custom-checkbox'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='Bass'
          value='Bass'
          onChange={handleChange}
        />
        <label className='custom-control-label' htmlFor='Bass'>
          Bass
        </label>
      </div>
      <div className='custom-control custom-checkbox'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='Drum'
          value='Drum'
          onChange={handleChange}
        />
        <label className='custom-control-label' htmlFor='Drum'>
          Drum
        </label>
      </div>
      <div className='custom-control custom-checkbox'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='Piano'
          value='Piano'
          onChange={handleChange}
        />
        <label className='custom-control-label' htmlFor='Piano'>
          Piano
        </label>
      </div>
      <div className='custom-control custom-checkbox'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='Keyboard'
          value='Keyboard'
          onChange={handleChange}
        />
        <label className='custom-control-label' htmlFor='Keyboard'>
          Keyboard
        </label>
      </div>
      <div className='custom-control custom-checkbox'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='Vocal'
          value='Vocal'
          onChange={handleChange}
        />
        <label className='custom-control-label' htmlFor='Vocal'>
          Vocal
        </label>
      </div>
      <div className='custom-control custom-checkbox'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='Violin'
          value='Violin'
          onChange={handleChange}
        />
        <label className='custom-control-label' htmlFor='Violin'>
          Violin
        </label>
      </div>
      <div className='custom-control custom-checkbox'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='Acapella'
          value='Acapella'
          onChange={handleChange}
        />
        <label className='custom-control-label' htmlFor='Acapella'>
          Acapella
        </label>
      </div>
      <div className='custom-control custom-checkbox'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='Saxophone'
          value='Saxophone'
          onChange={handleChange}
        />
        <label className='custom-control-label' htmlFor='Saxophone'>
          Saxophone
        </label>
      </div>
      <button
        className='dash-add-btn'
        style={{ marginTop: '16px' }}
        onClick={handleSubmitInstruments}
      >
        Add Instruments
      </button>
    </div>
  );
};

export default AddInstrumentForm;
