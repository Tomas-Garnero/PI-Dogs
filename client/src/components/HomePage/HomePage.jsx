import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getDogs,
    getTemperaments,
    filterByTemperament,
    filterByCreated,
    order,
    resetPagination
} from "../../Redux/Actions";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import NavBar from "../NavBar/NavBar";
import Header from "../Header/Header";
import loading from "../Img/loading.gif"
import "./HomePage.css";


export default function HomePage() {

    const dispatch = useDispatch();

    const allDogs = useSelector((state) => state.dogs);
    const pagination = useSelector((state) => state.paginado);

    const [currentPage, setCurrentPage] = useState(1);
    
    const [dogsPerPage, setDogsPerPage] = useState(8);
    
    const indexLastDog = pagination.current * dogsPerPage;  
    
    const indexFirstDog = indexLastDog - dogsPerPage;
    
    const currentDog = allDogs.slice(indexFirstDog, indexLastDog)  

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, [])

    useEffect(() => {
        dispatch(resetPagination({current: currentPage}));
    }, [currentPage])

    function handleFilterTemperament(e) {
        e.preventDefault();
        dispatch(filterByTemperament(e.target.value));
        setCurrentPage(1);

    }

    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterByCreated(e.target.value));
        setCurrentPage(1);
    }

    function handleOrder(e) {
        e.preventDefault();
        dispatch(order(e.target.value));
        setCurrentPage(1);
    }


    return (
        <div className="home">
            <Header />
            <div>
                <NavBar 
                    byOrder={handleOrder}
                    byTemperament={handleFilterTemperament}
                    byCreated={handleFilterCreated}
                />
            </div>
            <div className="navbar">
                <Pagination
                    dogsPerPage={dogsPerPage}
                    allDogs={allDogs.length}
                    paginado={paginado}
                />
            </div>
            {currentDog.length ? (
                <div className="container">
                    {currentDog.map(dog => {
                        return (
                            <Card 
                                id={dog.id}
                                name={dog.name}
                                temperament={dog.temperament}
                                weight={dog.weight}
                                height={dog.height}
                                image={dog.image}
                                key={dog.id}
                            />
                        )
                    })}
                </div>
            ) : (
                <div>
                    <img className="loading" src={loading} alt="Cargando..." />
                </div>
            )}
            <div className="navbar">
                <Pagination
                    dogsPerPage={dogsPerPage}
                    allDogs={allDogs.length}
                    paginado={paginado}
                />
            </div>
        </div>
    )
};
