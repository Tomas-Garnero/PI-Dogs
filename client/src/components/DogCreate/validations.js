export default function validations(input) {
    let errors = {};

    if (!input.name) {
        errors.name = "Ingresar el Nombre de una Raza";
    } 
    
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(input.name)) {
        errors.name = "El nombre de la raza no debe contener números ni carácteres especiales"
    } 
    
    // if (!input.image) {
    //     errors.image = "Debe ingresar el Link de una imagen"
    // } 
    
    if (parseInt(input.image) > 255) {
        errors.image = "El link de la imágen es demaciado grande"
    } 
    
    // Weight
    if (!input.minWeight) {
        errors.minWeight = "Debe ingresar un valor para el peso mínimo de la Raza"
    } 
    
    if (!input.maxWeight) {
        errors.maxWeight = "Debe ingresar un valor para el peso máximo de la Raza"
    } 

    if (input.minWeight > input.maxWeight) {
        errors.minWeight = "El peso mínimo no puede ser mayor al peso máximo"
    } 
    
    if (input.maxWeight < input.minWeight) {
        errors.maxWeight = "El peso máximo no puede ser menor al peso mínimo"
    }

    if (parseInt(input.minWeight) <= 0) {
        errors.minWeight = "Debe ingresar un número válido para el peso"
    } 

    if (parseInt(input.maxWeight) <= 0) {
        errors.maxWeight = "Debe ingresar un número válido para el peso"
    } 
    
    // Height
    if (!input.minHeight) {
        errors.minHeight = "Debe ingresar un valor para la altura mínima de la Raza"
    } 

    if (!input.maxHeight) {
        errors.maxHeight = "Debe ingresar un valor para la altura máxima de la Raza"
    } 
    
    if (input.minHeight > input.maxHeight) {
        errors.minHeight = "La altura mínima no puede ser mayor a la altura máxima"
    } 
    
    if (input.maxHeight < input.minHeight) {
        errors.maxHeight = "La altura máxima no puede ser menor a la altura mínima"
    }

    if (parseInt(input.minHeight) <= 0) {
        errors.minHeight = "Debe ingresar un número válido para la altura"
    }
    
    if (parseInt(input.maxHeight) <= 0) {
        errors.maxHeight = "Debe ingresar un número válido para la altura"
    } 

    // Life
    if (!input.minLife) {
        errors.minLife = "Debe ingresar un valor para la esperanza de vida mínima de la Raza"
    } 

    if (!input.maxLife) {
        errors.maxLife = "Debe ingresar un valor para la esperanza de vida máxima de la Raza"
    } 

    if (parseInt(input.minLife) > parseInt(input.maxLife)) {
        errors.minLife = "La esperanza de vida mínima no puede ser mayor a la esperanza de vida máxima"
    } 

    if (parseInt(input.maxLife) < parseInt(input.minLife)) {
        errors.maxLife = "La esperanza de vida máxima no puede ser menor a la esperanza de vida mínima"
    } 
    
    if (parseInt(input.minLife) <= 0) {
        errors.minLife = "Debe ingresar un número válido para la esperanza de vida"
    } 

    if (parseInt(input.maxLife) <= 0) {
        errors.maxLife = "Debe ingresar un número válido para la esperanza de vida"
    } 
    
    if (parseInt(input.maxLife) > 25) {
        errors.maxLife = "Debe ingresar una esperanza de vida razonable (menor a 25 años)"
    } 
    
    return errors;
};
