import bcript from 'bcrypt'
import moment from 'moment'
import jwt from 'jsonwebtoken'
import db from './../db/conection'
import config from '../config/config'

export interface AuthData {
  id?: number
  email: string
  password: string
  user_id: number
  created_at?: string
}

export function comparePassword (password: string, hash: string): boolean {
  return bcript.compareSync(password, hash)
}

export function getAuthByEmail (email: string) {
  return db<AuthData>('auths').where({email}).first()
}

export function createAuth (data: AuthData): Promise<AuthData> {
  const salt = bcript.genSaltSync()
  const hash = bcript.hashSync(data.password, salt)
  return new Promise<AuthData>((resolve, reject) => {
    db<AuthData>('auths').insert({
      email: data.email,
      password: hash,
      user_id: data.user_id
    }).returning('*').then(result => {
      resolve(result[0])
    }).catch(error => {
      reject(error)
    })
  })
}

export function encodeToken (userId: number) {
  const playload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: userId,
  }
  return jwt.sign(playload, config.jwt.secretKey)
}