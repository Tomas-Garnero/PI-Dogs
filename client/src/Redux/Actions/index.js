import axios from "axios";

export function getDogs() {
    return async function(dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/dogs");
            return dispatch({
                type: "GET_DOGS",
                payload: json.data
            });
        } catch(error) {
            console.log(error);
        }
    }
};

export function getDogName(name) {
    return async function(dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dogs?name=${name}`);
            return dispatch({
                type: "GET_DOG_NAME",
                payload: json.data
            });
        } catch(error){
            console.log(error);
            alert (`El perro no se encontro! ERROR: ${error}`);
        }
    }
};

export function getDetail(id) {
    return async function(dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dogs/${id}`);
            return dispatch({
                type: "GET_DETAIL",
                payload: json.data
            });
        } catch(error) {
            console.log(error);
            alert (`No se encontro el detalle del perro! ERROR: ${error}`);
        }
    }
};

export function clearDetail() {
    return {
        type: "CLEAR_DETAIL",
        payload: []
    }
};

export function getTemperaments() {
    return async function(dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/temperaments`);
            return dispatch({
                type: "GET_TEMPERAMENTS",
                payload: json.data
            });
        } catch(error) {
            console.log(error);
        }
    }
};

export function postDog(payload) {
    return async function(dispatch) {
        try {
            var json = await axios.post("http://localhost:3001/dogs", payload);
            return dispatch({
                type: "POST_DOG",
                payload: json.data
            });
        } catch(error) {
            console.log(error);
        }
    }
};

export function order(payload) {
    return {
        type: "ORDER",
        payload
    }
};

export function filterByTemperament(payload) {
    return {
        type: "FILTER_BY_TEMPERAMENT",
        payload
    }
};

export function filterByCreated(payload) {
    return {
        type: "FILTER_BY_CREATED",
        payload
    }
};

export function resetPagination(payload) {
    return {
        type: "RESET_PAGINATION",
        payload
    }
};


