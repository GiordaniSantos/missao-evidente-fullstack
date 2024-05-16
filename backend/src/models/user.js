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
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(1234),
            allowNull: false,
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