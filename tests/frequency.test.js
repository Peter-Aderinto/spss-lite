import test from 'node:test'
import assert from 'node:assert/strict'
import { frequencyFor, categoricalFields } from '../src/components/frequencyUtils.js'

test('frequency percentages distinguish all responses from valid responses', () => {
  const result = frequencyFor([{ answer: 'Yes' }, { answer: 'Yes' }, { answer: 'No' }, { answer: '' }], 'answer')
  const yes = result.find(r => r.response === 'Yes')
  const missing = result.find(r => r.response === 'Missing')
  assert.equal(yes.frequency, 2)
  assert.equal(yes.percent, 50)
  assert.ok(Math.abs(yes.validPercent - 200 / 3) < 1e-10)
  assert.equal(missing.percent, 25)
  assert.equal(missing.validPercent, null)
  assert.equal(missing.cumulative, null)
  assert.ok(Math.abs(result.find(r => r.response === 'No').cumulative - 100) < 1e-10)
})

test('zero and false are valid responses; null and undefined are missing', () => {
  const result = frequencyFor([{ a: 0 }, { a: false }, { a: null }, {}], 'a')
  assert.equal(result.find(r => r.response === '0').frequency, 1)
  assert.equal(result.find(r => r.response === 'false').frequency, 1)
  assert.equal(result.find(r => r.response === 'Missing').frequency, 2)
})

test('empty and entirely missing datasets do not produce invalid percentages', () => {
  assert.deepEqual(frequencyFor([], 'a'), [])
  assert.deepEqual(frequencyFor([{ a: null }], 'a'), [{ response: 'Missing', frequency: 1, percent: 100, validPercent: null, cumulative: null }])
})

test('high-cardinality numeric columns are excluded from categorical analysis', () => {
  const rows = Array.from({ length: 30 }, (_, index) => ({ id: index, group: index % 2 ? 'A' : 'B' }))
  assert.deepEqual(categoricalFields({ fields: ['id', 'group'] }, rows), ['group'])
})
