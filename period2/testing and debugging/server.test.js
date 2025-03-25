const sumar = require('./suma'); // 

test('Debe sumar 1 + 2 y dar 3', () => {
  expect(sumar(1, 2)).toBe(3);
});

test('Debe sumar 0 + 0 y dar 0', () => {
  expect(sumar(0, 0)).toBe(0);
});

test('Debe sumar -1 + -1 y dar -2', () => {
  expect(sumar(-1, -1)).toBe(-2);
});

test('Debe sumar 1.5 + 2.5 y dar 4', () => {
  expect(sumar(1.5, 2.5)).toBe(4);
});

test('Debe sumar 2 + 2 y dar 4', () => {
  expect(sumar(2, 2)).toBe(4);
});

