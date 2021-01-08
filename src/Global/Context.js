import React, { createContext } from "react";
import { auth, db, storage } from "../Config";
import firebase from "firebase";
export const ContextProvider = createContext();

//En éste componente definimos todos los datos pertientes de nuestra app;
const Context = (props) => {
  const [model, setModel] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [loader, setLoader] = React.useState(true);
  const [posts, setPosts] = React.useState([]);
  

  //abrimos o cerramos las "tarjetas" de registro o login.  
  const openModel = () => {
    setModel(true);
  };
  const closeModel = () => {
    setModel(false);
  };
  //acá comienza toda la sección de funcionalidades de registro.
                    //  
  const register = async (user) => {
    //empezamos a solicitar datos que van a parar a Firebase.
    const { username, email, password } = user;
     //uso las herramientas de gestion de credenciales de firebase
    try {          //
      const res = await auth.createUserWithEmailAndPassword(email, password);
      res.user.updateProfile({ displayName: username });
      setModel(false);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (user) => {
    const { email, password } = user;
    const res = await auth.signInWithEmailAndPassword(email, password);
    setModel(false);
  };
  //usamos la función nativa de firebase signout para salir de la sesion.
  const logout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //defino que datos voy a solicitar para crear un post.
  //referencio en que carpeta de firebase se va a almacenar. 
  const create = (data) => {
    const { title, image } = data;
    const upload = storage.ref(`images/${image.name}`).put(image);
    upload.on(
      "state_changed",
      (snp) => {
        let progress = (snp.bytesTransferred / snp.totalBytes) * 100;
        console.log(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        //completa la función
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              title,
              image: url,
              username: user.displayName,
              currentTime: firebase.firestore.FieldValue.serverTimestamp(),
            });
          });
      }
    );
  };
  //lo mismo que crear un post pero aplicado a comentario.
  const publishComment = (data) => {
    const { id, comment } = data;
    db.collection("posts").doc(id).collection("comments").add({
      comment,
      username: user.displayName,
      currentTime: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };
  
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoader(false);
    });

    // busca el post desde firebase
    db.collection("posts")
      .orderBy("currentTime", "desc")
      .onSnapshot((snp) => {
        setPosts(
          snp.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            image: doc.data().image,
            username: doc.data().username,
          }))
        );
      });
  }, [user, loader]);
  console.log("Login user", user);
  //acá se retorna todos los elementos/funciones/métodos que se van a utilizar a lo largo de
  // todo el árbol de componentes.
  return (
    <ContextProvider.Provider
      value={{
        model,
        openModel,
        closeModel,
        register,
        login,
        user,
        loader,
        logout,
        create,
        posts,
        publishComment,
       
      }}
    >
      {props.children}
    </ContextProvider.Provider>
  );
};

export default Context;

