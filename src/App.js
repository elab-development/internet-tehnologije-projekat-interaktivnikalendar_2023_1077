import './App.css';
import NavBar from './components/NavBar';
import Calendar from './components/Calendar';

function App() {
 const dugme= <button className="btn">Dodaj dogadjaj</button>;
  return (
    
    <div className="App">
     <NavBar></NavBar>
    {dugme}
     <Calendar/>
     
    </div>
  );
}

export default App;
