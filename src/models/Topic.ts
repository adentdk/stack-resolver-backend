import {Model, Optional, Association, DataTypes, FindOptions} from 'sequelize'
import { getOffset } from '../helpers/paginateHelper'
import db from '../models'
import Comment from './Comment'

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

  public static associations: {
    comments: Association<Topic, Comment>,
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
      allowNull: false
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

export default Topic

interface TopicListFilter {
  page: string
  pageSize: string
  searchTitle: string
  userId: string
  tags: string[]
}

export const doGetTopicList = (filter: TopicListFilter) => {
  return new Promise(async (resolve, reject) => {

    const page = parseInt(filter.page, 0) || 1
    const pageSize = parseInt(filter.pageSize, 0) || 10

    const offset = getOffset(page, pageSize)

    const options: FindOptions = {
      offset,
      limit: pageSize
    }

    try {
      const topics = await Topic.findAll(options)

      resolve(topics)
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