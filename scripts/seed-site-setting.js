import prisma from '../prisma/client.ts'

async function seedSiteSetting() {
  await prisma.siteSetting.upsert({
    where: { key: 'campApplicationsEnabled' },
    update: {},
    create: {
      key: 'campApplicationsEnabled',
      name: 'Camp Applications',
      description: 'Show or hide the camp application form on the public site',
      value: false
    }
  })
}

seedSiteSetting()
