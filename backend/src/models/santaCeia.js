module.exports = (sequelize, DataTypes) => {
    const SantaCeia = sequelize.define('SantaCeia', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER,
            validate: {
                async isValidUserId(value) {
                    const userExists = await sequelize.models.User.count({ where: { id: value } });
                    if (!userExists) {
                        throw new Error('O usuário informado não existe.');
                    }
                }
            }
        },
    }, {
        tableName: 'SantasCeias'
    });

   
    SantaCeia.associate = (models) => {
        SantaCeia.belongsTo(models.User, {foreignKey: 'userId', as: 'Users', onDelete: 'CASCADE'});
    };

    return SantaCeia;
}