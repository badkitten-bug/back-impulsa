function tipo_usuario_data(sequelize,Datatypes){
    const alias = "tipo_usuario";

    const cols = {
        id:{
            type:Datatypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        tipo:{
            type:Datatypes.STRING(20),
            allowNull:false
        }
    };

    const config = {
        timestamps:false,
        tableName:"tipo_usuario"
    };

    const tipo_usuario = sequelize.define(alias,cols,config);

    tipo_usuario.associate = (modelos)=>{
        tipo_usuario.hasMany(modelos.usuario,{
            as:"tipo_usuario_usuario",
            foreignKey:"id_tipo_usuario"
        })
    };

    return tipo_usuario;
};

module.exports = tipo_usuario_data;