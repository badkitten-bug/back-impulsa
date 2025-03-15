function seguro_vida_data(sequelize,Datatypes){
    const alias = "seguro_vida";

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
        tableName:"seguro_vida"
    };

    const seguro_vida = sequelize.define(alias,cols,config);

    seguro_vida.associate = (modelos) => {
        seguro_vida.hasOne(modelos.cliente,{
            as:'seguro_vida_cliente',
            foreignKey:"id_seguro_vida"
        })
    };
    
    return seguro_vida;
}

module.exports = seguro_vida_data;