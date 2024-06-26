import { Container } from '@openedx/paragon';
import CoursesList from '../../components/CourseList';
import { getEnrollmentRoleUrl } from '../../data/services/lms/urls'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as utils from '../../data/services/lms/utils';






const AttendancePage = () => {
  const { courseId } = useParams()
  const [isStructor, setIsStructor] = useState(false)

  const { get, post, stringifyUrl } = utils;

  const isCourseIdPresent = (courseId, response) => {
    for (let i = 0; i < response['roles'].length; i++)
      if (response['roles'][i]['course_id'] === courseId && response['roles'][i]['role'] === 'instructor')
        return true 
  }


  useEffect(() => {
    // Define the async function
      const fetchData = async () => {
        try {
          const response = await get(getEnrollmentRoleUrl());
          console.log(response.data)
          if (isCourseIdPresent(courseId ,response.data)) {
            setIsStructor(true)
          }
          console.log(response)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

    // Call the async function
     fetchData();
  }, []);
  
  return(
      <main>
        <Container className="py-5">
          <h2>Chamada</h2>
          {!isStructor ? (<p>Você não tem acesso</p>) : (<CoursesList courseId={courseId}/>)}
        </Container>
      </main>
  )
}

export default AttendancePage;