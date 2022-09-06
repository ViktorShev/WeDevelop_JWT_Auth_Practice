jest.mock('../../src/service_providers/sequelize/models', () => {
  return {
    __esModule: true,
    default: {
      user: {
        create: jest.fn(),
        findOne: jest.fn()
      }
    },
  }
})


import resolvers from '../../src/user_management/user.resolver'
import models from '../../src/service_providers/sequelize/models'

const FAKE_SIGNUP_USER_PROVIDED_DATA = {
  email: 'test@test.com',
  firstName: 'testFirstName',
  lastName: 'testLastName',
  username: 'testUsername',
  password: 'testPassword'
}

const FAKE_SINGIN_USER_PROVIDED_DATA = {
  username: 'fakeUsername',
  password: 'fakePassword'
}

describe('Signup tests', () => {
  it('On successful signup, the signup resolver returns an object containing a user instance, null JWT and null authError', async () => {
    models.user.create.mockResolvedValue('FAKE_USER')
    const resolverResponse = await resolvers.Mutation.signup(undefined, { data: FAKE_SIGNUP_USER_PROVIDED_DATA })

    expect(models.user.create).toHaveBeenCalledWith(FAKE_SIGNUP_USER_PROVIDED_DATA)
    expect(resolverResponse).toEqual(
      {
        user: 'FAKE_USER',
        jwt: null,
        authError: null
      }
    )
  })

  it('On unsuccessful signup, the signup resolver throws an error containing the text: "USER_CREATE_FAIL"', async () => {
    models.user.create.mockRejectedValue()
    
    await expect(resolvers.Mutation.signup(undefined, { data: FAKE_SIGNUP_USER_PROVIDED_DATA })).rejects.toThrow('USER_CREATE_FAIL')
  })
})

describe('Signin tests', () => {
  it('On successful signin, the signin resolver returns an object containing a user instance, a valid JWT and null authError', async () => {
    models.user.findOne.mockImplementation((optionsObject) => {
      return {
        id: '1',
        email: 'fakeEmail@fakeEmail.com',
        firstName: 'fakeFirstName',
        lastName: 'fakeLastName',
        username: optionsObject.where.username,
        password: '2f99d7b4ade138d91faa7a6ea4e9b33983df5bba362d5ee60217c61bf29d48d496c892971b4acd92ceee940bacf419b9e6ffc486c1b627d02195874a7d1974e6', // This is the hex of the hash of 'fakePassword' using 'fakeSalt' as the salt.
        salt: 'fakeSalt'
      }
    })

    const resolverResponse = await resolvers.Mutation.signin(undefined, { data: FAKE_SINGIN_USER_PROVIDED_DATA })
    expect(resolverResponse).toEqual(
      {
        user: resolverResponse.user,
        jwt: resolverResponse.jwt,
        authError: null
      }
    )
  })

  it('On unsuccessful signin, the signin resolver throws an error containing the text: "USER_LOGIN_FAIL"', async () => {
    models.user.findOne.mockRejectedValue()

    await expect(resolvers.Mutation.signin(undefined, { data: FAKE_SINGIN_USER_PROVIDED_DATA })).rejects.toThrow('USER_LOGIN_FAIL')
  })
})
