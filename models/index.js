const sequelize = require('../config/connection');
const seedPlanet = require('../seeds/planet-data');
const seedUser = require('../seeds/user-seeds');

const seedAll = async () => {
    
    await sequelize.sync({ force: true });

    await seedPlanet();

    await seedUser();

  process.exit(0);
};
seedAll();