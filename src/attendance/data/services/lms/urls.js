import { getConfig } from '../../../config';

import * as utils from './utils';


const { get, post, stringifyUrl } = utils;

// this queryParams excludes all users with roles
const queryParams = {
    'excluded_course_roles': ['all'],
  };


// here you define your urls 
export const getUrlPrefix = () => `${getConfig().LMS_BASE_URL}/api/`;
export const getCMSUrlPrefix = () => `${getConfig().CMS_BASE_URL}/api/`;
export const getGradesUrl = () => `${getUrlPrefix()}grades/v1/`;
export const getEnrollmentUrl = () => `${getUrlPrefix()}enrollment/v1/`;
export const getEnrroledStudentListUrl = (course_id) => stringifyUrl(`${getGradesUrl()}gradebook/${course_id}/`, queryParams);
export const getCourseList = () => `${getUrlPrefix()}courses/v1/courses/`;
export const getMembersUrl = (course_id) => `${getCMSUrlPrefix()}contentstore/v1/course_team/${course_id}`
export const postAttendance = () => `${getUrlPrefix()}attendance/`




