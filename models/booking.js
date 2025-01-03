module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    photographerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Photographers',
        key: 'id'
      }
    },
    packageName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    packagePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    bookingDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled'),
      defaultValue: 'pending'
    },
    paymentStatus: {
      type: DataTypes.ENUM('pending', 'paid', 'refunded'),
      defaultValue: 'pending'
    },
    paymentIntentId: {
      type: DataTypes.STRING
    },
    notes: {
      type: DataTypes.TEXT
    }
  });

  Booking.associate = (models) => {
    Booking.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'client'
    });
    Booking.belongsTo(models.Photographer, {
      foreignKey: 'photographerId',
      as: 'photographer'
    });
  };

  return Booking;
};