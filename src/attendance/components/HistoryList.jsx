import React, { useState, useEffect } from 'react';

import { DataTable, TextFilter, Badge } from '@openedx/paragon';
import { useParams } from 'react-router-dom';

import { getAttendanceUrl } from '../data/services/lms/urls';
import client from '../data/services/lms/client';




const HistoryList = () => {
  const { courseId } = useParams()

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([])


  useEffect(() => {
    client('GET', null, getAttendanceUrl(courseId))
      .then((response) => {
        return response.json()
      })
      .then((r) => {
        const attendanceMap = {};
        r.forEach(session => {
          session.students_attendance.forEach(student => {
            if (!attendanceMap[student.username]) {
              attendanceMap[student.username] = { username: student.username };
            }
            attendanceMap[student.username][session.date] = student.present ? "Presente" : "Ausente";
          });
        });
        setData(Object.values(attendanceMap))
        setColumns([
          { id: "username", key: "username", label: "Nome" },
          ...r.map((session) => ({ id: session.date, key: session.date, label: session.date }))
        ])

      })
      .finally(() => {
        setLoading(false)
      })
  }, [])



  return (
    <div>
      {loading ? (<p>Carregando...</p>) : (
        <DataTable
          isFilterable
          isSortable
          defaultColumnValues={{ Filter: TextFilter }}
          itemCount={data.length}
          data={data}
          columns={columns.map((item, i) => (
            {
              id: i + item.id,
              Header: item.label == "Nome" ? item.label : new Intl.DateTimeFormat('pt-br').format(new Date(item.label)),
              Cell: ({ row }) => {
                if (row['original'][item.id] == "Presente") {
                  return (
                    <Badge variant={'success'}>
                      {row['original'][item.id] ? row['original'][item.id] : "-"}
                    </Badge>
                  )
                } else if (row['original'][item.id] == "Ausente") {
                  return (
                    <Badge variant={'danger'}>
                      {row['original'][item.id] ? row['original'][item.id] : "-"}
                    </Badge>
                  )
                } else {
                  return (
                    row['original'][item.id] ? row['original'][item.id] : "-"
                  )
                }
              }
            }
          ))}

        >
          <DataTable.TableControlBar />
          <DataTable.Table />
          <DataTable.EmptyTable content="No results found" />
        </DataTable >
      )
      }

    </div >
  );
};

export default HistoryList;