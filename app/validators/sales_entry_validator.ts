import vine from '@vinejs/vine'

export const createSalesEntryValidator = vine.compile(
  vine.object({
    customer_name: vine.string().trim().minLength(2).maxLength(150),
    town_name: vine.string().trim().minLength(2).maxLength(100),
    supplier_name: vine.string().trim().optional(),
    lines: vine.array(
      vine.object({
        marketing_name: vine.string().trim().minLength(1).maxLength(100),
        memory: vine.string().trim().minLength(1).maxLength(50),
        imei: vine.string().trim().optional(),
        quantity: vine.number().min(1),
      })
    ).minLength(1),
  })
)