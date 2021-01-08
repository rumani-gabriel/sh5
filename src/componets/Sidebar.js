import React from 'react';
import {ContextProvider} from '../Global/Context';
import './Sidebar.css';
import { makeStyles } from '@material-ui/core/styles';
import { Tooltip } from "@material-ui/core";

const Sidebar = () => {
    const { loader, user } = React.useContext(ContextProvider);
    const username = !loader && user && user.displayName ? user.displayName : "";
    const [state] = React.useState([
      { id: 1, image: "https://cde.laprensa.e3.pe/ima/0/0/1/2/8/128956.jpg", name: "Batman" },
      { id: 2, image: "data:image/jpeg;base64,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", name: "Tonny Stark " },
      { id: 3, image: "https://media-exp1.licdn.com/dms/image/C4D03AQFNSOt-kfoxug/profile-displayphoto-shrink_400_400/0/1594761859016?e=1613001600&v=beta&t=KAl5jzSTB7O_CWQsE2eEHckqqJz69GG4IorDtpcweEE", name: " Gabriel Rumani " },
    ]);
    const useStyles = makeStyles((theme) => ({
      button: {
        margin: theme.spacing(1),
      },
      customWidth: {
        maxWidth: 500,
      },
      noMaxWidth: {
        maxWidth: 'none',
      },
     
    }));
    
    const longText = `
    very soon you will enjoy the best user profile
    `;
    return (
      <div className="sidebar">
{/*con éste operador condicional, controlamos el contenido que puede ver un no resgistrado*/}          
        {!loader && user ? (
          <div>
            <Tooltip title={longText}>
            <div className="sidebar__user">
              <div className="sidebar__user-avator">{username[0]}</div>
              <div className="sidebar__user-name">{username}</div>
              <h3>Suggestions for you</h3>              
            </div>
            </Tooltip>
            <div className="sidebar__list">
              
         
          {state.map((user) => (
            <div className="sidebar__list-user" key={user.id}>
              <div className="sidebar__list-a">
                <div className="sidebar__list-a-img">
                  <img src={user.image} alt={user.image} />
                </div>
                <div className="sidebar__list-a-name">{user.name}</div>
              </div> 
                          
              <div className="sidebar__list-b">
                <a href="">Follow</a>
              </div>
            </div>
          ))}
        </div>

          </div>
        ) : (
          ""
        )}
        
      </div>
    );
  };
  
  export default Sidebar;