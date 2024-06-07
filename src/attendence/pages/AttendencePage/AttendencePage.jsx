import { Container } from '@openedx/paragon';
import CoursesList from '../../components/CourseList';
import React, { useState } from 'react';





const AttendencePage = () => {
  
  return(
      <main>
        <Container className="py-5">
          <h1>Selecione o curso:</h1>

          <CoursesList />
          

        </Container>
      </main>
  )
}

export default AttendencePage;