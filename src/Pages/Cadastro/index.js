import React from "react";
import './style.css'
import Header from '../../components/Header'
import Title from '../../components/Title'



const Cadastro = () => {
    return (
        <div className="containercadastro">
            <Header></Header>
            <div className="box-area-form">
                <form className="form">
                    <Title texto='Cadastre-se' color='#121212'></Title>
                    <p>🖤Obtenha informações atualizadas de Filmes e Séries </p>
                    <input type={'text'} placeholder='Nome'></input>
                    <input type={'text'} placeholder='E-mail'></input>
                    <input type={'text'} placeholder='Telefone'></input>
                    <input type={'text'} placeholder='Senha'></input>

                    <button type="submit">Cadastrar</button>
                    <a href="/login">Já possui cadastro?, login.</a>
                </form>
            </div>
        </div>
    )
}
export default Cadastro;