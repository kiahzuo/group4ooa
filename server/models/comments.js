// models/comments.js
var myDatabase = require('../controller/database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

const Comments = sequelize.define('Comments', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        trim: true
    },
    rating: {
        type: Sequelize.INTEGER,
     
    },
    content: {
        type: Sequelize.STRING,
        defaultValue: '',
        trim: true
    },
    user_id:{
        type: Sequelize.STRING,
      
    }
});

// force: true will drop the table if it already exists
Comments.sync({ force: false, logging: console.log}).then(() => {
    // Table created
    console.log("comments table synced");
});

module.exports = sequelize.model('Comments', Comments);