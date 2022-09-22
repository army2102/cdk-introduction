import Container from 'typedi'

import UserRepository from '@/repositories/user-repository'
import { listUserReponseSchema } from '@/routes/user-route.schema'
import User from '@/entities/user-entity'
import { build } from './setup'

describe('User Routes', () => {
  const server = build()

  describe('GET /user', () => {
    describe('Have one user', () => {
      const userRepository = Container.get(UserRepository)
      const user = new User(
        'nae',
        'nae3x',
        '123456',
        new Date('2022-01-01'),
        ''
      )

      beforeAll(() => {
        userRepository.create(user)
      })

      afterAll(() => {
        userRepository.deleteAll()
      })

      it('Should return list of user', async () => {
        const response = await server.inject({
          url: '/user',
          method: 'GET'
        })

        const actual = response.json()

        expect(response.statusCode).toEqual(200)
        expect(actual.data.length).toEqual(1)
        expect(actual).toMatchSchema(listUserReponseSchema)
        expect(actual.data[0].id).toStrictEqual(user.id)
        expect(actual.data[0].name).toStrictEqual(user.name)
        expect(actual.data[0].username).toStrictEqual(user.username)
        expect(actual.data[0].birthdate).toStrictEqual('2022-01-01')
      })
    })

    describe('Have zero user', () => {
      it('Should return empty list of user', async () => {
        const expected = { data: [] }
        const response = await server.inject({ url: '/user', method: 'GET' })

        const actual = response.json()

        expect(response.statusCode).toEqual(200)
        expect(actual).toStrictEqual(expected)
      })
    })

    // TODO: Add test for creating user
  })
})
