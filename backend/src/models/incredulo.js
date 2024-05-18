module.exports = (sequelize, DataTypes) => {
    const Incredulo = sequelize.define('Incredulo', {
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

   
    Incredulo.associate = (models) => {
        Incredulo.belongsTo(models.User, {foreignKey: 'userId', as: 'Users', onDelete: 'CASCADE'});
    };

    return Incredulo;
}