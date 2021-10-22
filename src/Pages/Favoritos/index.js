import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './favoritos.css';
import { toast } from 'react-toastify';

export default function Favoritos() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem('filmes');
        setFilmes(JSON.parse(minhaLista) || []);
    }, []);

    function handleDelete(id) {
        let filtroFilmes = filmes.filter((item) => { // "filter" percorre o array com condicional que eu passei
            return (item.id !== id) // Retorna o array DIFERENTE do ID selecionado no botao
        });

        setFilmes(filtroFilmes); // Seta o novo array na State "filmes"
        localStorage.setItem('filmes', JSON.stringify(filtroFilmes));
        // Armazena no LocalStorage o Array montado.

        toast.success('Filme excluido com sucesso.');
    }

    return(
        <div className="meusFilmes">
            <h1>Meus Filmes favoritos</h1>

            {filmes.length === 0 && <span>Você não possui nenhum Filme Salvo, :( </span>}

            <ul>
                {filmes.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.nome}</span>

                            <div>
                                <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                                <button onClick={() => handleDelete(item.id)}>Excluir</button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}