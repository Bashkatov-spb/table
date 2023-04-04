const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, EducationType }) {
      EducationType.belongsToMany(User, {
        through: Education,
        foreignKey: 'educationType_id',
        otherKey: 'user_id',
      });
      User.belongsToMany(EducationType, {
        through: Education,
        foreignKey: 'user_id',
        otherKey: 'educationType_id',
      });
    }
  }
  Education.init(
    {
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      educationType_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'EducationTypes',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Education',
    }
  );
  return Education;
};
