function usuario_data(sequelize,Datatypes){
    const alias = "usuario";

    const cols = {
        id:{
            type:Datatypes.UUID,
            allowNull:false,
            primaryKey:true,
            defaultValue: Datatypes.UUIDV4
        },
        nombre_apellido:{
            type:Datatypes.STRING(100),
            allowNull:false
        },
        celular:{
            type:Datatypes.STRING(100),
            allowNull:true
        },
        email:{
            type:Datatypes.STRING(100),
            allowNull:false,
            unique:true
        },
        contrasenia:{
            type:Datatypes.STRING,
            allowNull:true
        },
        foto:{
            type:Datatypes.STRING,
            allowNull:true
        },
        localidad:{
            type:Datatypes.STRING(100),
            allowNull:true
        },
        pais:{
            type:Datatypes.STRING(100),
            allowNull:true
        }, 
        googleId: {
            type: Datatypes.STRING(100),
            allowNull:true
        },
        status:{
            type:Datatypes.INTEGER,
            allowNull:false,
            defaultValue:0
        },

    };

    const config = {
        timestamps:true,
        tableName:"usuario"
    };

    const usuario = sequelize.define(alias,cols,config);

    usuario.associate = (modelos)=>{
        usuario.belongsTo(modelos.tipo_usuario,{
            as:"usuario_tipo_usuario",
            foreignKey:"id_tipo_usuario"
        }),
        usuario.hasMany(modelos.cliente,{
            as:'usuario_cliente',
            foreignKey:"id_usuario"
        })
    };
    
    return usuario;
};

module.exports = usuario_data;