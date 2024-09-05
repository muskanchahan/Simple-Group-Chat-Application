const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('appointment_db', 'root', 'muskan!!!@00$', {
  host: 'localhost',     // or the IP address of your MySQL server
  dialect: 'mysql',
});

const Appointment = sequelize.define('Appointment', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync the model with the database
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

module.exports = {
  sequelize,
  Appointment,
};
