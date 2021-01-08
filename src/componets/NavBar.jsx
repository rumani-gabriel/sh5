import React from 'react';
import './NavBar.css';
import sh1 from '../img/sh1.gif';
import HomeIcon from '@material-ui/icons/Home';
import SendIcon from '@material-ui/icons/Send';
import {ContextProvider} from '../Global/Context';
import Tooltip from '@material-ui/core/Tooltip';



function NavBar() {

   //traigo los elementos que voy a necesitar del context. 

    const { model, openModel, user, loader, logout } = React.useContext(
        ContextProvider
      );
    console.log ("my model", model);

    //con ésta función llamamos a la targeta registro o login
    // la relaciono con un evento onClick
    const openForms=()=>{
        openModel();
    }
   

    const userLogout = () => {
        logout();
      };
      // mediante operador condicional determino que aparece en pantalla.
      // en éste caso muestro la vista de usuario o desconocido.
      const checkUser = () => 
      { return !loader ? (
          !loader && user ? (
            <li>
              {user.displayName}/ <span onClick={userLogout}>logout</span>{" "}
            </li>
          ) : (
            
            <li onClick={openForms}>Register/Login</li>
          )
        ) : (
          "..."
        );
      };
    return (
        <div className="navbar">
            <div className="navbar__first">
                <div className="navbar__logo">
                   <img  className="nav__logo" src={sh1}/>
                   
                 </div>
            </div>
            <div className="navbar__middle">
                <h1>Second-Hand</h1>

            </div>
            <div className="navbar__last">
              {!loader && user ?(
                <div>
                  <Tooltip title="coming soon" arrow>
                  <li>
                    <HomeIcon className="navbar__icons" color="action"/>
                  </li>
                  </Tooltip>
                  <Tooltip title="coming soon" arrow>
                  <li>
                    <SendIcon className="navbar__icons" color="primary"/>
                  </li>
                  </Tooltip>
                    
                </div>
              ) : ("")}
               
                <li onClick={openForms}>
                {checkUser()}
                </li>
               
            </div>
        </div>
    )
}

export default NavBar;
