import test from 'ava';
import { parseTracelog } from './_helpers';

test('Can find main thread in complex file', async t => {
  const parsed = await parseTracelog('www.google.ru.json');
  t.log(parsed);
  t.is(parsed.mainThread, '69940:775');
});

test('Can find main thread in www.sitespeed.io file', async t => {
  const parsed = await parseTracelog('www.sitespeed.io.json');
  t.log(parsed);
  t.is(parsed.mainThread, '64513:775');
});

test.todo('Counts time for nested events');

test.todo('Handles X events out of order');
