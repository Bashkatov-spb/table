/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const educationTypesData = [
      {
        education: 'Аспирантура',
      },
      {
        education: 'Бакалавриат',
      },
      {
        education: 'Докторантура',
      },
      {
        education: 'Высшее образование',
      },
    ];
    const educationTypes = educationTypesData.map((educationType) => ({
      ...educationType,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('EducationTypes', educationTypes);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('EducationTypes');
  },
};
