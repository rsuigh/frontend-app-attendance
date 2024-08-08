import { Container } from '@openedx/paragon';
import HistoryList from '../../components/HistoryList';
import { getEnrollmentRoleUrl } from '../../data/services/lms/urls'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as utils from '../../data/services/lms/utils';






const HistoryPage = () => {
  
  return(
      <main>
        <Container className="py-5">
          <>
            <h2>Histórico</h2>
            <HistoryList/>
          </>
          
        </Container>
      </main>
  )
}

export default HistoryPage;