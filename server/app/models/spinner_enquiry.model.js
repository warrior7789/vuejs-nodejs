module.exports = (sequelize, Sequelize) => {
  const SpinnerEnquiry = sequelize.define('spinner_enquiry', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    number: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    entryDate: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  });

  return SpinnerEnquiry;
};
