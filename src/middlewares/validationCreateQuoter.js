const {body} = require("express-validator");

// obligatorio datos cliente y metas y objetivos
const validationCreateQuoter = [
    body("nombreApellidoCliente").notEmpty().withMessage("campo obligatorio"),
    body("ocupacionCliente").notEmpty().withMessage("campo obligatorio"),
    body("fecha_nacimiento_cliente").notEmpty().withMessage("campo obligatorio"),
    body("id_estado_civil").notEmpty().withMessage("campo obligatorio"),
    body("inversion_metas").notEmpty().withMessage("campo obligatorio"),

    // Validar array de objetos "datos_hijos"
    //body("datos_hijos").isArray().withMessage("debe ser un array"),
    //body("datos_hijos.*.nombreApellidoHijo").notEmpty().withMessage("nombre es requerido"),
    //body("datos_hijos.*.fecha_nacimiento_hijo").notEmpty().withMessage("la fecha de nacimiento es requerida es requerido"),
    
   
    // Validar array de objetos "metas_y_objetivos"
    //body("metas_y_objetivos").isArray().withMessage("debe ser un array"),
    body("metas_y_objetivos.*.id_meta_objetivo").notEmpty().withMessage("el campo de metas es obligatorio"),
    body("metas_y_objetivos.*.prioridad").notEmpty().withMessage("prioridad es obligatorio"),

    // Validación personalizada para verificar que las prioridades no se repitan
    body("metas_y_objetivos").custom((value) => {
        const prioridades = value.map((item) => item.prioridad);
        const uniquePrioridades = new Set(prioridades);
        if (prioridades.length !== uniquePrioridades.size) {
        throw new Error("Las prioridades no deben repetirse");
        }
        return true;
    })
];

module.exports = validationCreateQuoter;