import React, { useState, useEffect, useRef } from 'react';

import * as utils from '../data/services/lms/utils';
import {
    getEnrroledStudentListUrl,
    postAttendanceUrl,
    getEnrollmentStudentDateJoinedUrl
} from '../data/services/lms/urls';
import { Button, Col, Form, Alert } from '@openedx/paragon';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import client from '../data/services/lms/client';


//import hcjson from './response.JSON'



const StudentList = ({ courseId }) => {
    const [list, setList] = useState([]);
    //const [list, setList] = useState(hcjson.results);
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [studentsPresent, setStudentsPresent] = useState([])

    const { get, post, stringifyUrl } = utils;

    const today = new Date();
    const date = today.setDate(today.getDate())
    const todayDate = new Date(date).toISOString().split("T")[0]


    // for development use this:
    // const [studentsPresent, setStudentsPresent] = useState(
    //     [
    //         {
    //             "username": "suigh2",
    //             "present": false
    //         },
    //         {
    //             "username": "suigh3",
    //             "present": false
    //         },
    //         {
    //             "username": "suigh4",
    //             "present": false
    //         }
    //     ])

    const handleStudentsPresent = (event, username) => {
        const newStudentsPresentList = studentsPresent?.map(student => {
            if (student.username == username) {
                return { username, present: event.target.checked }
            }
            return student
        })
        setStudentsPresent(newStudentsPresentList)
    }

    const markAllCheckBoxes = () => {
        const newStudentsPresentList = studentsPresent.map(student => ({
            ...student,
            present: true
        }));
        setStudentsPresent(newStudentsPresentList);
    }


    const onSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = {}
        data['course_id'] = courseId.courseId
        for (const [key, value] of formData) {
            data[key] = value
        }
        data['students_attendance'] = studentsPresent
        data['user'] = getAuthenticatedUser().userId
        setLoading(true)
        client('POST', data, postAttendanceUrl())
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        setErrorMessage(errorData.non_field_errors[0])
                        setShowErrorAlert(true);
                        setShowAlert(false);
                    });
                } else {
                    
                    setShowAlert(true)
                    setShowErrorAlert(false)
                }
            })
            .catch(error => {
                setErrorMessage("Erro! Entre em contato com o administrador")
                setShowErrorAlert(true)
                setShowAlert(false)
            })
            .finally(() => {
                setLoading(false)
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

        fetchData().then((students) => {
            setStudentsPresent(students?.map(student => {
                return { username: student.username, present: false }
            }))
        });
    }, [courseId]); // The empty dependency array means this effect runs once when the component mounts

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
                <Alert.Heading>{errorMessage}</Alert.Heading>
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
                                defaultValue={todayDate}
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
                    <Button onClick={() => markAllCheckBoxes()}>Marcar todos</Button>
                    <ul className='mt-4'>
                        {list.map(item => (
                            <li key={item.user_id}>
                                <Form.Checkbox
                                    className="flex-column flex-sm-row"
                                    onChange={(event) => handleStudentsPresent(event, item.username)}
                                    checked={studentsPresent.find(student => student.username === item.username)?.present}
                                >
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