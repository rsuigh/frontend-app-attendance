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

//   {
//     "roles": [
//         {
//             "org": "SuirosProductions",
//             "course_id": "course-v1:SuirosProductions+C01+2024_T1",
//             "role": "instructor"
//         },
//         {
//             "org": "SuirosProductions",
//             "course_id": "course-v1:SuirosProductions+C01+2024_T1",
//             "role": "staff"
//         },
//         {
//             "org": "edX",
//             "course_id": "course-v1:edX+DemoX+Demo_Course",
//             "role": "staff"
//         }
//     ],
//     "is_staff": true
// }

  const isCourseIdPresent = (courseId, data) => {
    const roles = data['roles']
    const result = roles.filter(role => role['course_id'] === courseId && role['role'] === 'instructor');
    if (result.length > 0) 
      return true;
  }


  useEffect(() => {
    // Define the async function
      const fetchData = async () => {
        try {
          setIsStructor(true)
          const response = await get(getEnrollmentRoleUrl());
          if (isCourseIdPresent(courseId, response.data)) {
            setIsStructor(true)
          }
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