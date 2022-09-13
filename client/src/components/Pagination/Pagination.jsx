import React from "react";
import "./Pagination.css";


export default function Pagination({dogsPerPage, allDogs, paginado, currentPage}) {

    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i + 1);
    }


    return (
        <nav>
            <div>
                {
                    pageNumbers?.map(number => (
                        <button className="btn-numbers" key={number} onClick={() => paginado(number)}>
                            {number}
                        </button>
                    ))
                }
            </div>
        </nav>
    )

    // return (
    //     <div>
    //         <ul className="asd">
    //             {
    //                 pageNumbers?.map(number => (
    //                     <button className="btn" key={number} onClick={() => paginado(number)}>
    //                         {number}
    //                     </button>
    //                 ))
    //             }
    //         </ul>
    //     </div>
    // )
};


