const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EducationType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Education }) {
      this.hasMany(Education, { foreignKey: 'educationType_id' });
    }
  }
  EducationType.init(
    {
      education: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'EducationType',
      tableName: 'EducationTypes',
    }
  );
  return EducationType;
};
