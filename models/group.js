module.exports = function (sequelize, DataTypes) {
    var Group = sequelize.define("Group", {
        groupname: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Group.associate = function(models) {
        Group.hasMany(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Group.hasMany(models.OrderGroup, {
            foreignKey: {
                allowNull: false
            }
        }); 
    }

    return Group;
};

