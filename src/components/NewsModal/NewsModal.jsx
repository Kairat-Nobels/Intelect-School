import React, { useEffect, useState, useRef } from 'react';
import { Modal, Form, Button, Input, DatePicker, Uploader } from 'rsuite';
import { createNews, updateNews } from '../../redux/slices/newsSlice';
import { useDispatch } from 'react-redux';

const emptyNews = {
  title: '',
  subtitle: '',
  text: '',
  date: '',
  image: ''
};

const NewsModal = ({ open, onClose, newsData }) => {
  const isEdit = Boolean(newsData);
  const formRef = useRef();
  const [formValue, setFormValue] = useState(emptyNews);
  const [imgUrl, setImgUrl] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit) {
      setFormValue(newsData);
      setImgUrl(newsData.image || '');
    } else {
      setFormValue(emptyNews);
      setImgUrl('');
    }
  }, [newsData, isEdit]);

  const handleChange = (val, key) => {
    setFormValue(prev => ({ ...prev, [key]: val }));
  };

  const handleSubmit = () => {
    if (!formRef.current.check()) return;

    const payload = { ...formValue, image: imgUrl };

    if (isEdit) {
      dispatch(updateNews({ id: newsData.id, news: payload }));
    } else {
      dispatch(createNews(payload));
    }

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="md" className="doctor-modal">
      <Modal.Header>
        <Modal.Title>{isEdit ? 'Редактировать новость' : 'Добавить новость'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="doctor-modal__img">
          {imgUrl && (
            <img
              src={imgUrl}
              alt="doctor"
              style={{ width: "100%", borderRadius: 8 }}
            />
          )}

          <Uploader
            action="https://cb78bf6d31726098.mokky.dev/uploads"
            name="file"
            autoUpload
            style={{ marginTop: '15px' }}
            fileListVisible={false}
            onSuccess={(res) => {
              const url = res?.url;
              if (url) setImgUrl(url);
            }}
          >
            <Button appearance="ghost">Загрузить фото</Button>
          </Uploader>

          <Input
            placeholder="Или вставьте ссылку на изображение"
            value={imgUrl}
            onChange={setImgUrl}
            style={{ marginTop: 10 }}
          />
        </div>
        <Form fluid ref={formRef}>
          <Form.Group>
            <Form.ControlLabel>Заголовок</Form.ControlLabel>
            <Input
              value={formValue.title}
              onChange={val => handleChange(val, 'title')}
              placeholder="Заголовок новости"
            />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Подзаголовок</Form.ControlLabel>
            <Input
              value={formValue.subtitle}
              onChange={val => handleChange(val, 'subtitle')}
              placeholder="Подзаголовок"
            />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Текст</Form.ControlLabel>
            <Input
              as="textarea"
              rows={5}
              value={formValue.text}
              onChange={val => handleChange(val, 'text')}
              placeholder="Текст новости"
            />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Дата</Form.ControlLabel>
            <DatePicker
              format="yyyy-MM-dd"
              value={formValue.date ? new Date(formValue.date) : null}
              onChange={val => handleChange(val, 'date')}
              placeholder="Дата"
              style={{ width: '100%' }}
              oneTap
              cleanable
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          appearance="primary"
          onClick={handleSubmit}
          disabled={
            !formValue.title ||
            !formValue.text ||
            !formValue.date
          }
        >
          Сохранить
        </Button>
        <Button onClick={onClose} appearance="subtle">
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewsModal;