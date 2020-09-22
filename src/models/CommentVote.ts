import {Model, Optional, Association, DataTypes, FindOptions} from 'sequelize'
import db from '../models'

interface CommentVoteAttributes {
  id: number
  comment_id: number
  user_id: number
}

type CommentVoteCreationAttributes = Optional<CommentVoteAttributes, 'id'>

class CommentVote extends Model<CommentVoteAttributes, CommentVoteCreationAttributes> implements CommentVoteAttributes {
  public id!: number
  public comment_id!: number
  public user_id!: number

  public readonly created_at!: Date
  public readonly updated_at!: Date
}

CommentVote.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    comment_id: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
  }, {
    tableName: 'comment_votes',
    modelName: 'CommentVote',
    underscored: true,
    timestamps: true,
    sequelize: db.sequelize
  }
)

export default CommentVote