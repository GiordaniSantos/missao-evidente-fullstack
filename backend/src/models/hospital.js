module.exports = (sequelize, DataTypes) => {
    const Hospital = sequelize.define('Hospital', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        nome: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER
        },
    }, {
        tableName: 'Hospitais' // Define the table name here
    });

   
    Hospital.associate = (models) => {
        Hospital.belongsTo(models.User, {foreignKey: 'userId', as: 'Users'});
    };

    return Hospital;
}