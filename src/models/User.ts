import {Model, Optional, Association, DataTypes, FindOptions} from 'sequelize'
import db from '../models'
import Account from './Account'

interface UserAttributes {
  id: number
  display_name: string
  full_name: string
  avatar: string | null
  gender: 'male' | 'female' | null
  address_location: string | null
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number
  public display_name!: string
  public full_name!: string
  public avatar!: string
  public gender!: 'male' | 'female'
  public address_location!: string

  public readonly created_at!: Date
  public readonly updated_at!: Date

  public readonly account!: Account

  public static associations: {
    account: Association<User, Account>,
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    display_name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    full_name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM('male', 'female'),
      allowNull: true
    },
    address_location: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'users',
    modelName: 'User',
    underscored: true,
    timestamps: true,
    sequelize: db.sequelize
  }
)

export default User