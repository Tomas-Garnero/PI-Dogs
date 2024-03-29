import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ image, name, temperament, weight, id }) {

    let temp = "";
    typeof temperament === "object" ?
        temp = temperament.map(t => {
            return t.name;
        }).join(", ") : temp = temperament

    
    return (
        <Link to={`/home/${id}`} className="link">
            <div className="card">
                <h2 className="namedog">{`Raza: ${name}`}</h2>
                <h3 className="tempdog">{`Temperamentos: ${temp}`}</h3>
                <div>
                    <img className="image" src={image} alt="" width="300px" height="220px"/>
                </div>
                <h4 className="weightdog">{`Peso: Min ${weight[0]} Kg - Max ${weight[1]} Kg`} </h4>
            </div>
        </Link>
    )
};
