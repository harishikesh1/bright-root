import SignUp from './pages/SignUp'; 
import Login from './pages/LogIn'; 
import User from './pages/User'; 
import Bar from '../src/components/Bar'; 
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={ <SignUp/> } />
        <Route exact path="/login" element={ <Login/> } />
        <Route exact path="/user" element={ <User/> } />
        <Route exact path="/bar" element={ <Bar/> } />
        {/* <Route exact path="/user" element={ <Test/> } /> */}
         
      </Routes>
    </div>
  )
}

export default App;
