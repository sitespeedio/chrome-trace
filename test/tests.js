import test from 'ava';
import { parseTracelog } from './_helpers';

test('Can find main thread in complex file', async t => {
  const parsed = await parseTracelog('www.google.ru.json');
  t.is(parsed.mainThread, '69940:775');
});

test('Can find main thread in www.sitespeed.io file', async t => {
  const parsed = await parseTracelog('www.sitespeed.io.json');
  t.is(parsed.mainThread, '64513:775');
});

// Not quite matching output from Chrome DevTools
test.failing(
  'Can categorize events per type in www.sitespeed.io file',
  async t => {
    const parsed = await parseTracelog('www.sitespeed.io.json');
    t.deepEqual(parsed.eventTypeTime[parsed.mainThread], {
      BlinkGCMarking: 0.7,
      CommitLoad: 0.1,
      EventDispatch: 0.2,
      FireAnimationFrame: 0.1,
      FunctionCall: 0.5,
      HitTest: 0.2,
      Layout: 88.9,
      MinorGC: 5.9,
      Paint: 2.8,
      ParseHTML: 4.6,
      PlatformResourceSendRequest: 0.6,
      ResourceChangePriority: 0.0,
      'ThreadState::performIdleLazySweep': 0.3,
      UpdateLayerTree: 1.6,
      UpdateLayoutTree: 17.8
    });
  }
);

// Not quite matching output from Chrome DevTools
test.failing(
  'Can categorize events per type in www.google.ru file',
  async t => {
    const parsed = await parseTracelog('www.google.ru.json');
    t.deepEqual(parsed.eventTypeTime[parsed.mainThread], {
      BlinkGCMarking: 9.6,
      CommitLoad: 0.1,
      EventDispatch: 10.1,
      EvaluateScript: 436.3,
      FireAnimationFrame: 0.1,
      FunctionCall: 91.0,
      Layout: 34.5,
      MinorGC: 8.3,
      MajorGC: 2.2,
      Paint: 11.2,
      ParseHTML: 20.3,
      PlatformResourceSendRequest: 0.6,
      ResourceChangePriority: 0.0,
      TimerFire: 7.7,
      'ThreadState::performIdleLazySweep': 0.3,
      UpdateLayerTree: 10.0,
      UpdateLayoutTree: 30.5,
      XHRLoad: 0,
      XHRReadyStateChange: 5.8,
      'v8.compile': 38.1,
      CompositeLayers: 22.7,
      'Decode Image': 0.1
    });
  }
);

// Not quite matching output from Chrome DevTools
test.failing(
  'Can categorize events per category in www.sitespeed.io file',
  async t => {
    const parsed = await parseTracelog('www.sitespeed.io.json');
    t.deepEqual(parsed.eventCategoryTime[parsed.mainThread], {
      painting: 2.8,
      loading: 4.6,
      rendering: 108.5,
      scripting: 7.7
    });
  }
);

// Not quite matching output from Chrome DevTools
test.failing(
  'Can categorize events per category in www.google.ru file',
  async t => {
    const parsed = await parseTracelog('www.google.ru.json');
    t.deepEqual(parsed.eventCategoryTime[parsed.mainThread], {
      painting: 33.9,
      loading: 21.6,
      layout: 97.646,
      scripting: 618.6
    });
  }
);

test.todo('Counts time for nested events');

test.todo('Handles X events out of order');
