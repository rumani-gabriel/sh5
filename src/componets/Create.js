import React, { useState, useContext } from "react";
import {ContextProvider} from '../Global/Context';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import './Create.css';
import { makeStyles } from '@material-ui/core/styles';
import { Tooltip } from "@material-ui/core";


const Create = () => {
    const { create, loader, user } = useContext(ContextProvider);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const handleImage = (e) => {
      setImage(e.target.files[0]);
    };
    const createPost = (e) => {
      e.preventDefault();
      create({ title, image });
      setTitle("");
      setImage("");
    };
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
    make a post and then make a descriptive comment
    `;
    return (
      
      <>
      {/*con éste operador condicional, nos aseguramos de que solamente los usuarios
      registrados puedan participar de la comunidad */ }
        {!loader && user ? (
          <div className="create">
            <form onSubmit={createPost}>
              <div className="create__input">
                <Tooltip title={longText}>
                <input
                  type="text"
                  className="create__inputt"
                  placeholder="
                  what do you want to post?..."
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  required
                />
                </Tooltip>
              </div>
              <div className="create__second">
                <div className="create__second-a">
                  <label htmlFor="file">
                    <AddAPhotoIcon className="camera" />
                  </label>
                  <input
                    type="file"
                    className="file"
                    onChange={handleImage}
                    id="file"
                    required
                  />
                </div>
                <div className="create__second-b">
                  <input type="submit" value="Create" className="btn-sweet" />
                </div>
              </div>
            </form>
          </div>
        ) : (
          ""
        )}
      </>
    );
  };
  
  export default Create;