import test from 'ava'
import createTheme from '../src/createTheme'

const config = {
  colors: {
    blue: '#07c',
    black: '#000'
  }
}

test('exports a function', t => {
  const theme = createTheme(config)
  t.is(typeof theme, 'function')
})

test('includes theme keys', t => {
  const theme = createTheme(config)
  t.deepEqual(theme.colors, {
    blue: '#07c',
    black: '#000'
  })
})

test('includes an existential getter', t => {
  const theme = createTheme(config)
  t.is(theme('colors.blue'), '#07c')
})

test('returns null for non-existing keys', t => {
  const theme = createTheme(config)
  t.is(theme('colors.gray.3'), null)
})

test('accepts a scope option', t => {
  const theme = createTheme({ scope: config }, 'scope')
  t.falsy(theme.colors)
  t.is(typeof theme.scope, 'object')
  t.is(theme.scope.colors.blue, config.colors.blue)
  t.is(theme('colors.blue'), config.colors.blue)
  t.is(theme('scope.colors.blue'), null)
})
