Nurse Backend (NestJS + Prisma + MySQL)

Setup:
1) cp .env.example .env  (edite as variáveis)
2) npm i
3) npx prisma generate
4) npx prisma migrate dev --name init
5) npm run seed
6) npm run start:dev

Auth:
- GET /auth/google  (redirect para Google)
- GET /auth/google/callback  (redireciona para CORS_ORIGIN com tokens na query)
- Rotas protegidas exigem Authorization: Bearer <accessToken>

Users:
- GET /users/me
- GET /users
- PATCH /users/:id  { role }

Attendances:
- GET /attendances?busca=&turma=&motivo=&start=YYYY-MM-DD&end=YYYY-MM-DD&page=1&pageSize=20
- GET /attendances/:id
- POST /attendances  (medications: [{itemId, quantidade}])
- PATCH /attendances/:id
- DELETE /attendances/:id

Items:
- GET /items?categoria=MEDICAMENTO|CURATIVO&q=&ativos=true
- GET /items/criticos
- GET /items/:id
- POST /items
- PATCH /items/:id
- DELETE /items/:id
- POST /items/:id/entrada  { quantidade, motivo }
- POST /items/:id/saida    { quantidade, motivo, attendanceId? }

Metrics:
- GET /metrics/kpis?period=hoje|semana|mes
- GET /metrics/series/daily?days=14
- GET /metrics/series/weekly?weeks=8
- GET /metrics/reasons/top?limit=6&period=semana|mes
