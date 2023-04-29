import { useEffect, useState } from "react";
import "./header.css";
import { FiUser } from "react-icons/fi";

function Header(props) {
  const [user, setUser] = useState();
  useEffect(() => {
    const localstorage = JSON.parse(localStorage.getItem("@tokenTakeflix")) || '[]';
    setUser(localstorage);

    console.log(localstorage)
  }, []);


  return (
    <header style={{ background: props.color }} className="header">
      <div className="logo" onClick={() => (window.location.href = "/")}>
        <h2>
          Take<strong>Flix</strong>
        </h2>
        <p>Filmes e Séries</p>
      </div>
      <div className="btn-area-header">
        <div>
          <button onClick={() => (window.location.href = "/page/1")}>Home</button>
        </div>
        <div>
          <button onClick={() => (window.location.href = "/filmes/page/1")}>Filmes</button>
        </div>
        <div>
          <button onClick={() => (window.location.href = "/series/page/1")}>Séries</button>
        </div>
        <div>
          <button onClick={() => (window.location.href = "/favoritos")}>Favoritos</button>
        </div>
      </div>

      {user ? (
        <div className="userinfo">
          <label>
            <FiUser color="#fff"></FiUser>olá {user?.name}
          </label>
          <button
            id="sair"
            onClick={() => {
              localStorage.removeItem("@tokenTakeflix");
              window.location.href = "/";
            }}
          >
            sair
          </button>
        </div>
      ) : (
        <div className="login-area-user">
          <div>
            <button onClick={() => (window.location.href = "/login")}>Login</button>
          </div>
          <div>
            <button onClick={() => (window.location.href = "/cadastro")}>Cadastre-se</button>
          </div>
        </div>
      )}
    </header>
  );
}
export default Header;
