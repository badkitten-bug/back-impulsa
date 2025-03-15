function cliente_meta_objetivo_data(sequelize,Datatypes){
    const alias = "cliente_meta_objetivo";

    const cols = {
        id:{
            type:Datatypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        id_cliente:{
            type:Datatypes.UUID,
            allowNull:false
        },
        id_meta_objetivo:{
            type:Datatypes.INTEGER,
            allowNull:false
        },
        prioridad:{
            type:Datatypes.INTEGER,
            allowNull:false
        }
    };

    const config = {
        timestamps:false,
        tableName:"cliente_meta_objetivo"
    };

    const cliente_meta_objetivo = sequelize.define(alias,cols,config);

    cliente_meta_objetivo.associate = (modelos) => {
        cliente_meta_objetivo.belongsTo(modelos.cliente,{
            as:'metas_del_cliente',
            foreignKey:"id_cliente"
        }),
        cliente_meta_objetivo.belongsTo(modelos.meta_objetivo,{
            as:'cliente_y_metas',
            foreignKey:"id_meta_objetivo",
        })
    };
    
    return cliente_meta_objetivo;
}

module.exports = cliente_meta_objetivo_data;