'use strict';

module.exports = class Countdown {
  constructor(delay, handler, options) {
    if (!delay) throw new Error('No delay provided');

    if (typeof handler === 'object' && typeof options === 'undefined') {
      options = handler;
      handler = function() {};
    }

    this.handler = handler || function() {};

    this.options = options || {};

    if (typeof this.options.restart === 'undefined') this.options.restart = true;
    if (typeof this.options.frame === 'undefined') this.options.frame = 1000;

    this.delay = delay;
    this.countdown = delay;

    this.timeout = {};
    this.interval = {};
  }

  getRemainingTime() {
    return this.countdown;
  }

  getTimeLeft() {
    return this.delay - this.countdown;
  }

  reduceDelay() {
    this.countdown -= this.options.frame;

    if (this.countdown <= 0) this.options.restart ? this.restart() : this.stop();
  }

  start() {
    this.timeout = setTimeout(this.handler, this.countdown);
    this.interval = setInterval(this.reduceDelay.bind(this), this.options.frame);
  }

  stop() {
    clearTimeout(this.timeout);
    clearInterval(this.interval);
  }

  reset() {
    this.stop();
    this.countdown = this.delay;
  }

  restart() {
    this.reset();
    this.start();
  }
};
