import React, { useState, useEffect } from 'react';

import { DataTable, TextFilter, Badge, Scrollable } from '@openedx/paragon';
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
        r['attendance_records'].forEach(session => {
          session.students_attendance.forEach(student => {
            if (!attendanceMap[student.username]) {
              attendanceMap[student.username] = { username: student.username };
            }
            const columnKey = `${session.date} (${session.class_type[1]})`;
            attendanceMap[student.username][columnKey] = student.present ? "✓" : "X";
            attendanceMap[student.username]['Porcentagem'] = '';
          });
        });
        Object.entries(r['attendance_percentage']).forEach(([key, value]) => {
          attendanceMap[key]['Porcentagem'] = value;
        })
        console.log(attendanceMap)
        setData(Object.values(attendanceMap))
        setColumns([
          { id: "username", key: "username", label: "Nome" },
          { id: "percentage", key: "percentage", label: "Porcentagem" },
          ...r['attendance_records'].map((session) => ({
            id: `${session.date} (${session.class_type[1]})`,
            key: `${session.date} (${session.class_type[1]})`,
            label: `${session.date} (${session.class_type[1]})`
          }))
        ])

      })
      .finally(() => {
        setLoading(false)
      })
  }, [])




  return (
    <div>
      {loading ? (<p>Carregando...</p>) : (
        <Scrollable>
          <DataTable
            isFilterable
            isSortable
            defaultColumnValues={{ Filter: TextFilter }}
            itemCount={data.length}
            data={data}
            columns={columns.map((item, i) => (
              {
                id: i + item.id,
                Header: item.label == "Nome" || item.label == "Porcentagem" ? item.label : new Intl.DateTimeFormat('pt-br').format(new Date(item.label)) + " (" + item.label.split(" ")[1][1] + ")",
                Cell: ({ row }) => {
                  if (row['original'][item.id] == "✓") {
                    return (
                      <Badge variant={'success'}>
                        {row['original'][item.id] ? row['original'][item.id] : "-"}
                      </Badge>
                    )
                  } else if (row['original'][item.id] == "X") {
                    return (
                      <Badge variant={'danger'}>
                        {row['original'][item.id] ? row['original'][item.id] : "-"}
                      </Badge>
                    )
                  } else if (typeof row['original'][item.label] === 'number') {
                    console.log(row['original'][item.label])
                    return (
                      row['original'][item.label] ? row['original'][item.label]+"%" : "-"
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
        </Scrollable>
      )
      }
      <div>
        <a>n = aula normal </a>
        <a>r = aula de reposição</a>
      </div>
    </div >
  );
};

export default HistoryList;