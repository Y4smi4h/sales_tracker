import vine from '@vinejs/vine'

export const signupValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(2).maxLength(50),
    email: vine.string().trim().email(),
    password: vine.string().minLength(6),
    town_name: vine.string().trim().minLength(2).maxLength(100),
    phone_number: vine.string().trim().optional(),
  })
)