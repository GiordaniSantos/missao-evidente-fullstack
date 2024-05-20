module.exports = (sequelize, DataTypes) => {
    const Membresia = sequelize.define('Membresia', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        nome: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                len: { args: [0, 20], msg: 'O campo nome deve ter no máximo 20 caracteres'},
                notNull: { msg: 'Escolha uma opção'},
                isIn: {
                    args: [['Primeiro Domingo', 'Segundo Domingo', 'Terceiro Domingo', 'Quarto Domingo']],
                    msg: 'A opção informada é inválida. Escolha uma opção válida: Primeiro Domingo, Segundo Domingo, Terceiro Domingo, Quarto Domingo.',
                },
            }
        },
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'O campo quantidade deve ser um número inteiro'},
                notNull: { msg: 'O campo quantidade deve ser preenchido'}
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
    });

   
    Membresia.associate = (models) => {
        Membresia.belongsTo(models.User, {foreignKey: 'userId', as: 'Users', onDelete: 'CASCADE'});
    };

    return Membresia;
}