module.exports = (sequelize, Sequelize) => {
  const SpinnerParts = sequelize.define("spinner_parts", {
    fillStyle: {
      type: Sequelize.STRING
    },
    text: {
      type: Sequelize.STRING
    },
    fontsize: {
      type: Sequelize.STRING
    },
    textFillStyle: {
      type: Sequelize.STRING
    },
    position: {
      type: Sequelize.STRING
    }
  });

  return SpinnerParts;
};
