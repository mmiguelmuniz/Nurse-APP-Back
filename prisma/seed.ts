import { PrismaClient, ItemCategory, MovementType, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ✅ Admin
  await prisma.user.upsert({
    where: { email: 'admin@nurse.app' },
    update: {},
    create: { name: 'Admin', email: 'admin@nurse.app', role: Role.ADMIN },
  });

  // ✅ Classes (todas as turmas que você mandou) — sem duplicar em re-run
  const classes = [
    'NURSERY A','NURSERY B','NURSERY C',
    'PK 3 A','PK 3 B','PK 4 A','PK 4 B',
    'KINDER A','KINDER B',
    '1st A','1st B','2nd A','2nd B','3rd A','3rd B','4th A','4th B','5th A','5th B',
    '6th A','6th B','7th A','7th B','8th A','8th B',
    '9th A','9th B','10th A','10th B','11th A','11th B','12th A','12th B',
  ];

  for (const name of classes) {
    const existing = await prisma.class.findFirst({ where: { name } });
    if (!existing) await prisma.class.create({ data: { name } });
  }

  // ✅ Reasons
  for (const r of ['Dor de cabeça', 'Corte', 'Náusea', 'Febre', 'Rotina']) {
    await prisma.reason.upsert({
      where: { name: r },
      update: {},
      create: { name: r },
    });
  }

  // ✅ Communications
  for (const c of ['JUPITER', 'CALL', 'WHATSAPP', 'PRESENCIAL']) {
    await prisma.communication.upsert({
      where: { name: c },
      update: {},
      create: { name: c },
    });
  }

  // ✅ Items + estoque (não duplica em re-run)
  const items = [
    { nome: 'Paracetamol 500mg', categoria: ItemCategory.MEDICAMENTO, unidade: 'comprimido', minimo: 20 },
    { nome: 'Soro Fisiológico 0.9%', categoria: ItemCategory.CURATIVO, unidade: 'ml', minimo: 200 },
    { nome: 'Curativo adesivo', categoria: ItemCategory.CURATIVO, unidade: 'un', minimo: 50 },
  ];

  for (const it of items) {
    const existing = await prisma.item.findFirst({ where: { nome: it.nome } });
    if (existing) continue;

    const item = await prisma.item.create({ data: { ...it, estoqueAtual: 0 } });

    const qtdInicial = 100;
    await prisma.movement.create({
      data: { itemId: item.id, tipo: MovementType.ENTRADA, quantidade: qtdInicial, motivo: 'Seed' },
    });

    await prisma.item.update({
      where: { id: item.id },
      data: { estoqueAtual: qtdInicial },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
