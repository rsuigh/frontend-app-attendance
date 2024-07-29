import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from '@edx/frontend-component-header';
import Footer from '@edx/frontend-component-footer';
import messages from './i18n';
import AttendancePage from './attendance/pages/AttendancePage/AttendancePage';

import './index.scss';


subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      
      <Header />
        <Routes>
          <Route
            path="/:courseId"
            element={<AttendancePage />}
          /> 
        </Routes>
      <Footer />
      
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  handlers: {
    config: () => {
      debugger
      mergeConfig({
        ATTENDANCE_TOKEN: process.env.ATTENDANCE_TOKEN || null,
        ATTENDANCE_URL: process.env.ATTENDANCE_URL || null,
      }, 'AttendanceAppConfig');
    },
  },
  messages,
});
