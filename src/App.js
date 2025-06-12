import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import HeritageRegistrationForm from './HeritageRegistrationForm';
// import { Logo } from './Logo';
import {Routes,Route} from 'react-router-dom'
import ContestRegistrationTable from './ContestRegistrationTable';
import SchoolsList from './components/SchoolsList';
import SchoolDetails from './components/SchoolDetails';
function App() {
  return (
    <ChakraProvider theme={theme}>
  <Routes>
    <Route path='/register' element={<HeritageRegistrationForm/>}/>
    <Route path='/' element={<ContestRegistrationTable/>}/>
    <Route path='/events' element={<SchoolsList/>}/>
    <Route path='/registrations/:schoolId' element={<SchoolDetails/>}/>
  </Routes>
    </ChakraProvider>
  );
}

export default App;
