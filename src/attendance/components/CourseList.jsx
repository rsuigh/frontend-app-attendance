import React, { useState, useEffect } from 'react';

import {
    Button,
    Alert,
    ModalDialog,
    ActionRow,
    SelectMenu,
    MenuItem,
  } from '@openedx/paragon';

import * as utils from '../data/services/lms/utils';
import { getCourseList } from '../data/services/lms/api';
import StudentList from './StudentList';

import Cookies from 'universal-cookie';


const CoursesList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [selectCourse, setSelectCourse] = useState('');
    
    const { get, post, stringifyUrl } = utils;

    const handleSelectCourseChange = (course_id) => {
        setSelectCourse(course_id);
    };


  
    useEffect(() => {
      // Define the async function
        const fetchData = async () => {
          try {
            const response = await get(getCourseList());
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
          
            <SelectMenu defaultMessage="Selecione o curso">
                {list.results.map(item => (
                    
                    <MenuItem key={item.id} value={item.id} onClick={() => {handleSelectCourseChange(item.id)}}>{item.name}</MenuItem>
                    
                ))}
          
            </SelectMenu>
        )}
        {selectCourse && <StudentList course={selectCourse}/>}
        
      </div>
    );
  };
  
  export default CoursesList;