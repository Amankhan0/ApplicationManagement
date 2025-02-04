import React from 'react';
import ApplicationManagement from './views/applicationmanagement/applicationmanagement';
import SampleAppFile from './views/sample/sample-file';
import { RootState } from 'store';
import { useSelector } from 'react-redux';

function App() {

  const ApiReducer = useSelector((state: RootState) => state.ApplicationApiSlice);
  const ApplicationSlice = useSelector((state: RootState) => state.ApplicationSlice);

  console.log('ApplicationSlice',ApplicationSlice);
  console.log('ApiReducer',ApiReducer);
  
  

  return (
    <div>
      <ApplicationManagement />
    </div>
  );
}

export default App;
