import { Container } from '@openedx/paragon';
import HistoryList from '../../components/HistoryList';
import React from 'react';







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