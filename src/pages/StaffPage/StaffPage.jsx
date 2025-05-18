import { useEffect, useState } from 'react';
import { Button } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctors, deleteDoctor } from '../../redux/slices/doctorsSlice';
import { RotatingLines } from 'react-loader-spinner';
import DeleteModal from '../../components/DeleteModalNew/DeleteModalNew';
import DoctorModalForm from '../../components/DoctorModalForm/DoctorModalForm';
import DoctorsTable from '../../Tables/DoctorsTable/DoctorsTable';

const StaffPage = () => {
  const dispatch = useDispatch();
  const { doctors, loading, error } = useSelector((state) => state.doctorsReducer);

  const [showModal, setShowModal] = useState(false);
  const [editDoctor, setEditDoctor] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  const handleEdit = (doctor) => {
    setEditDoctor(doctor);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditDoctor(null);
    setShowModal(true);
  };

  return (
    <div className='adminStaff'>
      <div className='adminStaffHeader'>
        <h3>Учителя</h3>
        <Button color="orange" appearance="ghost" onClick={handleAdd}>+ Добавить учителя</Button>
      </div>

      {loading ? (
        <div className="center">
          <RotatingLines strokeColor="grey" width="60" />
          <p>Загрузка...</p>
        </div>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <DoctorsTable
          data={doctors}
          onEdit={handleEdit}
          onDelete={(doctor) => setDeleteTarget(doctor)}
        />
      )}

      <DoctorModalForm
        open={showModal}
        onClose={() => {
          setEditDoctor(null);
          setShowModal(false)
        }}
        doctorData={editDoctor}
      />

      {deleteTarget && (
        <DeleteModal
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          id={deleteTarget.id}
          deleteFunc={deleteDoctor}
          refreshFunc={getDoctors}
        />
      )}
    </div>
  );
};

export default StaffPage;
