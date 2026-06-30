import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

function parseCSV(content: string) {
  const lines = content.split('\n').filter(l => l.trim())
  const headers = lines[0].split(',').map(h => h.trim().replace(/\r/g, ''))
  
  return lines.slice(1).map(line => {
    // Handle commas inside quoted fields
    const values: string[] = []
    let current = ''
    let inQuotes = false
    for (const char of line) {
      if (char === '"') inQuotes = !inQuotes
      else if (char === ',' && !inQuotes) { values.push(current.trim()); current = '' }
      else current += char
    }
    values.push(current.trim().replace(/\r/g, ''))
    
    const obj: any = {}
    headers.forEach((h, i) => obj[h] = values[i] ?? '')
    return obj
  })
}

async function main() {
  const csvPath = path.join(__dirname, '../students.csv')
  const content = fs.readFileSync(csvPath, 'utf-8')
  const rows = parseCSV(content)

  console.log(`Importando ${rows.length} alunos...`)

  let success = 0
  let errors = 0

  for (const row of rows) {
    try {
      await prisma.student.upsert({
        where: { studentId: row['StudentID'] },
        update: {
          name:             row['Name'],
          gradeLevel:       String(row['GradeLevel']),
          department:       row['Departament'],
          contact1Name:     row['Contact 1']     || null,
          contact1Email:    row['Contact1Email']  || null,
          contact1Relation: row['Contact1Relation'] || null,
          contact1Phone:    row['Contact1PhonePreferred'] || null,
          contact2Name:     row['Contact2Name']   || null,
          contact2Email:    row['Contact2Email']  || null,
          contact2Relation: row['Contact2Relation'] || null,
          contact2Phone:    row['Contact2PhonePreferred'] || null,
        },
        create: {
          studentId:        row['StudentID'],
          name:             row['Name'],
          gradeLevel:       String(row['GradeLevel']),
          department:       row['Departament'],
          contact1Name:     row['Contact 1']     || null,
          contact1Email:    row['Contact1Email']  || null,
          contact1Relation: row['Contact1Relation'] || null,
          contact1Phone:    row['Contact1PhonePreferred'] || null,
          contact2Name:     row['Contact2Name']   || null,
          contact2Email:    row['Contact2Email']  || null,
          contact2Relation: row['Contact2Relation'] || null,
          contact2Phone:    row['Contact2PhonePreferred'] || null,
        },
      })
      success++
    } catch (e: any) {
      console.error(`Erro no aluno ${row['StudentID']} - ${row['Name']}: ${e.message}`)
      errors++
    }
  }

  console.log(`✅ Importados: ${success}`)
  console.log(`❌ Erros: ${errors}`)
  await prisma.$disconnect()
}

main()
