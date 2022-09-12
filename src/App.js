import './App.css';
import axios from 'axios'
import Navbar from './components/Navbar'
import Edit from './components/Edit'


function App() {
  return (
    <div className="App">
      
      <h1>Drinks</h1>
      <Navbar/>
      <Edit/>

    </div>
  );
}

export default App;
