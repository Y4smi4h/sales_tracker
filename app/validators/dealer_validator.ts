import vine from '@vinejs/vine'

export const createDealerValidator = vine.compile(
  vine.object({
    user_id: vine.number().exists(async (db, value) => {
      const user = await db.from('users').where('id', value).first()
      return !!user
    }),
    shop_name: vine.string().trim().minLength(2),
    dealer_category: vine.string().trim().optional(),
    town_id: vine.number().exists(async (db, value) => {
      const town = await db.from('towns').where('id', value).first()
      return !!town
    }),
    location: vine.string().trim().optional(),
    owner_name: vine.string().trim().minLength(2),
    phone_number: vine.string().trim().minLength(6),
  })
)
