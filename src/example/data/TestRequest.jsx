import React, { useState, useEffect } from 'react';

import { getConfig } from '@edx/frontend-platform';

import * as utils from './services/lms/utils';

const FetchCoursesList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUrlPrefix = () => `${getConfig().LMS_BASE_URL}/api/`;
  const getEnrollmentUrl = () => `${getUrlPrefix()}enrollment/v1/`;
  const getGradesUrl = () => `${getUrlPrefix()}grades/v1/`;
  const getGradebookUrl = () => `${getGradesUrl()}gradebook/course-v1:Minha+CT01+T01/`;
  const getCourseList = () => `${getUrlPrefix()}courses/v1/courses/`;
  const { get, post, stringifyUrl } = utils;

  useEffect(() => {
    // Define the async function
      const fetchData = async () => {
        try {
          const response = await get(stringifyUrl(getGradebookUrl(), ));
          console.log(response.data)
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

export default FetchCoursesList;
