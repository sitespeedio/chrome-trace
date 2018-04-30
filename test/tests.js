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
    BlinkGCMarking: 0.7,
    EventDispatch: 0.2,
    FireAnimationFrame: 0.1,
    FunctionCall: 0.5,
    HitTest: 0.2,
    Layout: 88.9,
    MinorGC: 5.9,
    Paint: 2.8,
    ParseHTML: 4.6,
    'ThreadState::performIdleLazySweep': 0.3,
    UpdateLayerTree: 1.6,
    UpdateLayoutTree: 17.8
  };
  // Within 5% of what Chrome DevTools reports
  t.deepEqual(Object.keys(events).sort(), Object.keys(expected).sort());
  t.true(roughlyEquals(events, expected, 5));
});

// Not quite matching output from Chrome DevTools
test('Can categorize events per type in www.google.ru file', async t => {
  const parsed = await parseTracelog('www.google.ru.json');
  const events = parsed.eventTypeTime[parsed.mainThread];
  const expected = {
    BlinkGCMarking: 9.6,
    CompositeLayers: 22.7,
    'Decode Image': 0.1,
    EventDispatch: 10.1,
    EvaluateScript: 436.3,
    FireAnimationFrame: 0.1,
    FunctionCall: 91.0,
    Layout: 34.5,
    MinorGC: 14.0,
    MajorGC: 2.2,
    Paint: 11.2,
    ParseHTML: 20.3,
    'ScriptWrappableVisitor::performLazyCleanup': 0.1,
    TimerFire: 7.7,
    'ThreadState::performIdleLazySweep': 3.6,
    UpdateLayerTree: 10.0,
    UpdateLayoutTree: 30.5,
    XHRReadyStateChange: 5.8,
    'v8.compile': 38.1
  };
  // Within 7% of what Chrome DevTools reports
  t.deepEqual(Object.keys(events).sort(), Object.keys(expected).sort());
  t.true(
    roughlyEquals(
      events,
      expected,
      7
    )
  );
});

test('Can categorize events per category in www.sitespeed.io file', async t => {
  const parsed = await parseTracelog('www.sitespeed.io.json');
  const categories = parsed.eventCategoryTime[parsed.mainThread];
  // Within 5% of what Chrome DevTools reports
  t.true(
    roughlyEquals(
      categories,
      {
        Loading: 4.6,
        Painting: 2.8,
        Rendering: 108.5,
        Scripting: 7.7
      },
      5
    )
  );
});

test('Can categorize events per category in www.google.ru file', async t => {
  const parsed = await parseTracelog('www.google.ru.json');
  const categories = parsed.eventCategoryTime[parsed.mainThread];
  // Within 5% of what Chrome DevTools reports
  t.true(
    roughlyEquals(
      categories,
      {
        Rendering: 75.0,
        Loading: 21.6,
        Painting: 33.9,
        Scripting: 618.6
      },
      5
    )
  );
});

test.failing('Can filter events before firstPaint', async t => {
  const parsed = await parseTracelog('www.google.ru.json');
  const categories = parsed['eventCategoryTime|firstPaint'][parsed.mainThread];
  // Within 5% of what Chrome DevTools reports
  t.true(
    roughlyEquals(
      categories,
      {
        Loading: 9.2,
        Painting: 0.3,
        Rendering: 27.1,
        Scripting: 40.8
      },
      5
    )
  );
});

test.todo('Counts time for nested events');

test.todo('Handles X events out of order');
