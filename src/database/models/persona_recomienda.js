function persona_recomienda_data(sequelize,Datatypes){
    const alias = "persona_recomienda";

    const cols = {
        id:{
            type:Datatypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        nombreApellido:{
            type:Datatypes.STRING(100),
            allowNull:true
        },
        celular:{
            type:Datatypes.STRING(100),
            allowNull:true
        },
        email:{
            type:Datatypes.STRING(100),
            allowNull:true
        }
    };

    const config = {
        timestamps:false,
        tableName:"persona_recomienda"
    };

    const persona_recomienda = sequelize.define(alias,cols,config);

    persona_recomienda.associate = (modelos)=>{
        persona_recomienda.hasMany(modelos.cliente_persona_recomienda,{
            as:'persona_recomendante',
            foreignKey:"id_persona_recomienda"
        });
    };

    return persona_recomienda;
};

module.exports = persona_recomienda_data;