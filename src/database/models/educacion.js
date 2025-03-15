function educacion_data(sequelize,Datatypes){
    const alias = "educacion";

    const cols = {
        id:{
            type:Datatypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        ahorros_educacion:{
            type:Datatypes.BOOLEAN,
            allowNull:true
        },
        universidad:{
            type:Datatypes.STRING(100),
            allowNull:true
        },
        ahorro_mensual:{
            type:Datatypes.INTEGER,
            allowNull:true
        },
        instrumento_ahorro:{
            type:Datatypes.STRING(100),
            allowNull:true
        },
        monto_acumulado:{
            type:Datatypes.INTEGER,
            allowNull:true
        },
        capacidad_ahorro:{
            type:Datatypes.INTEGER,
            allowNull:true
        }
    };

    const config = {
        timestamps:false,
        tableName:"educacion"
    };

    const educacion = sequelize.define(alias,cols,config);

    educacion.associate = (modelos) => {
        educacion.hasOne(modelos.cliente,{
            as:'educacion_cliente',
            foreignKey:"id_educacion"
        })
    };
    
    return educacion;
};

module.exports = educacion_data