const {Model,DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkpassword(password) {
        return bcrypt.compareSync(password,this.password)
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        //email: {
        //    type: DataTypes.STRING,
        //    allowNull: false
        //},
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        hooks: {
            async beforeCreate(userData) {
                userData.password = await bcrypt.hash(userData.password,10)
                return userData
            },
            async beforeUpdate(userData) {
                userData.password = await bcrypt.hash(userData.password,10)
                return userData
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: "user"
    }
)

module.exports = User;