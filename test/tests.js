import test from 'ava';
import { parseTracelog, roughlyEquals } from './_helpers';

test('Can find main thread in complex file', async t => {
  const parsed = await parseTracelog('www.google.ru.json');
  t.is(parsed.mainThread, '69940:775');
});

test('Can find main thread in www.sitespeed.io file', async t => {
  const parsed = await parseTracelog('www.sitespeed.io.json');
  t.is(parsed.mainThread, '64513:775');
});

test('Can categorize events per type in www.sitespeed.io file', async t => {
  const parsed = await parseTracelog('www.sitespeed.io.json');
  const events = parsed.eventTypeTime[parsed.mainThread];
  const expected = {
    BlinkGCMarking: 0.728,
    EventDispatch: 0.197,
    FireAnimationFrame: 0.109,
    FunctionCall: 0.458,
    HitTest: 0.182,
    Layout: 88.916,
    MinorGC: 5.935,
    Paint: 2.831,
    ParseHTML: 4.609,
    ResourceChangePriority: 0.02,
    'ThreadState::performIdleLazySweep': 0.308,
    UpdateLayerTree: 1.625,
    UpdateLayoutTree: 17.786
  };

  // Within 1% of what Chrome DevTools reports
  t.deepEqual(Object.keys(events).sort(), Object.keys(expected).sort());

  t.true(roughlyEquals(events, expected, 1));
});

// Not quite matching output from Chrome DevTools
test('Can categorize events per type in www.google.ru file', async t => {
  const parsed = await parseTracelog('www.google.ru.json');
  const events = parsed.eventTypeTime[parsed.mainThread];
  const expected = {
    BlinkGCMarking: 9.574,
    CompositeLayers: 22.711,
    'Decode Image': 0.062,
    EventDispatch: 10.141,
    EvaluateScript: 436.279,
    FireAnimationFrame: 0.078,
    FunctionCall: 91.007,
    Layout: 34.426,
    MinorGC: 13.985,
    MajorGC: 2.236,
    Paint: 11.153,
    ParseHTML: 21.602,
    ResourceChangePriority: 0.034,
    'ScriptWrappableVisitor::performLazyCleanup': 0.072,
    TimerFire: 7.74,
    'ThreadState::performIdleLazySweep': 3.636,
    UpdateLayerTree: 9.999,
    UpdateLayoutTree: 30.542,
    XHRLoad: 0.006,
    XHRReadyStateChange: 5.8,
    'v8.compile': 38.074
  };
  // Within 1% of what Chrome DevTools reports
  t.deepEqual(Object.keys(events).sort(), Object.keys(expected).sort());
  t.true(
    roughlyEquals(
      events,
      expected,
      1
    )
  );
});

test('Can categorize events per category in www.sitespeed.io file', async t => {
  const parsed = await parseTracelog('www.sitespeed.io.json');
  const categories = parsed.eventCategoryTime[parsed.mainThread];
  // Within 1% of what Chrome DevTools reports
  t.true(
    roughlyEquals(
      categories,
      {
        Loading: 4.629,
        Painting: 2.831,
        Rendering: 108.509,
        Scripting: 7.735
      },
      1
    )
  );
});

test('Can categorize events per category in www.google.ru file', async t => {
  const parsed = await parseTracelog('www.google.ru.json');
  const categories = parsed.eventCategoryTime[parsed.mainThread];
  // Within 1% of what Chrome DevTools reports
  t.true(
    roughlyEquals(
      categories,
      {
        Rendering: 74.967,
        Loading: 21.636,
        Painting: 33.926,
        Scripting: 618.628
      },
      1
    )
  );
});

test.todo('Counts time for nested events');

test.todo('Handles X events out of order');
