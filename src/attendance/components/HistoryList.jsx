import React, { useState } from 'react';

import { Button, DataTable } from '@openedx/paragon';

import { getAttendanceUrl } from '../data/services/lms/urls';
import client from '../data/services/lms/client';




const HistoryList = () => {
  const [showAlert, setShowAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([
    {
        "id": 1,
        "user": 5,
        "students_attendance": [
            {
                "present": true,
                "username": "suigh"
            },
            {
              "present": false,
              "username": "suiro"
          }
        ],
        "date": "2024-08-06",
        "class_type": "an",
        "course_id": "course-v1:edX+DemoX+Demo_Course"
    },
    {
      "id": 2,
      "user": 5,
      "students_attendance": [
          {
              "present": true,
              "username": "suigh"
          },
          {
            "present": false,
            "username": "suiro"
        }
      ],
      "date": "2024-08-07",
      "class_type": "an",
      "course_id": "course-v1:edX+DemoX+Demo_Course"
  }
]);



  // client('GET', null, getAttendanceUrl())
  //   .then((response) => {
  //       return response.json()
  //   })
  //   .then((response) => {
  //     setData(response)
  //   })



    return (
      <div>
        <DataTable
          isPaginated
          initialState={{
            pageSize: 2,
          }}
          isFilterable
          isSortable
          itemCount={data.length}
          data={data}
          columns={[
            {
              id: 'name',
              Header: 'Nome',
              Cell: ({ row }) => {console.log(row); return row.original.students_attendance[0].username},
            },
            {
              id: 'date',
              Header: data[0]['date'],
              Cell: ({ row }) => {
                if (row.original.students_attendance[0].present) {
                  return "Presente"
                } else {
                  return "Faltou"
                }
              },
            }
          ]}
        >
          <DataTable.TableControlBar />
          <DataTable.Table />
          <DataTable.EmptyTable content="No results found" />
          <DataTable.TableFooter />
        </DataTable>
      </div>
    );
  };
  
export default HistoryList;