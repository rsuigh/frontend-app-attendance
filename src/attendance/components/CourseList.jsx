import React from 'react';


import StudentList from './StudentList';



const CoursesList = (courseId) => {
    
    return (
      <div>
        {<StudentList courseId={courseId}/>}
      </div>
    );
  };
  
export default CoursesList;