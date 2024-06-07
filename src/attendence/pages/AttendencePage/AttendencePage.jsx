import { Container } from '@openedx/paragon';
import CoursesList from '../../components/CourseList';
import React, { useState } from 'react';





const AttendencePage = () => {
  
  return(
      <main>
        <Container className="py-5">
          <h2>Chamada</h2>
          <CoursesList />
        </Container>
      </main>
  )
}

export default AttendencePage;