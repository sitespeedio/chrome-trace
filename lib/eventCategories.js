'use strict';

/*
Sourced from
https://cs.chromium.org/chromium/src/third_party/blink/renderer/devtools/front_end/timeline_model/TimelineModel.js
https://cs.chromium.org/chromium/src/third_party/blink/renderer/devtools/front_end/timeline/TimelineUIUtils.js
 */

// Comment out events that are marked as hidden in devtools
const loadingEvents = [
  'ParseHTML',
  'ParseAuthorStyleSheet',
  'ResourceSendRequest',
  'ResourceReceiveResponse',
  'ResourceFinish',
  'ResourceReceivedData'
];
const scriptingEvents = [
  'EventDispatch',
  'TimerInstall',
  'TimerRemove',
  'TimerFire',
  'XHRReadyStateChange',
  'XHRLoad',
  'v8.compile',
  'EvaluateScript',
  'v8.compileModule',
  'v8.evaluateModule',
  'v8.parseOnBackground',
  //  'MarkLoad',
  //  'MarkDOMContent',
  'TimeStamp',
  'ConsoleTime',
  'UserTiming',
  'RunMicrotasks',
  'FunctionCall',
  'GCEvent', // For backwards compatibility only, now replaced by MinorGC/MajorGC.
  'MajorGC',
  'MinorGC',
  'JSFrame',
  'RequestAnimationFrame',
  'CancelAnimationFrame',
  'FireAnimationFrame',
  'RequestIdleCallback',
  'CancelIdleCallback',
  'FireIdleCallback',
  'WebSocketCreate',
  'WebSocketSendHandshakeRequest',
  'WebSocketReceiveHandshakeResponse',
  'WebSocketDestroy',
  'EmbedderCallback',
  'LatencyInfo',
  'ThreadState::performIdleLazySweep',
  'ThreadState::completeSweep',
  'BlinkGCMarking',
  'DoEncrypt',
  'DoEncryptReply',
  'DoDecrypt',
  'DoDecryptReply',
  'DoDigest',
  'DoDigestReply',
  'DoSign',
  'DoSignReply',
  'DoVerify',
  'DoVerifyReply'
];
const renderingEvents = [
  'Animation',
  //  'RequestMainThreadFrame',
  //  'BeginFrame',
  //  'BeginMainThreadFrame',
  //  'DrawFrame',
  'HitTest',
  //  'ScheduleStyleRecalculation',
  'RecalculateStyles',
  'UpdateLayoutTree',
  //  'InvalidateLayout',
  'Layout',
  'UpdateLayerTree',
  'ScrollLayer'
  //  'firstContentfulPaint',
  //  'firstMeaningfulPaint',
  //  'firstMeaningfulPaintCandidate'
];
const paintingEvents = [
  'PaintSetup',
  //  'PaintImage',
  //  'UpdateLayer',
  'Paint',
  'RasterTask',
  'CompositeLayers',
  //  'MarkFirstPaint',
  'Decode Image',
  'Resize Image'
];
const gpuEvents = ['GPUTask'];
const asyncEvents = ['AsyncTask'];
const otherEvents = ['Task', 'Program'];
const idleEvents = [];

function groupEvents(events, category) {
  return events.reduce((result, event) => {
    result[event] = category;
    return result;
  }, {});
}

module.exports = Object.assign(
  {},
  groupEvents(loadingEvents, 'loading'),
  groupEvents(scriptingEvents, 'scripting'),
  groupEvents(renderingEvents, 'rendering'),
  groupEvents(paintingEvents, 'painting'),
  groupEvents(gpuEvents, 'gpu'),
  groupEvents(asyncEvents, 'async'),
  groupEvents(otherEvents, 'other'),
  groupEvents(idleEvents, 'idle')
);
