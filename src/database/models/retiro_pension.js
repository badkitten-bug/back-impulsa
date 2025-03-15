function retiro_pension_data(sequelize,Datatypes){
    const alias = "retiro_pension";

    const cols = {
        id:{
            type:Datatypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        edad_retiro:{
            type:Datatypes.INTEGER,
            allowNull:true
        },
        plan_retiro:{
            type:Datatypes.BOOLEAN,
            allowNull:true
        },
        tipo_plan:{
            type:Datatypes.INTEGER,  // solo 2 opciones 1 o 0
            allowNull:true
        },
        plan_retiro_pareja:{
            type:Datatypes.BOOLEAN,
            allowNull:true
        },
        tipo_plan_pareja:{
            type:Datatypes.INTEGER,  // solo 2 opciones 1 o 0
            allowNull:true
        },
        pago_seguro_social:{
            type:Datatypes.BOOLEAN,
            allowNull:true
        },
        pago_seguro_social_pareja:{
            type:Datatypes.BOOLEAN,
            allowNull:true
        },
        pension:{
            type:Datatypes.BOOLEAN,
            allowNull:true
        },
        ingresos_retirado:{
            type:Datatypes.INTEGER,
            allowNull:true
        }
    };

    const config = {
        timestamps:false,
        tableName:"retiro_pension"
    };

    const retiro_pension = sequelize.define(alias,cols,config);

    retiro_pension.associate = (modelos) => {
        retiro_pension.hasOne(modelos.cliente,{
            as:'retiro_pension_cliente',
            foreignKey:"id_retiro_pension"
        })
    };
    
    return retiro_pension;
}

module.exports = retiro_pension_data