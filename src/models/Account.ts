import {Model, Optional, Association, DataTypes, FindOptions} from 'sequelize'
import { comparePassword, encodeToken, hashPassword } from '../helpers/authHelpers'
import db from '../models'
import User from './User'
interface AccountAttributes {
  id: number
  email: string
  password: string
  is_online: boolean
  user_id: number
}

type AccountCreationAttributes = Optional<AccountAttributes, 'id'>

class Account extends Model<AccountAttributes, AccountCreationAttributes> implements AccountAttributes {
  public id!: number
  public email!: string
  public password!: string
  public is_online!: boolean
  public user_id!: number

  public readonly created_at!: Date
  public readonly updated_at!: Date

  public readonly user!: User

  public static associations: {
    user: Association<Account, User>
  }
}

Account.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(64),
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    is_online: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    tableName: 'accounts',
    modelName: 'Account',
    timestamps: true,
    underscored: true,
    sequelize: db.sequelize
  }
)

Account.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id',
  targetKey: 'id'
})

export default Account

export const doLoginWithEmailAndPassword = (email: string, password: string): Promise<string> => {
  return new Promise<string>(async (resolve, reject) => {
    const options: FindOptions<{email: string}> = {
      where: {
        email
      },
    }
    try {
      const account = await Account.findOne(options)
      if (account === null) throw new Error('Account not found')

      const isPasswordMatch = comparePassword(password, account.password)

      if (!isPasswordMatch) throw new Error('Password did\'nt match')
      account.is_online = true
      await account.save()
      const token = encodeToken(account.user_id)
      resolve(token)
    } catch (error) {
      reject(error)
    }
  })
}

interface RegisterWithUser extends AccountCreationAttributes {
  name: string
}

export const doRegisterWithUser = (data: RegisterWithUser): Promise<AccountCreationAttributes> => {
  return new Promise<AccountCreationAttributes>(async (resolve, reject) => {
    const options: FindOptions<{email: string}> = {
      where: {
        email: data.email
      }
    }
    try {

      const currentAccount = await Account.findOne(options)
      if (currentAccount !== null) throw new Error('email is already taken')

      const user = await User.create({
        display_name: data.name,
        full_name: data.name,
        gender: null,
        avatar: null,
        address_location: null
      })

      const passwordHash = hashPassword(data.password)

      const account = await Account.create({
        ...data,
        password: passwordHash,
        user_id: user.id,
      })
      resolve(account)
    } catch (error) {
      reject(error)
    }
  })
}

export const doGetUserDetail = (user_id: number) => {
  return new Promise(async (resolve, reject) => {
    const options: FindOptions<{user_id: number}> = {
      where: {
        user_id
      },
      attributes: {
        include: [['created_at', 'register_at']],
        exclude: ['password', 'createdAt', 'updatedAt', 'user_id']
      },
      include: [
        {
          association: Account.associations.user,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }
      ],
    }
    try {
      const account = await Account.findOne(options)
      resolve(account)
    } catch (error) {
      reject(error)
    }
  })
}