import { Container } from '@openedx/paragon';
import CoursesList from '../../components/CourseList';
import React from 'react';


const AttendancePage = () => {
  const { courseId } = useParams()

  return (
    <main>
      <Container className="py-5">
        <h2>Chamada</h2>
        <CoursesList courseId={courseId} />
      </Container>
    </main>
  )
}

export default AttendancePage;