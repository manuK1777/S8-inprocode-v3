import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const Event = sequelize.define('Event', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '#3788d8',
  },
}, {
  timestamps: true, 
  updatedAt: 'updated_at',
  createdAt: 'created_at',
});

export default Event;
