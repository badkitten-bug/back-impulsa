function invalidez_data(sequelize,Datatypes){
    const alias = "invalidez";

    const cols = {
        id:{
            type:Datatypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        percepcion_ingreso:{
            type:Datatypes.BOOLEAN,
            allowNull:true
        },
        modo_ingreso:{
            type:Datatypes.STRING(100),
            allowNull:true
        },
        tiempo_alcanze_economico:{
            type:Datatypes.STRING(100),
            allowNull:true
        },
        dependencia:{
            type:Datatypes.BOOLEAN,
            allowNull:true
        }
    };

    const config = {
        timestamps:false,
        tableName:"invalidez"
    };

    const invalidez = sequelize.define(alias,cols,config);

    invalidez.associate = (modelos) => {
        invalidez.hasOne(modelos.cliente,{
            as:'invalidez_cliente',
            foreignKey:"id_invalidez"
        })
    };
    
    return invalidez;
}

module.exports = invalidez_data