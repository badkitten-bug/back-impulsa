function pareja_data(sequelize,Datatypes){
    const alias = "pareja";

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
        ocupacion:{
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
        tableName:"pareja"
    };

    const pareja = sequelize.define(alias,cols,config);

    pareja.associate = (modelos)=>{
        pareja.hasOne(modelos.cliente,{
            as:'pareja_cliente',
            foreignKey:"id_pareja"
        });
    };

    return pareja;
};

module.exports = pareja_data;