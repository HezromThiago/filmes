import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import api from '../../Services/api';

import { toast } from 'react-toastify';

import './filme.css';


export default function Filme() {
    const { id } = useParams();
    const history = useHistory();

    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {

        async function loadFilme() {
            const response = await api.get(`r-api/?api=filmes/${id}`);

            if(response.data.length === 0) {
                //Tentou acessar com id que não exite, volta o nav pra home
                history.replace('/');
                return;
            }

            setFilme(response.data);
            setLoading(false);
        }

        loadFilme();

        return () => {
            console.log("componente desmontado");
        }

    }, [history, id]);

    function salvaFilme() {
    
        const minhaLista = localStorage.getItem("filmes");// busca no localStorage os items


        let filmesSalvos = JSON.parse(minhaLista) || []; //transfora em JSON ou array[Vazio]

        // Se Tiver algum filme com o mesmo ID, ele ignora
        const hasFilmes = filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id);
        // a function SOME retorna um Boolean, caso exista o filme igual true, se nao false

        if(hasFilmes) {
            toast.error("Você ja possui esse filme Salvo", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return; // para a execução do codigo aqui;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    }

    if (loading) {
        return(
            <div>
                Carregando...
            </div>
        );
    }
    return (
    
        <div className="filme-info">
            <h1>{filme.nome}</h1>
            <img src={filme.foto} alt={filme.nome} />
            <h3>Sinopse:</h3>
            <span>{filme.sinopse}</span>
            
            <div className="botoes">
                <button onClick={salvaFilme}>Salvar</button>
                <button>
                    <a 
                    target="_blank"
                    href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    );
}