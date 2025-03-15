function estado_civil_data(sequelize,Datatypes){
    const alias = "estado_civil";

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
        timestamps:false,
        tableName:"estado_civil"
    };

    const estado_civil = sequelize.define(alias,cols,config);

    estado_civil.associate = (modelos)=>{
        estado_civil.hasMany(modelos.cliente,{
            as:'estado_civil_cliente',
            foreignKey:"id_estado_civil"
        })
    };

    return estado_civil;
};

module.exports = estado_civil_data;