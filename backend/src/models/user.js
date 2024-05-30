module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: { args: [0, 255], msg: 'O campo nome deve ter no máximo 255 caracteres'}
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Por favor, insira um endereço de email válido.'
                },
                len: { args: [0, 255], msg: 'O campo nome deve ter no máximo 255 caracteres'}
            }
        },
        password: {
            type: DataTypes.STRING(1234),
            allowNull: false,
            validate: {
                len: { args: [8, Infinity], msg: 'O campo senha deve ter no minimo 8 caracteres'}
            }
        },
        jwtVersion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    });

    User.prototype.toJSON = function() {
        const values = { ...this.get() };
        delete values.password;
        return values;
    };

    return User;
}