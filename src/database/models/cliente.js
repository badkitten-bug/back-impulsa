const { toDefaultValue } = require("sequelize/lib/utils");

function cliente_data(sequelize,Datatypes){
    const alias = "cliente";

    const cols = {
        id: {
            type: Datatypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Datatypes.UUIDV4,
        },
        nombreApellido: {
            type: Datatypes.STRING(100),
            allowNull: false,
        },
        ocupacion: {
            type: Datatypes.STRING(100),
            allowNull: false,
        },
        fecha_nacimiento: {
            type: Datatypes.DATEONLY,
            allowNull: false,
        },
        /*cantidadHijos:{
                type:Datatypes.INTEGER,
                allowNull:true
            },*/
        pareja: {
            type: Datatypes.BOOLEAN,
            allowNull: true,
        },
        inversion_metas: {
            type: Datatypes.INTEGER,
            allowNull: false,
        },
    };

    const config = {
        timestamps:true,
        tableName:"cliente"
    };

    const cliente = sequelize.define(alias,cols,config);

    cliente.associate = (modelos)=>{
        cliente.hasMany(modelos.hijo,{
            as:'cliente_hijo',
            foreignKey:"id_cliente"
        }),
        cliente.belongsTo(modelos.estado_alta,{
            as:'cliente_estado_alta',
            foreignKey:"id_estado_alta"
        }),
        cliente.belongsTo(modelos.estado_civil,{
            as:'cliente_estado_civil',
            foreignKey:"id_estado_civil"
        }),
        cliente.belongsTo(modelos.usuario,{
            as:'cliente_usuario',
            foreignKey:"id_usuario"
        }),
        cliente.belongsTo(modelos.pareja,{
            as:'cliente_pareja',
            foreignKey:"id_pareja"
        }),
        cliente.hasMany(modelos.cliente_persona_recomienda,{
            as:'persona_recomendada',
            foreignKey:"id_cliente"
        }),
        cliente.belongsTo(modelos.ahorro,{
            as:'cliente_ahorro',
            foreignKey:"id_ahorro"
        }),
        cliente.belongsTo(modelos.pareja,{
            as:'cliente_educacion',
            foreignKey:"id_educacion"
        }),
        cliente.belongsTo(modelos.gasto_medico,{
            as:'cliente_gasto_medico',
            foreignKey:"id_gasto_medico"
        }),
        cliente.belongsTo(modelos.invalidez,{
            as:'cliente_invalidez',
            foreignKey:"id_invalidez"
        }),
        cliente.belongsTo(modelos.retiro_pension,{
            as:'cliente_retiro_pension',
            foreignKey:"id_retiro_pension"
        }),
        cliente.belongsTo(modelos.seguro_vida_pareja,{
            as:'cliente_seguro_vida_pareja',
            foreignKey:"id_seguro_vida_pareja"
        }),
        cliente.belongsTo(modelos.seguro_vida,{
            as:'cliente_seguro_vida',
            foreignKey:"id_seguro_vida"
        }),
        cliente.hasMany(modelos.cliente_meta_objetivo,{
            as:'las_metas',
            foreignKey:"id_cliente"
        })
    };

    return cliente;
};

module.exports = cliente_data;
