import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew } from '../../actions/event';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');
const now = moment().minute(0).second(0).add(1, 'hours');
const dateEnd = now.clone().add(1, 'hours');

export const CalendarModal = () => {
  const { modalOpen } = useSelector((state) => state.ui);
  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateFinish, setDateFinish] = useState(dateEnd.toDate());
  const [isValidTitle, setIsValidTitle] = useState(true);
  const [formValue, setFormValue] = useState({
    title: 'Evento',
    notes: '',
    start: now.toDate(),
    end: dateEnd.toDate(),
  });
  const { title, notes, start, end } = formValue;
  const handleInputChange = ({ target }) => {
    setFormValue({ ...formValue, [target.name]: target.value });
  };
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(uiCloseModal());
  };
  const handleStartDdateChange = (e) => {
    setDateStart(e);
    setFormValue({ ...formValue, start: e });
  };
  const handelFinishDateChange = (e) => {
    setDateFinish(e);
    setFormValue({ ...formValue, end: e });
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    const momentStart = moment(start);
    const momentEnd = moment(end);
    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        'Error',
        'La fecha fin debe de ser mayor a la fecha de inicio',
        'error'
      );
    }
    if (title.trim().length < 1) {
      setIsValidTitle(false);
    }
    dispatch(
      eventAddNew({
        ...formValue,
        id: new Date().getTime(),
        user: { _id: '123', name: 'Pepe' },
      })
    );
    setIsValidTitle(true);
    closeModal();
  };
  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className='modal'
      overlayClassName='modal-fondo'
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className='container' onSubmit={handelSubmit}>
        <div className='form-group'>
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDdateChange}
            value={dateStart}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handelFinishDateChange}
            value={dateFinish}
            minDate={dateStart}
            className='form-control'
          />
        </div>

        <hr />
        <div className='form-group'>
          <label>Titulo y notas</label>
          <input
            type='text'
            className={`form-control ${!isValidTitle && 'is-invalid'}`}
            placeholder='Título del evento'
            name='title'
            value={title}
            autoComplete='off'
            onChange={handleInputChange}
          />
          <small id='emailHelp' className='form-text text-muted'>
            Una descripción corta
          </small>
        </div>

        <div className='form-group'>
          <textarea
            type='text'
            className='form-control'
            placeholder='Notas'
            rows='5'
            name='notes'
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id='emailHelp' className='form-text text-muted'>
            Información adicional
          </small>
        </div>

        <button type='submit' className='btn btn-outline-primary btn-block'>
          <i className='far fa-save'></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
