import { db } from "./config.js";
import { DataTypes } from "sequelize";

const confManagement = db.define('confManagement', {
    confId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('approved', 'pending', 'rejected'),
      defaultValue: 'pending',
    },
  });
  
  export default confManagement;
