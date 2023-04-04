/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const educationsData = [
      {
        user_id: 1,
        educationType_id: 1,
      },
      {
        user_id: 2,
        educationType_id: 4,
      },
      {
        user_id: 3,
        educationType_id: 2,
      },
    ];
    const educations = educationsData.map((education) => ({
      ...education,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Education', educations);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Education');
  },
};
