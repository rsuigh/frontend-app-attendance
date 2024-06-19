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

  
  useEffect(() => {
    // Define the async function
      const fetchData = async () => {
        try {
          const response = await get(getEnrollmentRoleUrl(courseId));
          if (response.data.is_staff) {
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