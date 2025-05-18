import React from 'react';
import { Table, Button, Whisper, Tooltip } from 'rsuite';
import { MdEdit, MdDeleteOutline, MdAdd } from 'react-icons/md';

const ServicesTable = ({ data, onEdit, onAdd, onDelete }) => {
  return (
    <Table bordered cellBordered data={data} autoHeight wordWrap="break-word">
      <Table.Column width={60} align="center">
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.Cell dataKey="id" />
      </Table.Column>

      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Класс</Table.HeaderCell>
        <Table.Cell dataKey="class" />
      </Table.Column>

      <Table.Column flexGrow={5}>
        <Table.HeaderCell>Расписание</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => (
            <div>
              {rowData.schedule?.map((day, dayIdx) => (
                <div key={day.day} style={{
                  background: '#f8f9fb',
                  borderRadius: 10,
                  marginBottom: 14,
                  padding: 10,
                  boxShadow: '0 2px 8px rgba(44,62,80,0.07)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 6
                  }}>
                    <b style={{ color: '#b98a5a', fontSize: 17 }}>{day.day}</b>
                    <div>
                      <Whisper placement="top" trigger="hover" speaker={<Tooltip>Добавить урок</Tooltip>}>
                        <Button size="md" appearance="primary" onClick={() => onAdd(rowData, 'lessons', dayIdx)}>
                          <MdAdd />
                        </Button>
                      </Whisper>
                    </div>
                  </div>
                  <div>
                    {day.lessons.map((lesson, lessonIdx) => (
                      <div key={lessonIdx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '4px 0',
                        borderBottom: '1px solid #ececec'
                      }}>
                        <span>
                          <b>{lesson.timeStart}-{lesson.timeEnd}</b> | <b>{lesson.subject}</b> — {lesson.teacher} ({lesson.room})
                        </span>
                        <div>
                          <Whisper placement="top" trigger="hover" speaker={<Tooltip>Редактировать урок</Tooltip>}>
                            <Button appearance="subtle" size="xs" onClick={() => onEdit(rowData, 'lessons', dayIdx, lessonIdx)}>
                              <MdEdit color="#1caf68" size={16} />
                            </Button>
                          </Whisper>
                          <Whisper placement="top" trigger="hover" speaker={<Tooltip>Удалить урок</Tooltip>}>
                            <Button appearance="subtle" size="xs" onClick={() => onDelete(rowData, 'lessons', dayIdx, lessonIdx)}>
                              <MdDeleteOutline color="rgb(210 54 54)" size={16} />
                            </Button>
                          </Whisper>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Table.Cell>
      </Table.Column>

      <Table.Column width={120} align="center" fixed="right">
        <Table.HeaderCell>Действия</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => (
            <div>
              <Whisper placement="top" trigger="hover" speaker={<Tooltip>Редактировать класс</Tooltip>}>
                <Button appearance="subtle" onClick={() => onEdit(rowData, 'class')}>
                  <MdEdit color="#1caf68" size={18} />
                </Button>
              </Whisper>
              <Whisper placement="top" trigger="hover" speaker={<Tooltip>Удалить класс</Tooltip>}>
                <Button appearance="subtle" onClick={() => onDelete(rowData, 'class')}>
                  <MdDeleteOutline color="rgb(210 54 54)" size={18} />
                </Button>
              </Whisper>
            </div>
          )}
        </Table.Cell>
      </Table.Column>
    </Table>
  );
};

export default ServicesTable;
