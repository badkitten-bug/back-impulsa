function hijo_data(sequelize,Datatypes){
    const alias = "hijo";

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
        fecha_nacimiento:{
            type:Datatypes.DATEONLY,
            allowNull:true
        }
    };

    const config = {
        timestamps:false,
        tableName:"hijo"
    };

    const hijo = sequelize.define(alias,cols,config);

    hijo.associate = (modelos)=>{
        hijo.belongsTo(modelos.cliente,{
            as:'hijo_cliente',
            foreignKey:"id_cliente"
        })
    };

    return hijo;
};

module.exports = hijo_data;