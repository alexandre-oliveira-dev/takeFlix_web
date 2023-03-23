import { Link } from 'react-router-dom';
import './header.css'

function Header() {
    return (
        <header className='header'>
            <div className='logo'>
                <h2>Take<strong>Flix</strong></h2>
                <p>Filmes e Séries</p>
            </div>
            <div className='btn-area-header'>
                <div>
                    <button>Home</button>
                </div>
                <div>
                    <button>Filmes</button>
                </div>
                <div>
                    <button>Séries</button>
                </div>
                <div>
                    <button>Lançamentos</button>
                </div>
            </div>

            <div className='login-area-user'>
                <div>
                    <button>Login</button>
                </div>
                <div>
                    <button onClick={()=> window.location.href='/cadastro'}>Cadastre-se</button>
                </div>

            </div>
        </header>
    )
}
export default Header;