import { useEffect, useState } from 'react';
import { Button, Table, Whisper, Tooltip } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { getNews, deleteNews } from '../../redux/slices/newsSlice';
import { RotatingLines } from 'react-loader-spinner';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';
import DeleteModal from '../../components/DeleteModalNew/DeleteModalNew';
import NewsModal from '../../components/NewsModal/NewsModal';

const NewsAdmin = () => {
  const dispatch = useDispatch();
  const { news, loading, error } = useSelector((state) => state.newsReducer);

  const [showModal, setShowModal] = useState(false);
  const [editNews, setEditNews] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  const handleEdit = (newsItem) => {
    setEditNews(newsItem);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditNews(null);
    setShowModal(true);
  };

  return (
    <div className='adminStaff'>
      <div className='adminStaffHeader'>
        <h3>Новости</h3>
        <Button color="orange" appearance="ghost" onClick={handleAdd}>+ Добавить новость</Button>
      </div>

      {loading ? (
        <div className="center">
          <RotatingLines strokeColor="grey" width="60" />
          <p>Загрузка...</p>
        </div>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Table bordered cellBordered data={news} autoHeight wordWrap="break-word">
          <Table.Column width={60} align="center">
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.Cell dataKey="id" />
          </Table.Column>

          <Table.Column width={100} fixed>
            <Table.HeaderCell>Картинка</Table.HeaderCell>
            <Table.Cell>
              {(rowData) => (
                <img src={rowData.image} alt="Картинка" style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: '6px' }} />
              )}
            </Table.Cell>
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Заголовок</Table.HeaderCell>
            <Table.Cell dataKey="title" />
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Подзаголовок</Table.HeaderCell>
            <Table.Cell dataKey="subtitle" />
          </Table.Column>

          <Table.Column flexGrow={2}>
            <Table.HeaderCell>Текст</Table.HeaderCell>
            <Table.Cell>
              {(rowData) => (
                <span style={{ display: 'block', maxWidth: 350, whiteSpace: 'pre-line', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {rowData.text}
                </span>
              )}
            </Table.Cell>
          </Table.Column>

          <Table.Column width={110}>
            <Table.HeaderCell>Дата</Table.HeaderCell>
            <Table.Cell>
              {(rowData) => (
                rowData.date
                  ? new Date(rowData.date).toISOString().slice(0, 10)
                  : ''
              )}
            </Table.Cell>
          </Table.Column>

          <Table.Column width={120} align="center" fixed="right">
            <Table.HeaderCell>Действия</Table.HeaderCell>
            <Table.Cell>
              {(rowData) => (
                <div className='actionButtons'>
                  <Whisper placement="top" trigger="hover" speaker={<Tooltip>Редактировать</Tooltip>}>
                    <Button onClick={() => handleEdit(rowData)} appearance="subtle">
                      <MdEdit color="#1caf68" size={20} />
                    </Button>
                  </Whisper>
                  <Whisper placement="top" trigger="hover" speaker={<Tooltip>Удалить</Tooltip>}>
                    <Button onClick={() => setDeleteTarget(rowData)} appearance="subtle">
                      <MdDeleteOutline color="rgb(210 54 54)" size={20} />
                    </Button>
                  </Whisper>
                </div>
              )}
            </Table.Cell>
          </Table.Column>
        </Table>
      )}

      {/* Модалка для создания/редактирования новости (реализуйте NewsModal отдельно) */}
      <NewsModal
        open={showModal}
        onClose={() => {
          setEditNews(null);
          setShowModal(false);
        }}
        newsData={editNews}
      />

      {deleteTarget && (
        <DeleteModal
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          id={deleteTarget.id}
          deleteFunc={deleteNews}
          refreshFunc={getNews}
        />
      )}
    </div>
  );
};

export default NewsAdmin;