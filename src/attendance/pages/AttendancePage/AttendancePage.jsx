import { Container } from '@openedx/paragon';
import CoursesList from '../../components/CourseList';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import HistoryPage from '../HistoryPage/HistoryPage';



const AttendancePage = () => {
  const { courseId } = useParams()

  return (
    <main>
      <Container className="py-5">
        <div>
          <h2>Chamada</h2>
          <Link to={`/${courseId}/history`}>
            Histórico
          </Link>
        </div>
        <CoursesList courseId={courseId} />
      </Container>
    </main>
  )
}

export default AttendancePage;