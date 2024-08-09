import React, { useState, useEffect } from 'react';
import { getEnrollmentRoleUrl } from '../data/services/lms/urls';
import * as utils from '../data/services/lms/utils';
import { useParams } from 'react-router-dom';




const PrivateRoute = ({ component: Component }) => {
    const { courseId } = useParams()
    const [isInstructor, setIsInstructor] = useState(false)    
    const [isLoading, setIsLoading] = useState(true);

    const { get, post, stringifyUrl } = utils;



    const isUserInstructor = (courseId, data) => {
        const roles = data['roles']
        const result = roles.filter(role => role['course_id'] === courseId && role['role'] === 'instructor');
        if (result.length > 0) 
          return true;
      }
    
    
      useEffect(() => {
        // Define the async function
          const fetchData = async () => {
            try {
              const response = await get(getEnrollmentRoleUrl());
              if (isUserInstructor(courseId, response.data)) {
                setIsInstructor(true)
              }
            } catch (error) {
              console.error('Error fetching data:', error);
            } finally {
              setIsLoading(false)
            }
          }
    
        // Call the async function
         fetchData();
      }, []);

    if (isInstructor) {
        return <Component />
    } else if (isLoading) {
        return <p>Carregando...</p>
    }
    else {
        return <h2>Você não tem acesso.</h2>
    }

};

export default PrivateRoute;