import { getConfig } from '@edx/frontend-platform';


export const getUrlPrefix = () => `${getConfig().LMS_BASE_URL}/api/`;
export const getEnrollmentUrl = () => `${getUrlPrefix()}enrollment/v1/`;
export const getGradesUrl = () => `${getUrlPrefix()}grades/v1/`;
export const getGradebookUrl = () => `${getGradesUrl()}gradebook/course-v1:edX+DemoX+Demo_Course/`;
export const getCourseList = () => `${getUrlPrefix()}courses/v1/courses/`;




