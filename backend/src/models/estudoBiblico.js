module.exports = (sequelize, DataTypes) => {
    const EstudoBiblico = sequelize.define('EstudoBiblico', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        nome: {
            type: DataTypes.STRING(150),
            allowNull: true,
            validate: {
                len: { args: [0, 150], msg: 'O campo assunto deve ter no máximo 150 caracteres'}
            }
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
        tableName: 'EstudosBiblicos'
    });

   
    EstudoBiblico.associate = (models) => {
        EstudoBiblico.belongsTo(models.User, {foreignKey: 'userId', as: 'Users', onDelete: 'CASCADE'});
    };

    return EstudoBiblico;
}