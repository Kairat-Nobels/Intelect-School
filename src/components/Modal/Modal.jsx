import React, { useState } from 'react';
import styles from './modal.module.css';
import SuccessMessage from '../SuccessMessage/SuccessMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { createRecord } from '../../redux/slices/recordSlice';
import SpinnerModal from '../SpinnerModal/SpinnerModal';

const Modal = ({ setModal }) => {
  const [result, setResult] = useState(false);
  const [childFullName, setChildFullName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [classApplyingTo, setClassApplyingTo] = useState('');
  const [parentFullName, setParentFullName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [comment, setComment] = useState('');
  console.log('first');

  const dispatch = useDispatch();
  const { error, loading, success } = useSelector(state => state.recordsReducer);

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(true);
    const application = {
      childFullName,
      childAge: Number(childAge),
      classApplyingTo,
      parentFullName,
      parentPhone,
      comment,
    };
    dispatch(createRecord(application));
  };

  const handleClose = () => {
    document.body.style.overflow = '';
    setModal(false);
  };

  return (
    <div className={styles.window}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2>Заявка на поступление</h2>
        <section onClick={handleClose} className={styles.closeX}>X</section>

        {result ? (
          loading ? (
            <div className={styles.loading}>
              <p>Отправка...</p>
            </div>
          ) : (
            <div className={styles.message}>
              <button type='button' className={styles.closeBtn} onClick={handleClose}>X</button>
              {error ? <ErrorMessage message={error} /> : <SuccessMessage message={success || "Заявка успешно отправлена!"} />}
            </div>
          )
        ) : (
          <>
            <div className="form-group">
              <label>ФИО ребёнка:</label>
              <input
                type="text"
                value={childFullName}
                onChange={e => setChildFullName(e.target.value)}
                required
                placeholder="Иванов Артём Сергеевич"
              />
            </div>
            <div className="form-group">
              <label>Возраст ребёнка:</label>
              <input
                type="number"
                min={1}
                value={childAge}
                onChange={e => setChildAge(e.target.value)}
                required
                placeholder="10"
              />
            </div>
            <div className="form-group">
              <label>Класс для поступления:</label>
              <input
                type="text"
                value={classApplyingTo}
                onChange={e => setClassApplyingTo(e.target.value)}
                required
                placeholder="5А"
              />
            </div>
            <div className="form-group">
              <label>ФИО родителя:</label>
              <input
                type="text"
                value={parentFullName}
                onChange={e => setParentFullName(e.target.value)}
                required
                placeholder="Иванова Наталья Викторовна"
              />
            </div>
            <div className="form-group">
              <label>Телефон родителя:</label>
              <input
                type="tel"
                value={parentPhone}
                onChange={e => setParentPhone(e.target.value)}
                required
                placeholder="+996502551167"
              />
            </div>
            <div className="form-group">
              <label>Комментарий:</label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Ваш комментарий (необязательно)"
                rows={3}
              />
            </div>
            <button type="submit">Отправить заявку</button>
          </>
        )}
      </form>
    </div>
  );
};

export default Modal;
