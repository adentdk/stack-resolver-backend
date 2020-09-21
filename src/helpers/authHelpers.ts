import bcript from 'bcrypt'
import db from './../db/conection'

export interface AuthData {
  id?: number
  email: string
  password: string
  user_id: number
  created_at?: string
}

export function getAuthByEmail (email: string) {
  return db<AuthData>('auths').where({email}).select(['id', 'email']).first()
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