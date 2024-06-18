import { Container } from '@openedx/paragon';
import CoursesList from '../../components/CourseList';
import { fetchAuthenticatedUser } from '@edx/frontend-platform/auth/interface'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';





const AttendancePage = () => {
  const { courseId } = useParams()
  const [isLogged, setIsLogged] = useState(false)
  
  console.log(courseId)


  useEffect(() => {
    // Define the async function
      const fetchData = async () => {
        try {
          const response = await fetchAuthenticatedUser();
          if (response) {
            setIsLogged(true)
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
          {!isLogged ? (<p>Faça Login para ter acesso</p>) : (<CoursesList courseId={courseId}/>)}
        </Container>
      </main>
  )
}

export default AttendancePage;