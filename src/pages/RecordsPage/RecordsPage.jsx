import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRecord, getRecords } from '../../redux/slices/recordSlice';
import { RotatingLines } from 'react-loader-spinner';
import RecordsTable from '../../Tables/RecordsTable/RecordsTable';
import DeleteModal from '../../components/DeleteModalNew/DeleteModalNew';
import { Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css'

const months = {
  'января': 0, 'февраля': 1, 'марта': 2, 'апреля': 3, 'мая': 4, 'июня': 5,
  'июля': 6, 'августа': 7, 'сентября': 8, 'октября': 9, 'ноября': 10, 'декабря': 11
};

const RecordsPage = () => {
  const dispatch = useDispatch();
  const { records, loading, error } = useSelector((state) => state.recordsReducer);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    dispatch(getRecords());
  }, [dispatch]);

  return (
    <div className='adminRecords'>
      <div className='adminRecordHeader'>
        <h3>Заявки на поступление</h3>
      </div>

      {loading ? (
        <div className="center">
          <RotatingLines strokeColor="grey" width="60" />
          <p>Загрузка...</p>
        </div>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <RecordsTable data={records} onDelete={(record) => setDeleteTarget(record)} />
      )}

      {deleteTarget && (
        <DeleteModal
          deleteFunc={deleteRecord}
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          id={deleteTarget.id}
        />
      )}

    </div>
  );
};

export default RecordsPage;
