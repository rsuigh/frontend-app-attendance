import { getConfig } from '@edx/frontend-platform';

import * as utils from './utils';


const { get, post, stringifyUrl } = utils;

// all params for query
// [paramKeys.pageSize]: pageSize,
// [paramKeys.userContains]: searchText,
// [paramKeys.cohortId]: cohort,
// [paramKeys.enrollmentMode]: track,
// [paramKeys.courseGradeMax]: options.courseGradeMax,
// [paramKeys.courseGradeMin]: options.courseGradeMin,
// [paramKeys.excludedCourseRoles]: options.includeCourseRoleMembers ? null : ['all'],
// [paramKeys.assignment]: options.assignment,
// [paramKeys.assignmentGradeMax]: options.assignmentGradeMax,
// [paramKeys.assignmentGradeMin]: options.assignmentGradeMin,

// this queryParams excludes all users with roles
const queryParams = {
    'excluded_course_roles': ['all'],
  };
const ATTENDANCE_URL='http://apps.local.edly.io:8009'


// here you define your urls 
export const getUrlPrefix = () => `${getConfig().LMS_BASE_URL}/api/`;
export const getAttendancePrefix = () => `${ATTENDANCE_URL}/api/`
export const getGradesUrl = () => `${getUrlPrefix()}grades/v1/`;
export const getEnrollmentRoleUrl = () => `${getUrlPrefix()}enrollment/v1/roles/`;
export const getEnrollmentRoleCourseUrl = (course_id) => `${getUrlPrefix()}enrollment/v1/roles/?course_id=${course_id}`;
export const getEnrollmentStudentDateJoinedUrl = (username, course_id) => 
  `${getUrlPrefix()}enrollment/v1/enrollments?course_id=${course_id.replace("+", "%2B")}&username=${username}`;
export const getEnrroledStudentListUrl = (course_id) => stringifyUrl(`${getGradesUrl()}gradebook/${course_id}/`, queryParams);
export const getCourseList = () => `${getUrlPrefix()}courses/v1/courses/`;
export const postAttendanceUrl = () => `${getAttendancePrefix()}attendance/`
export const getAttendanceUrl = (course_id) => `${getAttendancePrefix()}attendance/?course_id=${course_id}`





