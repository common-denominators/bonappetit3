module.exports = function (sequelize, DataTypes) {
    var OrderGroup = sequelize.define("OrderGroup", {
        ordername: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        orderDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        restaurant: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        runner: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        reason: {
            type: DataTypes.STRING
        }
    })

    // OrderGroup.associate = function(models) {
    //     OrderGroup.hasMany(models.OrderDetail, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     })
    // }
    return OrderGroup;
}