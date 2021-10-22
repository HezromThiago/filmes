import { Link } from "react-router-dom"

import './erro.css';

export default function Erro() {
    return(
        <div className="not-found">
            <h1>Erro 404</h1>
            <h2>Página não encontrada!</h2> <br /> <br />

            <Link to="/" >Veja todos os Filmes</Link>
        </div>
    )
}