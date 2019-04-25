# CHANGELOG - Chrome-trace

## 0.2.2
### Fixed
* Since Chrome 72 (or 73?) we sometimes get miss-matched thread ids, hopefully [#8](https://github.com/sitespeedio/chrome-trace/pull/8) fixes that.
* Categorise RunTask (from Chrome 74) as Other.

## 0.2.1
### Fixed
* Catch if we can't find the first thread event. We now throws an exception (that's not optimal since we don't know what's wrong) with the info of what's wrong. We can change that later on.

## 0.2.0
### Added
* Three decimals instead of one [#7](https://github.com/sitespeedio/chrome-trace/pull/7).

## 0.1.1
### Fixed
* Added BlinkGC.AtomicPhase new in Chrome 70 [#5](https://github.com/sitespeedio/chrome-trace/pull/5).

## 0.1.0
### Fixed
* Improve categorization of events to more closely match Chrome DevTools.

## 0.0.2
### Fixed
* Capitalize event category names.

## 0.0.1
### Added
* Hello world!
