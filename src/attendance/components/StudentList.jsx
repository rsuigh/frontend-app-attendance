import React, { useState, useEffect } from 'react';

import * as utils from '../data/services/lms/utils';
import { getEnrroledStudentListUrl, postAttendanceUrl } from '../data/services/lms/urls';
import { Button, Col, Form, Alert} from '@openedx/paragon';

// import hcjson from './response.JSON'



const StudentList = ({courseId}) => {
    const [list, setList] = useState([]);
    // const [list, setList] = useState(hcjson.results);
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [studentsPresent, setStudentsPresent] = useState([])

    const handleStudentsPresent = (event, username) => {
        const newStudentsPresentList = studentsPresent?.map(student => {
            if (student.username == username) {
                return {username, present: event.target.checked}
            }
            return student
        })
        console.log(newStudentsPresentList)
        setStudentsPresent(newStudentsPresentList)
    }

    
    
    const { get, post, stringifyUrl } = utils;

    const onSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = {}
        data['course_id'] = courseId.courseId
        for (const [key, value] of formData) {
            data[key] = value
        }
        data['students_attendance'] = studentsPresent
        setLoading(true)

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: "follow"
        };
        fetch(postAttendanceUrl(), requestOptions)
            .then((response) => {
                if (response.ok) {
                    setShowAlert(true)
                    setShowErrorAlert(false)
                    setLoading(false)
                } else {
                    setShowErrorAlert(true)
                    setShowAlert(false)
                    setLoading(false)
                }
            })  
    } 
  
    useEffect(() => {
      // Define the async function
        const fetchData = async () => {
          try {
              const response = await get(getEnrroledStudentListUrl(courseId.courseId));
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
       fetchData().then((students) => {
        setStudentsPresent(students?.map(student => {
            return {username: student.username, present: false}
           }))
       }); 

       
    }, [courseId]); // The empty dependency array means this effect runs once when the component mounts

    const today = new Date();
    const date = today.setDate(today.getDate())
    const todayDate = new Date(date).toISOString().split("T")[0]

    
    return (
      <div>
        {showAlert && <Alert 
                        variant="success" 
                        actions={[
                            <Button onClick={() => setShowAlert(false)}>Fechar</Button>,
                        ]} >
            <Alert.Heading>Presença enviada</Alert.Heading>
        </Alert>}
        {showErrorAlert && <Alert 
                        variant="danger" 
                        actions={[
                            <Button onClick={() => setShowErrorAlert(false)}>Fechar</Button>,
                        ]} >
            <Alert.Heading>Erro</Alert.Heading>
        </Alert>}

        {loading ? (
          <p>Loading...</p>
        ) : (
            <Form onSubmit={onSubmit}>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Control 
                            name='date' 
                            type="date" 
                            floatingLabel="Data" 
                            className='mt-4'
                            value={todayDate}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control name='class_type' as="select" floatingLabel="Tipo de aula" className='mt-4' defaultValue={{ label: "Aula normal", value: "an" }}> 
                            <option value="an">Aula normal</option>
                            <option value="ar">Reposição</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <p>Lista de estudantes</p>
                <ul className='mt-4'>
                    {/* <li> 
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
                    </li> */}
                    
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