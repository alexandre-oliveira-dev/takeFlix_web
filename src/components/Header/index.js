import { useEffect, useState } from "react";
import "./header.css";
import { FiHeart, FiHome, FiMenu, FiUser } from "react-icons/fi";
import { BiMoviePlay } from "react-icons/bi";

function Header(props) {
  const [user, setUser] = useState();
  useEffect(() => {
    const localstorage = JSON.parse(localStorage.getItem("@tokenTakeflix")) || "[]";
    setUser(localstorage);

    console.log(localstorage);
  }, []);

  return (
    <header style={{ background: props.color,marginBottom:props.margin }} className="header">
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

      <button
        id="btnmobilemenu"
        onClick={() => {
          document.querySelector(".navBarMobile").classList.toggle("navBarMobileshow");
        }}
      >
        <FiMenu color="#fff" size={25}></FiMenu>
      </button>

      <div className="navBarMobile">
        {user !== "[]" ? (
          <>
            <label>
              <FiUser color="#fff"></FiUser>olá {user?.email}
              <button
                id="sair"
                onClick={() => {
                  localStorage.removeItem("@tokenTakeflix");
                  window.location.href = "/";
                }}
              >
                sair
              </button>
            </label>
          </>
        ) : (
          <>
            <div>
              <button
                className="btnloginandcadastro"
                onClick={() => (window.location.href = "/login")}
              >
                Login
              </button>
            </div>
            <div>
              <button
                className="btnloginandcadastro"
                onClick={() => (window.location.href = "/cadastro")}
              >
                Cadastre-se
              </button>
            </div>
          </>
        )}
        <br></br>

        <button className="btnmobile" onClick={() => (window.location.href = "/page/1")}>
          <FiHome></FiHome> Home
        </button>

        <button className="btnmobile" onClick={() => (window.location.href = "/filmes/page/1")}>
          <BiMoviePlay></BiMoviePlay> Filmes
        </button>

        <button className="btnmobile" onClick={() => (window.location.href = "/series/page/1")}>
          <BiMoviePlay></BiMoviePlay> Séries
        </button>

        <button className="btnmobile" onClick={() => (window.location.href = "/favoritos")}>
          <FiHeart></FiHeart> Favoritos
        </button>
        <br></br>
        <div className="logo" onClick={() => (window.location.href = "/")}>
          <h2>
            Take<strong>Flix</strong>
          </h2>
          <p>Filmes e Séries</p>
        </div>
      </div>

      {user !== "[]" ? (
        <div className="userinfo">
          <label>
            <FiUser color="#fff"></FiUser>olá {user?.email}
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
