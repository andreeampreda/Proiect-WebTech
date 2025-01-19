import { db } from "./config.js";
import { DataTypes } from "sequelize";

const confManagement = db.define('confManagement', {
    confId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Conferences', // Numele tabelei asociate
        key: 'id', // Coloana cheii primare
        },
        onDelete: 'CASCADE', // Comportamentul la ștergere
        onUpdate: 'CASCADE',
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
    },
        onDelete: 'CASCADE', // Comportamentul la ștergere
        onUpdate: 'CASCADE',
    },
    status: {
      type: DataTypes.ENUM('approved', 'pending', 'rejected'),
      defaultValue: 'pending',
    },
  });
  
  export default confManagement;
