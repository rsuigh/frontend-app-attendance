import { getConfig } from '@edx/frontend-platform';

// here you define your urls 
export const getUrlPrefix = () => `${getConfig().LMS_BASE_URL}/api/`;
export const getGradesUrl = () => `${getUrlPrefix()}grades/v1/`;
export const getEnrroledStudentListUrl = (course_id) => `${getGradesUrl()}gradebook/${course_id}/`;
export const getCourseList = () => `${getUrlPrefix()}courses/v1/courses/`;




