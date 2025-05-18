import React from 'react';
import { Table, Button, Whisper, Tooltip } from 'rsuite';
import { MdDeleteOutline } from 'react-icons/md';

const RecordsTable = ({ data, onDelete }) => {
  return (
    <Table bordered cellBordered data={data} autoHeight wordWrap="break-word" locale={{
      emptyMessage: 'Заявок нету',
    }}>
      <Table.Column flexGrow={1}>
        <Table.HeaderCell>ФИО ребёнка</Table.HeaderCell>
        <Table.Cell dataKey="childFullName" />
      </Table.Column>

      <Table.Column width={80}>
        <Table.HeaderCell>Возраст</Table.HeaderCell>
        <Table.Cell dataKey="childAge" />
      </Table.Column>

      <Table.Column width={100}>
        <Table.HeaderCell>Класс</Table.HeaderCell>
        <Table.Cell dataKey="classApplyingTo" />
      </Table.Column>

      <Table.Column flexGrow={1}>
        <Table.HeaderCell>ФИО родителя</Table.HeaderCell>
        <Table.Cell dataKey="parentFullName" />
      </Table.Column>

      <Table.Column width={140}>
        <Table.HeaderCell>Телефон</Table.HeaderCell>
        <Table.Cell dataKey="parentPhone" />
      </Table.Column>

      <Table.Column flexGrow={2}>
        <Table.HeaderCell>Комментарий</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => (
            <span style={{ display: 'block', maxWidth: 300, whiteSpace: 'pre-line', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {rowData.comment}
            </span>
          )}
        </Table.Cell>
      </Table.Column>

      <Table.Column width={100} align="center">
        <Table.HeaderCell>Действия</Table.HeaderCell>
        <Table.Cell className="deleteBtnTable">
          {(rowData) => (
            <Whisper
              trigger="hover"
              placement="top"
              speaker={<Tooltip>Удалить</Tooltip>}
            >
              <Button onClick={() => onDelete(rowData)} appearance="subtle">
                <MdDeleteOutline color="rgb(210 54 54)" size={20} />
              </Button>
            </Whisper>
          )}
        </Table.Cell>
      </Table.Column>
    </Table>
  );
};

export default RecordsTable;
