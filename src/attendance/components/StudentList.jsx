import React, { useState, useEffect } from 'react';

import * as utils from '../data/services/lms/utils';
import { getEnrroledStudentListUrl, getMembersUrl } from '../data/services/lms/api';
import { Button, Col, Form } from '@openedx/paragon';

const StudentList = ({course}) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [studentsPresent, setStudentsPresent] = useState([])

    const handleStudentsPresent = (event, studentId) => {
        if (event.target.checked) {
            setStudentsPresent([...studentsPresent, studentId])
        } else {
            const studentNewList = studentsPresent.filter((stuId) => stuId != studentId)
            setStudentsPresent(studentNewList)
        }
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
        data['studentsPresent'] = studentsPresent
        console.log(data)
    }


    useEffect(() => {
        // Define the async function
          const fetchData = async () => {
            try {
                console.log('antes do get '+getMembersUrl(course))
                const response = await get(`http://apps.local.edly.io:8001/api/${course}`);
                console.log(response)
                setLoading(false)
            } catch (error) {
              console.error('Error fetching data:', error);
            } finally {
              setLoading(false)
            }
          }
    
        // Call the async function
         fetchData();
         setStudentsPresent([])
      }, [course]);

    
  
    useEffect(() => {
      // Define the async function
        const fetchData = async () => {
          try {
              const response = await get(getEnrroledStudentListUrl(course));
              setList(response.data.results);
              setLoading(false)
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false)
          }
        }
  
      // Call the async function
       fetchData();
       setStudentsPresent([])
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
                            <option value="aula">Aula normal</option>
                            <option value="repo">Reposição</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <p>Lista de estudantes</p>
                <ul className='mt-4'>
                    {/* <li> 
                        <Form.Checkbox key='id_fulano' className="flex-column flex-sm-row" onChange={(event) => handleStudentsPresent(event, 'um')}>
                            Fulano
                        </Form.Checkbox>
                    </li> */}
                    {list.map(item => (
                        <li key={item.user_id}> 
                            <Form.Checkbox className="flex-column flex-sm-row" onChange={(event) => handleStudentsPresent(event, item.user_id)}>
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