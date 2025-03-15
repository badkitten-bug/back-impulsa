function estado_alta_data(sequelize,Datatypes){
    const alias = "estado_alta";

    const cols = {
        id:{
            type:Datatypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        estado:{
            type:Datatypes.STRING(20),
            allowNull:false
        }
    };

    const config = {
        timestamps:true,
        tableName:"estado_alta"
    };

    const estado_alta = sequelize.define(alias,cols,config);

    estado_alta.associate = (modelos)=>{
        estado_alta.hasMany(modelos.cliente,{
            as:'estado_alta_cliente',
            foreignKey:"id_estado_alta"
        })
    };

    return estado_alta;
};

module.exports = estado_alta_data;