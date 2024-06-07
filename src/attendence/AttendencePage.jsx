import { Container } from '@openedx/paragon';
import CoursesList from './components/CourseList';




const ExamplePage = () => (
    <main>
      <Container className="py-5">
        <h1>Presença</h1>
        <p>Cursos</p>

        <CoursesList/>
        
        
      </Container>
    </main>
  );
  
  export default ExamplePage;