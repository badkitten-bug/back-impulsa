function seguro_vida_pareja_data(sequelize,Datatypes){
    const alias = "seguro_vida_pareja";

    const cols = {
        id:{
            type:Datatypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        asegurado:{
            type:Datatypes.BOOLEAN,
            allowNull:true
        },
        tipo_seguro:{
            type:Datatypes.INTEGER,  // solo 2 opciones 1 o 0
            allowNull:true
        },
        monto_asegurado:{
            type:Datatypes.INTEGER,
            allowNull:true
        },
        prima:{
            type:Datatypes.INTEGER,
            allowNull:true
        },
        cantidad:{
            type:Datatypes.STRING(100),
            allowNull:true
        },
        company:{
            type:Datatypes.STRING(100),
            allowNull:true
        }
    };

    const config = {
        timestamps:false,
        tableName:"seguro_vida_pareja"
    };

    const seguro_vida_pareja = sequelize.define(alias,cols,config);

    seguro_vida_pareja.associate = (modelos) => {
        seguro_vida_pareja.hasOne(modelos.cliente,{
            as:'seguro_vida_pareja_cliente',
            foreignKey:"id_seguro_vida_pareja"
        })
    };
    
    return seguro_vida_pareja;
}

module.exports = seguro_vida_pareja_data;