import { Container } from '@openedx/paragon';
import CoursesList from '../../components/CourseList';
import { getEnrollmentRoleUrl } from '../../data/services/lms/urls'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as utils from '../../data/services/lms/utils';






const AttendancePage = () => {
  const { courseId } = useParams()
  const [isStaff, setIsStaff] = useState(false)

  const { get, post, stringifyUrl } = utils;

  const isCourseIdPresent = (courseId, response) => {
    return response.roles.some(role => role.course_id === courseId);
  }


  useEffect(() => {
    // Define the async function
      const fetchData = async () => {
        try {
          const response = await get(getEnrollmentRoleUrl());
          console.log(isCourseIdPresent(response.data))
          if (isCourseIdPresent(response.data)) {
            setIsStaff(true)
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
          {!isStaff ? (<p>Você não tem acesso</p>) : (<CoursesList courseId={courseId}/>)}
        </Container>
      </main>
  )
}

export default AttendancePage;