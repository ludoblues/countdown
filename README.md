[![Circle CI](https://circleci.com/gh/ludoblues/countdown.svg?style=svg)](https://circleci.com/gh/ludoblues/countdown)

[![Coverage Status](https://coveralls.io/repos/ludoblues/countdown/badge.svg?branch=master&service=github)](https://coveralls.io/github/ludoblues/countdown?branch=master)

# countdown

## Introduction

Countdownjs is able to fire an event after a defined delay.
Its main goal is being able to tell you at anytime, how many time you still need to wait for your event to be fired.

In a perfect JS world, this library shouldn't exist.
It has been developed since we can't trust the private properties ``_idleStart`` and ``_idleTimeout`` returned by setTimeout anymore (in node v3 anyway)

## Usage

### Countdown#constructor(delay, handler, options)
- ``delay``: time is ms to wait before calling the handler (required)
- ``handler``: function to execute when the delay is elapsed (default to empty function)
- ``options`` 
  - ``restart``: boolean, set to true if you want your countdown to restat automatically when the delay is elapsed (default to false). 
  - ``frame``: Time in ms, specify how many time you want to wait to refresh the countdown, more this value will be low, more the countdown will be accurate (default to 1000).

### Countdown#start()
Start the timer.

### Countdown#stop()
Stop the timer.

### Countdown#reset()
Stop the timer and reset the countdown to its initial value.

### Countdown#restart()
Reset then start again.

### Countdown#getRemainingTime()
Return the remaining time in ms.

### Countdown#getTimeLeft()
Return the time left in ms.

### Countdown#restart()
Reset then start again.

## Examples

### How to know how many time i need to wait after an async task
 ```` js
const Countdown = require('contdownjs');

const countdown = new Countdown(5000, function() { console.log('Hello World'); });

countdown.start(); // It will print "Hello World" after 5s

// Some async task that take we do not know exactly how many time ...

countdown.getRemainingTime(); // 3000 for exemple
````

## Tests

````
npm install
npm test​
````
