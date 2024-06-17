import React, { useState, useEffect } from 'react';

import * as utils from '../data/services/lms/utils';
import { getEnrroledStudentListUrl, getMembersUrl } from '../data/services/lms/urls';
import { Button, Col, Form } from '@openedx/paragon';

const StudentList = ({course}) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [studentsPresent, setStudentsPresent] = useState([])

    const handleStudentsPresent = (event, username) => {
        const newStudentsPresentList = studentsPresent.map(student => {
            if (student.username == username) {
                return {username, present: event.target.checked}
            }
            return student
        })
        console.log(newStudentsPresentList)
        setStudentsPresent(newStudentsPresentList)
    }
    
    const { get, post, stringifyUrl } = utils;

    const onSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = {}
        data['course_id'] = course
        for (const [key, value] of formData) {
            data[key] = value
        }
        data['students_presents'] = studentsPresent
        console.log(data)
    }

   


    
  
    useEffect(() => {
      // Define the async function
        const fetchData = async () => {
          try {
              const response = await get(getEnrroledStudentListUrl(course));
              console.log(response.data.results)
              setList(response.data.results);
              setLoading(false)
              return response.data.results
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false)
          }
        }
  
      // Call the async function
       const students = fetchData(); 
       setStudentsPresent(students.map(student => {
        return {username: student.username, present: false}
       }))
    }, [course]); // The empty dependency array means this effect runs once when the component mounts
    
    return (
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
            <Form onSubmit={onSubmit}>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Control name='date' type="date" floatingLabel="Data" className='mt-4'/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control name='class_type' as="select" floatingLabel="Tipo de aula" className='mt-4'> 
                            <option value="an">Aula normal</option>
                            <option value="ar">Reposição</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <p>Lista de estudantes</p>
                <ul className='mt-4'>
                    <li> 
                        <Form.Checkbox key='id_fulano' className="flex-column flex-sm-row" onChange={(event) => handleStudentsPresent(event, 'fulano')}>
                            Fulano
                        </Form.Checkbox>
                    </li>
                    <li> 
                        <Form.Checkbox key='id_beltrano' className="flex-column flex-sm-row" onChange={(event) => handleStudentsPresent(event, 'beltrano')}>
                            Beltrano
                        </Form.Checkbox>
                    </li>
                    <li> 
                        <Form.Checkbox key='id_zezinho' className="flex-column flex-sm-row" onChange={(event) => handleStudentsPresent(event, 'zezinho')}>
                            Zezinho
                        </Form.Checkbox>
                    </li>
                    
                    {list.map(item => (
                        <li key={item.user_id}> 
                            <Form.Checkbox className="flex-column flex-sm-row" onChange={(event) => handleStudentsPresent(event, item.username)}>
                                {item.username}
                            </Form.Checkbox>
                        </li>
                    ))}
                </ul>
                <Button type='submit'>Enviar</Button>
            </Form>
        )}
      </div>
    );
  };
  
  export default StudentList;