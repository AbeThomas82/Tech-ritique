const {Model,DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
class Comment extends Model {}

Comment.init(
    {
        id: {
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        content: {
            type:DataTypes.TEXT,
            allowNull: false
        },
        dateCreated: {
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: "comment"
    }
)

module.exports = Comment;