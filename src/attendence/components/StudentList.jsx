import React, { useState, useEffect } from 'react';

import * as utils from '../data/services/lms/utils';
import { getEnrroledStudentListUrl } from '../data/services/lms/api';

const StudentList = (course) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const { get, post, stringifyUrl } = utils;
  
    useEffect(() => {
      // Define the async function
        const fetchData = async () => {
          try {
            console.log(getEnrroledStudentListUrl(course.course_id))
            const response = await get(getEnrroledStudentListUrl(course.course_id));
            setList(response.data);
            setLoading(false)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
  
      // Call the async function
       fetchData();
    }, []); // The empty dependency array means this effect runs once when the component mounts
  
    return (
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {list.results.map(item => (
              <li key={item.user_id}>{item.username}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default StudentList;