module.exports = (sequelize, DataTypes) => {
    const Enfermo = sequelize.define('Enfermo', {
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

   
    Enfermo.associate = (models) => {
        Enfermo.belongsTo(models.User, {foreignKey: 'userId', as: 'Users', onDelete: 'CASCADE'});
    };

    return Enfermo;
}