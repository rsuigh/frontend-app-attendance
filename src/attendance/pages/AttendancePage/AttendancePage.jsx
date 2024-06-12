import { Container } from '@openedx/paragon';
import CoursesList from '../../components/CourseList';
import { fetchAuthenticatedUser } from '@edx/frontend-platform/auth/interface'
import React, { useEffect, useState } from 'react';





const AttendancePage = () => {
  const [isLogged, setIsLogged] = useState(false)


  useEffect(() => {
    // Define the async function
      const fetchData = async () => {
        try {
          console.log('entrou aqui')
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
          {!isLogged ? (<p>Faça Login para ter acesso</p>) : (<CoursesList />)}
        </Container>
      </main>
  )
}

export default AttendancePage;