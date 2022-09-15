export default function validations(input) {
    let errors = {};

    if (!input.name) {
        errors.name = "Ingresar el Nombre de una Raza";

    } else if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(input.name)) {
        errors.name = "El nombre de la raza no debe contener números ni carácteres especiales"

    } else if (!input.image) {
        errors.image = "Debe ingresar el Link de una imagen"

    } else if (parseInt(input.image) > 255) {
        errors.image = "El link de la imágen es demaciado grande"

    } else if (!input.minWeight) {
        errors.minWeight = "Debe ingresar un valor para el peso mínimo de la Raza"

    } else if (input.minWeight > input.maxWeight) {
        errors.minWeight = "El peso mínimo no puede ser mayor al peso máximo"

    } else if (!input.maxWeight) {
        errors.maxWeight = "Debe ingresar un valor para el peso máximo de la Raza"

    } else if (!input.minHeight) {
        errors.minHeight = "Debe ingresar un valor para la altura mínima de la Raza"

    } else if (input.minHeight > input.maxHeight) {
        errors.minHeight = "La altura mínima no puede ser mayor a la altura máxima"

    } else if (!input.maxHeight) {
        errors.maxHeight = "Debe ingresar un valor para la altura máxima de la Raza"

    } else if (parseInt(input.minWeight) <= 0) {
        errors.minWeight = "Debe ingresar un número válido para el peso"

    } else if (parseInt(input.minHeight) <= 0) {
        errors.minHeight = "Debe ingresar un número válido para la altura"

    } else if (parseInt(input.minLife) < 0) {
        errors.minLife = "La esperanza de vida debe ser mayor a 1 año"

    } else if (input.minLife > input.maxLife) {
        errors.minLife = "La esperanza de vida mínima no puede ser mayor a la esperanza de vida máxima"

    } else if (parseInt(input.maxLife) > 21) {
        errors.maxLife = "Debe ingresar una esperanza de vida razonable (menor a 21 años)"

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

// export default function validations(input) {
//     let errors = {};

//     switch(input.value) {
//         case "valor1":
//             if (!input.name) {
//                 errors.name = "Ingresar el Nombre de una Raza";
//             }
//         case "valor2":
//             if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(input.name)) {
//                 errors.name = "El nombre de la raza no debe contener números ni carácteres especiales"
//             }
//         case "valor3":
//             if (!input.minWeight) {
//                 errors.minWeight = "Debe ingresar un valor para el peso mínimo de la Raza"
//             }
//         case "valor4":
//             if (!input.maxWeight) {
//                 errors.maxWeight = "Debe ingresar un valor para el peso máximo de la Raza"
//             }
//         case "valor5":
//             if (!input.minHeight) {
//                 errors.minHeight = "Debe ingresar un valor para la altura mínima de la Raza"
//             }
//         case "valor6":
//             if (!input.maxHeight) {
//                 errors.maxHeight = "Debe ingresar un valor para la altura máxima de la Raza"
//             }
//         case "valor7":
//             if (parseInt(input.minWeight) <= 0) {
//                 errors.minWeight = "Debe ingresar un número válido para el peso"
//             }
//         case "valor8":
//             if (parseInt(input.minHeight) <= 0) {
//                 errors.minHeight = "Debe ingresar un número válido para la altura"
//             }
//         case "valor9":
//             if (parseInt(input.minLife) < 0) {
//                 errors.minLife = "La esperanza de vida debe ser mayor a 1 año"
//             }
//         case "valor10":
//             if (parseInt(input.maxLife) > 21) {
//                 errors.maxLife = "Debe ingresar una esperanza de vida razonable (menor a 21 años)"
//             }
//         case "valor11":
//             if (parseInt(input.image) > 255) {
//                 errors.image = "El link de la imágen es demaciado grande"
//             }
//         case "valor12":
//             if (parseInt(input.minLife) > parseInt(input.maxLife)){
//                 errors.minLife = "Dato incorrecto. La esperanza de vida Mín. es mayor a la Máx."
//             }
//         case "valor13":
//             if (parseInt(input.minWeight) > parseInt(input.maxWeight)){
//                 errors.minWeight = "Dato incorrecto. El peso Mín. es mayor al Máx."
//             }
//         case "valor14":
//             if (parseInt(input.minHeight) > parseInt(input.maxHeight)){
//                 errors.minHeight = "Dato incorrecto. La altura Mín es mayor al Máx"
//             }
//     }
//     return errors;
// };