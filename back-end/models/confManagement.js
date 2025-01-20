import { db } from "./config.js";
import { DataTypes } from "sequelize";

const confManagement = db.define('confManagement', {
    confId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Conferences',
        key: 'id',
        },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE',
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
    },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE',
    },
    status: {
      type: DataTypes.ENUM('approved', 'pending', 'rejected', 'reviwer'),
      defaultValue: 'pending',
    },
  });
  
  export default confManagement;
