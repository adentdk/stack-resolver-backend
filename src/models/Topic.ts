import {Model, Optional, Association, DataTypes, FindOptions, json, Op} from 'sequelize'
import { getOffset, Pagination } from '../helpers/paginateHelper'
import db from '../models'
import Comment from './Comment'
import User from './User'

interface TopicAttributes {
  id: number
  title: string
  tags: string
  viewed: number
  created_by: number
}

type TopicCreationAttributes = Optional<TopicAttributes, 'id'>

class Topic extends Model<TopicAttributes, TopicCreationAttributes> implements TopicAttributes {
  public id!: number
  public title!: string
  public tags!: string
  public viewed!: number
  public created_by!: number

  public readonly created_at!: Date
  public readonly updated_at!: Date

  public readonly comments!: Comment
  public readonly user!: User

  public static associations: {
    comments: Association<Topic, Comment>,
    user: Association<Topic, User>,
  }
}

Topic.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tags: {
      type: DataTypes.STRING(255),
      allowNull: false,
      get () {
        const rawValue = this.getDataValue('tags')
        return rawValue ? JSON.parse(rawValue) : null
      },
      set (value) {
        this.setDataValue('tags', JSON.stringify(value))
      }
    },
    viewed: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
  }, {
    tableName: 'topics',
    modelName: 'Topic',
    underscored: true,
    timestamps: true,
    sequelize: db.sequelize
  }
)
Topic.hasMany(Comment, {
  as: 'comments'
})
Topic.belongsTo(User, {
  as: 'user',
  foreignKey: 'created_by',
  targetKey: 'id'
})
export default Topic

interface TopicListFilter {
  page: string
  pageSize: string
  searchTitle: string
  userId: string
  tags: string[]
}

export const doGetTopicList = (filter: TopicListFilter): Promise<{pagination: Pagination, rows: Topic[]}>=> {
  return new Promise(async (resolve, reject) => {

    const page = parseInt(filter.page, 0) || 1
    const pageSize = parseInt(filter.pageSize, 0) || 10

    const offset = getOffset(page, pageSize)

    const options = {
      offset,
      limit: pageSize,
      attributes: {
        exclude: ['updatedAt', 'created_by'],
        include: [
          [db.Sequelize.col('user.display_name'), 'createdBy']
        ]
      },
      include: [
        {
          association: Topic.associations.user,
          as: 'user',
          attributes: []
        }
      ]
    } as unknown as FindOptions

    try {
      const [count, rows] = await Promise.all([Topic.count(options), Topic.findAll(options)])

      resolve({
        pagination: {
          page, pageSize,
          numberOfPages: Math.ceil(count / pageSize),
          numberOfRows: count
        },
        rows
      })
    } catch (error) {
      reject(error)
    }
  })
}

export const doCreateTopic = (data: TopicCreationAttributes) => {
  return new Promise(async (resolve, reject) => {
    try {
      const topic = await Topic.create(data)

      resolve(topic)
    } catch (error) {
      reject(error)
    }
  })
}

export const doGetTopicWithComments = (topicId: number, filter: any): Promise<Topic> => {
  return new Promise(async (resolve, reject) => {
    const options = {
      attributes: {
        exclude: ['updatedAt', 'created_by'],
        include: [
          [db.Sequelize.col('user.display_name'), 'createdBy']
        ]
      },
      include: [
        {
          association: Topic.associations.comments,
          as: 'comments'
        },
        {
          association: Topic.associations.user,
          as: 'user',
          attributes: []
        }
      ]
    } as unknown as FindOptions
    try {
      const topic = await Topic.findByPk(topicId, options)

      if (!topic) throw new Error('Topic not found')

      resolve(topic)
    } catch (error) {
      reject(error)
    }
  })
}