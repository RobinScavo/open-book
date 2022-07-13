import React from 'react';

import './spinner.css'

const Spinner = () => {
  return (
    <div className='loadingSpinnerContainer' data-testid='spinner'>
        <div className="loadingSpinner"></div>
    </div>
  )
}

export default Spinner
