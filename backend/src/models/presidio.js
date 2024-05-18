module.exports = (sequelize, DataTypes) => {
    const Presidio = sequelize.define('Presidio', {
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

   
    Presidio.associate = (models) => {
        Presidio.belongsTo(models.User, {foreignKey: 'userId', as: 'Users', onDelete: 'CASCADE'});
    };

    return Presidio;
}