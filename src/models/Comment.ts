import {Model, Optional, Association, DataTypes, FindOptions} from 'sequelize'
import db from '../models'
import CommentVote from './CommentVote'

interface CommentAttributes {
  id: number
  content: string
  topic_id: number
  parent_id: number
  created_by: number
}

type CommentCreationAttributes = Optional<CommentAttributes, 'id'>

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  public id!: number
  public content!: string
  public topic_id!: number
  public parent_id!: number
  public created_by!: number

  public readonly created_at!: Date
  public readonly updated_at!: Date

  public readonly CommentVotes!: CommentVote

  public static associations: {
    commentVotes: Association<Comment, CommentVote>,
  }
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT
    },
    parent_id: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    topic_id: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    created_by: {
      type: DataTypes.INTEGER.UNSIGNED
    },
  }, {
    tableName: 'comments',
    modelName: 'Comment',
    underscored: true,
    timestamps: true,
    sequelize: db.sequelize
  }
)

export default Comment