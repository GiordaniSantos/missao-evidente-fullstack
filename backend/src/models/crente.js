module.exports = (sequelize, DataTypes) => {
    const Crente = sequelize.define('Crente', {
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
    });

   
    Crente.associate = (models) => {
        Crente.belongsTo(models.User, {foreignKey: 'userId', as: 'Users'});
    };

    return Crente;
}