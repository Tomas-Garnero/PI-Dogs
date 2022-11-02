const initialState = {
    dogs: [],
    allDogs: [],
    dogDetail: [],
    temperaments: [],
    paginado: {}
}

function rootReducer (state = initialState, action) {

    switch(action.type) {

        case "GET_DOGS":
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            };
        
        case "GET_DOG_NAME":
            // const dog = [...action.payload];
            return {
                ...state,
                dogs: action.payload
                // dogs: dog
            }
        
        case "GET_DETAIL":
            return {
                ...state,
                dogDetail: action.payload
            }
        
        case "CLEAR_DETAIL":
            return {
                ...state,
                // dogDetail: []
                dogDetail: action.payload
            }
        
        case "GET_TEMPERAMENTS":
            return {
                ...state, 
                temperaments: action.payload
            }
        
        case "POST_DOG":
            return {
                ...state, 
                allDogs: [...state.allDogs, action.payload]
            }

        case "UPDATE_DOG":
            return {
                ...state,
                allDogs: [...state.allDogs, action.payload]
            }
        
        case "ORDER":
            const dogsDefault = [...state.allDogs];
            const dogsSorted = 
                action.payload === "default" ? 
                    {...state, dogs: dogsDefault} : 
                action.payload === "Asc" ?
                    {...state, dogs: dogsDefault.sort((a,b) => {
                        if (a.name > b.name) return 1;
                        if (a.name < b.name) return -1;
                        return 0;
                        })
                    } :
                action.payload === "Desc" ?
                    {...state, dogs: dogsDefault.sort((a,b) => {
                        if (a.name > b.name) return -1;
                        if (a.name < b.name) return 1;
                        return 0;
                        })
                    } :
                action.payload === "Min_weight" ?
                    {...state, dogs: dogsDefault.sort((a,b) => {
                        if (a.weight[0] > b.weight[0]) return 1;
                        if (a.weight[0] < b.weight[0]) return -1;
                        return 0;
                        })
                    } :
                action.payload === "Max_weight" ?
                    {...state, dogs: dogsDefault.sort((a,b) => {
                        if (a.weight[1] > b.weight[1]) return -1;
                        if (a.weight[1] < b.weight[1]) return 1;
                        return 0;
                        })
                    } : dogsDefault;

            return dogsSorted
            
        
        case "FILTER_BY_TEMPERAMENT":
            const dogs1 = state.allDogs;
            const dogsFilter = state.allDogs;

            dogs1.map(dog => {
                return (
                    typeof dog.temperament === "object" ?
                    dog.temperament = dog.temperament.map(temp => {
                        return temp.name
                    }).join(", ") :
                    dog.temperament
                )
            });

            const temperamentFilter = 
                action.payload === "All" ?
                    state.allDogs : // aca podria ir "dogs1" ya que en teoria mostraria todos los temp
                    dogsFilter.filter(e => 
                        e.temperament?.includes(action.payload)
                        // return e; // capaz q podria no ir
                    );
            
            return {
                ...state, 
                dogs: temperamentFilter
            }
        
        case "FILTER_BY_CREATED":
            const dogs2 = state.allDogs;

            const createdFilter = 
                action.payload === "All" ?
                    state.allDogs : // aca podria ir "dogs2" ya que en teoria me mostraria todos los perros
                    dogs2.filter(e => {
                        if (action.payload === "Created") {
                            if (e !== null && e.createdAtDb) {
                                return true;
                            }
                        } else if (action.payload === "Api") {
                            if (e !== null && !e.createdAtDb) {
                                return true;
                            }
                        }
                        return false;
                    });

            return {
                ...state,
                dogs: createdFilter
            }

        case "RESET_PAGINATION":
            return {
                ...state, 
                paginado: action.payload
            }
        
        default:
            return state;
    }
}

export default rootReducer;