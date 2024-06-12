import { Container } from '@openedx/paragon';
import StudentList from '../../components/StudentList';




const StudentListPage = () => (
    <main>
      <Container className="py-5">
        <h1>Lista de alunos matriculados:</h1>

        <StudentList/>
        
        
      </Container>
    </main>
  );
  
  export default StudentListPage;