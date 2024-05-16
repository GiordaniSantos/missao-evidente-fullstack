module.exports = (sequelize, DataTypes) => {
    const Escola = sequelize.define('Escola', {
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

   
    Escola.associate = (models) => {
        Escola.belongsTo(models.User, {foreignKey: 'userId', as: 'Users'});
    };

    return Escola;
}