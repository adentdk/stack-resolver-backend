import {Model, Optional, Association, DataTypes} from 'sequelize'
import db from '../models'
import CommentVote from './CommentVote'
import User from './User'

interface CommentAttributes {
  id: number
  content: string
  type: 'init' | 'replies'
  topic_id: number
  parent_id: number
  created_by: number
}

type CommentCreationAttributes = Optional<CommentAttributes, 'id'>

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  public id!: number
  public content!: string
  public type!: 'init' | 'replies'
  public topic_id!: number
  public parent_id!: number
  public created_by!: number

  public readonly created_at!: Date
  public readonly updated_at!: Date

  public readonly CommentVotes!: CommentVote
  public readonly user!: User

  public static associations: {
    commentVotes: Association<Comment, CommentVote>,
    user: Association<Comment, User>,
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
    type: {
      type: DataTypes.ENUM('init', 'replies'),
      allowNull: false,
      defaultValue: 'replies'
    },
    parent_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    topic_id: {
      type: DataTypes.INTEGER.UNSIGNED
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

Comment.belongsTo(User, {
  as: 'user',
  foreignKey: 'created_by'
})

export default Comment