function cliente_persona_recomienda_data(sequelize,Datatypes){
    const alias = "cliente_persona_recomienda";

    const cols = {
        id:{
            type:Datatypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        id_cliente:{
            type:Datatypes.UUID,
            allowNull:true
        },
        id_persona_recomienda:{
            type:Datatypes.INTEGER,
            allowNull:true
        }
    };

    const config = {
        timestamps:false,
        tableName:"cliente_persona_recomienda"
    };

    const cliente_persona_recomienda = sequelize.define(alias,cols,config);

    cliente_persona_recomienda.associate = (modelos) => {
        cliente_persona_recomienda.belongsTo(modelos.cliente,{
            as:'persona_cliente',
            foreignKey:"id_cliente"
        }),
        cliente_persona_recomienda.belongsTo(modelos.persona_recomienda,{
            as:'cliente_persona',
            foreignKey:"id_persona_recomienda",
        });
    };
    
    return cliente_persona_recomienda;
};

module.exports = cliente_persona_recomienda_data;