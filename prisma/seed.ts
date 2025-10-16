import { PrismaClient, ItemCategory, MovementType, Role } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@nurse.app' },
    update: {},
    create: { name: 'Admin', email: 'admin@nurse.app', role: Role.ADMIN },
  });

  const classes = ['G9A','G9B','G10A','G11A','G12A'].map(name => ({ name }));
  for (const c of classes) await prisma.class.create({ data: c });

  for (const r of ['Dor de cabeça','Corte','Náusea','Febre','Rotina']) {
    await prisma.reason.upsert({ where: { name: r }, update: {}, create: { name: r }});
  }

  for (const c of ['JUPITER','CALL','WHATSAPP','PRESENCIAL']) {
    await prisma.communication.upsert({ where: { name: c }, update: {}, create: { name: c }});
  }

  const items = [
    { nome: 'Paracetamol 500mg', categoria: ItemCategory.MEDICAMENTO, unidade: 'comprimido', minimo: 20 },
    { nome: 'Soro Fisiológico 0.9%', categoria: ItemCategory.CURATIVO, unidade: 'ml', minimo: 200 },
    { nome: 'Curativo adesivo', categoria: ItemCategory.CURATIVO, unidade: 'un', minimo: 50 },
  ];
  for (const it of items) {
    const item = await prisma.item.create({ data: { ...it } });
    await prisma.movement.create({
      data: { itemId: item.id, tipo: MovementType.ENTRADA, quantidade: 100, motivo: 'Seed' }
    });
    const agg = await prisma.movement.groupBy({
      by: ['itemId','tipo'],
      where: { itemId: item.id },
      _sum: { quantidade: true }
    });
    const entrada = agg.filter(a=>a.tipo==='ENTRADA').reduce((s,a)=>s+(a._sum.quantidade||0),0);
    const saida = agg.filter(a=>a.tipo==='SAIDA').reduce((s,a)=>s+(a._sum.quantidade||0),0);
    await prisma.item.update({ where: { id: item.id }, data: { estoqueAtual: entrada - saida }});
  }
}

main().catch(e=>{ console.error(e); process.exit(1); }).finally(()=>prisma.$disconnect());
