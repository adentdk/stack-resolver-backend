import db from './../db/conection'

export interface UserData {
  id?: number
  avatar?: string | null
  full_name?: string
  display_name?: string
  gender?: 'male' | 'female' | null
  adress_location?: string | null
  created_at?: string
}

export function getUserById (id: number) {
  return db<UserData>('users').where({id}).select('*').first()
}

export function createUser (data: UserData): Promise<UserData> {
  return new Promise<UserData>((resolve, reject) => {
    db<UserData>('users').insert(data).returning('*').then(result => {
      resolve(result[0])
    }).catch(error => {
      reject(error)
    })
  })
}