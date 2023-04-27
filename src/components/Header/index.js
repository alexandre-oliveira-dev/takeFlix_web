import "./header.css";

function Header(props) {
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

      <div className="login-area-user">
        <div>
          <button>Login</button>
        </div>
        <div>
          <button onClick={() => (window.location.href = "/cadastro")}>Cadastre-se</button>
        </div>
      </div>
    </header>
  );
}
export default Header;
