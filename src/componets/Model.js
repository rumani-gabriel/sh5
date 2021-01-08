import React from 'react';
import './Model.css'; 
import {ContextProvider} from '../Global/Context';
import sh from '../img/sh.gif';
const Model = () => {
    const { model, closeModel, register, login } = React.useContext(
      ContextProvider
    );
    const [state, setState] = React.useState({
      register: true,
      login: false,
    });
    const [inputs, setInputs] = React.useState({
      username: "",
      email: "",
      password: "",
    });
    const handleInput = (e) => {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    };
    const formsToggle = () => {
      setState({
        ...state,
        register: !state.register,
        login: !state.login,
      });
    };
    //cerramos el formulario
    const closeForm = (e) => {
      const className = e.target.getAttribute("class");
      if (className === "model") {
        closeModel();
      }
    };
    const registerUser = (e) => {
      e.preventDefault();
      console.log(inputs);
      register(inputs);
      setInputs({ username: "", email: "", password: "" });
    };
    const userLogin = (e) => {
      e.preventDefault();
      login(inputs);
    };
    return (
        //lo que busccamos es la posibilidad de ofrecer un login o un nuevo ingreso de un nuevo user.
        //los capmos de los formularios tienen requerimiento, osea, es sumamente necesario llenarlos.
      <>
        {model ? (
          <div className="model" onClick={closeForm}>
            <div className="model__container">
              {state.register ? (
                <div className="model__form">
                  <form onSubmit={registerUser}>
                    <div className="model__group">
                      <img className="form__logo" src={sh} alt="" />
                    </div>
                    <div className="model__group">
                      <input
                        type="text"
                        name="username"
                        className="model__input"
                        placeholder="Username..."
                        onChange={handleInput}
                        value={inputs.username}
                        required
                      />
                    </div>
                    <div className="model__group">
                      <input
                        type="email"
                        name="email"
                        className="model__input"
                        placeholder="Email..."
                        onChange={handleInput}
                        value={inputs.email}
                        required
                      />
                    </div>
                    <div className="model__group">
                      <input
                        type="password"
                        name="password"
                        className="model__input"
                        placeholder="Create password..."
                        onChange={handleInput}
                        value={inputs.password}
                        required
                      />
                    </div>
                    <div className="model__group">
                      <input
                        type="submit"
                        value="Register"
                        className="btn btn-smart"
                      />
                    </div>
                    <div className="model__group">
                      <span onClick={formsToggle}>
                        Already have an account ?{" "}
                      </span>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="model__form">
                  <form onSubmit={userLogin}>
                    <div className="model__group">
                      <img src={sh} className="form__logo"/>
                    </div>
                    <div className="model__group">
                      <input
                        type="email"
                        name="email"
                        className="model__input"
                        placeholder="Email..."
                        onChange={handleInput}
                        value={inputs.email}
                        required
                      />
                    </div>
                    <div className="model__group">
                      <input
                        type="password"
                        name="password"
                        className="model__input"
                        placeholder="Password..."
                        onChange={handleInput}
                        value={inputs.password}
                        required
                      />
                    </div>
                    <div className="model__group">
                      <input
                        type="submit"
                        value="Login"
                        className="btn btn-smart"
                      />
                    </div>
                    <div className="model__group">
                      <span onClick={formsToggle}>Create a new account ? </span>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  };
  
  export default Model;
