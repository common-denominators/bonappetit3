module.exports = function (sequelize, DataTypes) {
    var OrderDetail = sequelize.define("OrderDetail", {
        menuitem: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        specialrequest: {
            type: DataTypes.STRING
        }
    })

    // OrderDetail.associate = function (models) {
    //     OrderDetail.belongsTo(models.OrderGroup, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    //     OrderDetail.hasMany(models.User, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     })
    // }

    return OrderDetail;
}