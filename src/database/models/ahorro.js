function ahorro_data(sequelize,Datatypes){
    const alias = "ahorro";

    const cols = {
        id:{
            type:Datatypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        ahorro_sistematico:{
            type:Datatypes.BOOLEAN,
            allowNull:true
        },
        cantidad_mensual:{
            type:Datatypes.INTEGER,
            allowNull:true
        },
        instrumento_financiero:{
            type:Datatypes.STRING(100),
            allowNull:true
        }
    };

    const config = {
        timestamps:false,
        tableName:"ahorro"
    };

    const ahorro = sequelize.define(alias,cols,config);

    ahorro.associate = (modelos) => {
        ahorro.hasOne(modelos.cliente,{
            as:'ahorro_cliente',
            foreignKey:"id_ahorro"
        })
    };
    
    return ahorro;
};

module.exports = ahorro_data