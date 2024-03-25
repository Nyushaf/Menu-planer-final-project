import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import MainComponent from './MainComponent';
import { Loader } from './Loader';



function App() {
  const { isLoading } = useAuth0();
  
  return (
    <div>
      {isLoading ? <Loader/> : <MainComponent/>}
    </div>
  );
}

export default App;
