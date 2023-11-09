import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  city: string
  address: string
  postalCode: string
  whatsAppNumber: string
}

export async function registerUseCase({
  name,
  email,
  password,
  city,
  address,
  postalCode,
  whatsAppNumber,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameInfos = await prisma.organization.findUnique({
    where: {
      email,
      name,
      whatsAppNumber,
    },
  })

  if (userWithSameInfos) {
    throw new Error('Já existe uma organização com esses dados.')
  }

  await prisma.organization.create({
    data: {
      name,
      email,
      password_hash,
      city,
      address,
      postalCode,
      whatsAppNumber,
    },
  })
}
