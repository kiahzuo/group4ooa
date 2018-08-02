// models/cart.js
var myDatabase = require('../controller/database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;
//var sequelizeTransforms = require('sequelize-transforms');

const Transactions = sequelize.define('Transactions', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    checkout_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    },
    buyer_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    seller_ids: {  // Should/Will be removed
        type: Sequelize.STRING,
        allowNull: true
    },
    book_ids: { // Remember using comma as delimiter
        type: Sequelize.STRING,
        allowNull: false
    },
    total_amount: {
        type: Sequelize.DECIMAL,
        allowNull: false  
    },
    transaction_status: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// force: true will drop the table if it already exists
Transactions.sync({ force: false, logging: console.log}).then(() => {
    console.log("Transactions table synced");
    // Test table creation with dummy data
    // return Transactions.upsert({
    //     id: 1,
    //     book_id: '1',
    //     user_id: '1',
    // })
});

module.exports = sequelize.model('Transactions', Transactions);

