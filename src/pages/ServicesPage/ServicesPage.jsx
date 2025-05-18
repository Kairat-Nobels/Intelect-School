import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getService, updateService, deleteService, createService } from '../../redux/slices/servicesSlice';
import ServicesTable from '../../Tables/ServicesTable/ServicesTable';
import ServiceEditModal from '../../components/ServicesEditModal/ServicesEditModal';
import DeleteModal from '../../components/DeleteModalNew/DeleteModalNew';
import { RotatingLines } from 'react-loader-spinner';
import { Button, SelectPicker } from 'rsuite';

const ServicesPage = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.servicesReducer);

  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    dispatch(getService());
  }, [dispatch]);

  const handleEdit = (service, mode, dayIdx = null, lessonIdx = null) => {
    setSelectedService({ service, type: 'edit', mode, dayIdx, lessonIdx });
    setModalOpen(true);
  };

  const handleAdd = (service, mode, dayIdx = null) => {
    setSelectedService({ service, type: 'add', mode, dayIdx });
    setModalOpen(true);
  };

  const handleDelete = (service, mode, dayIdx = null, lessonIdx = null) => {
    setDeleteTarget({ service, mode, dayIdx, lessonIdx });
  };

  const confirmDelete = () => {
    const { service, mode, dayIdx, lessonIdx } = deleteTarget;
    let updated = { ...service };

    if (mode === 'class') {
      // Удаляем класс полностью через deleteService
      dispatch(deleteService(service.id));
    } else if (mode === 'lessons') {
      // Удаляем урок из дня
      updated.schedule = updated.schedule.map((day, idx) => {
        if (idx === dayIdx) {
          return {
            ...day,
            lessons: day.lessons.filter((_, lIdx) => lIdx !== lessonIdx)
          };
        }
        return day;
      });
      dispatch(updateService({ id: service.id, updatedData: updated }));
    }
    setDeleteTarget(null);
  };

  const handleSubmitModal = (updatedData, serviceId, mode) => {
    if (mode === 'class') {
      if (!serviceId) {
        // Добавление нового класса
        dispatch(createService(updatedData));
      } else {
        // Редактирование класса
        dispatch(updateService({ id: serviceId, updatedData }));
      }
    } else if (mode === 'lessons') {
      dispatch(updateService({ id: serviceId, updatedData }));
    }
    setModalOpen(false);
  };

  // Получаем список классов для фильтра
  const classOptions = services.map(item => ({
    label: item.class,
    value: item.class
  }));

  // Фильтруем данные по выбранному классу
  const filteredServices = selectedClass
    ? services.filter(item => item.class === selectedClass)
    : services;

  return (
    <div className="servicesPage">
      <div className='adminStaffHeader' style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <h3 style={{ margin: 0 }}>Расписание</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <SelectPicker
            data={classOptions}
            value={selectedClass}
            onChange={setSelectedClass}
            placeholder="Фильтр по классу"
            style={{ width: 200 }}
            cleanable
          />
          <Button color="orange" appearance="ghost" onClick={() => handleAdd(null, 'class')}>
            + Добавить класс
          </Button>
        </div>
      </div>
      {loading ? (
        <div className="center">
          <RotatingLines strokeColor="grey" width="60" />
          <p>Загрузка...</p>
        </div>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <ServicesTable
          data={filteredServices}
          onEdit={handleEdit}
          onAdd={handleAdd}
          onDelete={handleDelete}
        />
      )}

      {modalOpen && (
        <ServiceEditModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          context={selectedService}
          onSubmit={handleSubmitModal}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          deleteFunc={confirmDelete}
        />
      )}
    </div>
  );
};

export default ServicesPage;
