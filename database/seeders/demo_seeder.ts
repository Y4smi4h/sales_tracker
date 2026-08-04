import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Town from '#models/town'
import Device from '#models/device'
import User from '#models/user'
import Dealer from '#models/dealer'

export default class extends BaseSeeder {
  async run() {
    const town = await Town.create({
      townName: 'Yaoundé',
      region: 'Centre',
      division: 'Mfoundi',
    })

    await Device.create({ marketingName: 'A07', memory: '64GB/4GB' })

    const adminUser = await User.create({
      fullName: 'Admin Test',
      email: 'youwayasmina@gmail.com',
      password: 'password123',
      role: 'admin',
    })

    const dealerUser = await User.create({
      fullName: 'Dealer Test',
      email: 'youwayasmine@gmail.com',
      password: 'password123',
      role: 'dealer',
    })

    await Dealer.create({
      userId: dealerUser.id,
      shopName: 'Shop Test',
      townId: town.id,
      ownerName: 'John Doe',
      phoneNumber: '699000000',
    })
  }
}