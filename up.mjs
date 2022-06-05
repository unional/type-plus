import { readFileSync } from 'node:fs'
import find from 'find'

const [, , src] = process.argv

find.file(/\.ts/, src, files => files.map(updateImport))

function updateImport(file) {
  const content = readFileSync(file, 'utf-8')
  const match = /^import.*'(\..*)'$/gm.exec(content)
  if (match) {
    if ()
    console.log(match[1])
  }
}

