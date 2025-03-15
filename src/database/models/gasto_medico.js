function gasto_medico_data(sequelize,Datatypes){
    const alias = "gasto_medico";

    const cols = {
        id:{
            type:Datatypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        seguro_gastos:{
            type:Datatypes.BOOLEAN,
            allowNull:true
        },
        tipo_seguro:{
            type:Datatypes.INTEGER, // son solo 2 opciones 0 o 1
            allowNull:true
        },
        adecuado:{
            type:Datatypes.BOOLEAN,
            allowNull:true
        },
        company:{
            type:Datatypes.STRING(100),
            allowNull:true
        },
        enfermedad:{
            type:Datatypes.STRING(100),
            allowNull:true
        }
    };

    const config = {
        timestamps:false,
        tableName:"gasto_medico"
    };

    const gasto_medico = sequelize.define(alias,cols,config);

    gasto_medico.associate = (modelos) => {
        gasto_medico.hasOne(modelos.cliente,{
            as:'gasto_medico_cliente',
            foreignKey:"id_gasto_medico"
        })
    };
    
    return gasto_medico;
};

module.exports = gasto_medico_data