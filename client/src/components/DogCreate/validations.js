export default function validations(input) {
    let errors = {};

    if (!input.name) {
        errors.name = "Ingresar el Nombre de una Raza";

    } else if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(input.name)) {
        errors.name = "El nombre de la raza no debe contener números ni carácteres especiales"

    } else if (!input.minWeight) {
        errors.minWeight = "Debe ingresar un valor para el peso mínimo de la Raza"

    } else if (!input.maxWeight) {
        errors.maxWeight = "Debe ingresar un valor para el peso máximo de la Raza"

    } else if (!input.minHeight) {
        errors.minHeight = "Debe ingresar un valor para la altura mínima de la Raza"

    } else if (!input.maxHeight) {
        errors.maxHeight = "Debe ingresar un valor para la altura máxima de la Raza"

    } else if (parseInt(input.minWeight) <= 0) {
        errors.minWeight = "Debe ingresar un número válido para el peso"

    } else if (parseInt(input.minHeight) <= 0) {
        errors.minHeight = "Debe ingresar un número válido para la altura"

    } else if (parseInt(input.minLife) < 0) {
        errors.minLife = "La esperanza de vida debe ser mayor a 1 año"

    } else if (parseInt(input.maxLife) > 21) {
        errors.maxLife = "Debe ingresar una esperanza de vida razonable (menor a 21 años)"

    } else if (parseInt(input.image) > 255) {
        errors.image = "El link de la imágen es demaciado grande"

    } else if (parseInt(input.minLife) > parseInt(input.maxLife)){
        errors.minLife = "Dato incorrecto. La esperanza de vida Mín. es mayor a la Máx."
    }
    if (parseInt(input.minWeight) > parseInt(input.maxWeight)){
        errors.minWeight = "Dato incorrecto. El peso Mín. es mayor al Máx."
    }
    if (parseInt(input.minHeight) > parseInt(input.maxHeight)){
        errors.minHeight = "Dato incorrecto. La altura Mín es mayor al Máx"
    }
    
    return errors;
};