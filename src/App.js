
import './App.css';
import NavBar from './componets/NavBar';
import Context from './Global/Context';
import Model from './componets/Model';
import Stories from './componets/Stories';
import Create from './componets/Create';
import Posts from './componets/Posts';
import Sidebar from './componets/Sidebar';
function App() {
  return (
    //uso context para pasar datos "globales" sin depender de props.
    
    <Context>
       <NavBar/>
      <div className="container">
        <Stories/>
        <Create/>
        <Posts/>
        <Sidebar/>
      </div>
     
      <Model/>
    </Context>
  );
}

export default App;
