function meta_objetivo_data(sequelize,Datatypes){
    const alias = "meta_objetivo";

    const cols = {
        id:{
            type:Datatypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        tema:{
            type:Datatypes.STRING(100),
            allowNull:false //pre-crear los registros
        }
    };

    const config = {
        timestamps:false,
        tableName:"meta_objetivo"
    };

    const meta_objetivo = sequelize.define(alias,cols,config);

    meta_objetivo.associate = (modelos) => {
        meta_objetivo.hasMany(modelos.cliente_meta_objetivo,{
            as:'metas_para_cliente',
            foreignKey:"id_meta_objetivo"
        })
    };
    
    return meta_objetivo;
}

module.exports = meta_objetivo_data;