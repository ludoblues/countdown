'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

const Countdown = require('../lib/countdown');

describe('Countdown', function() {
  describe('#constructor', function() {
    it('should throw an Error if no delay is provided', function(done) {
      try { new Countdown(); }
      catch (err) { 
        expect(err).to.exist; 
        done();
      }
    });

    it('should set a handler if no provided', function() {
      const countdown = new Countdown(3000);
      expect(typeof countdown.handler).to.be.equal('function');
    });

    it('should set the restart option to true if no provided', function() {
      const countdown = new Countdown(3000);
      expect(countdown.options.restart).to.be.true;
    });

    it('should set the frame option to 1000', function() {
      const countdown = new Countdown(3000);
      expect(countdown.options.frame).to.be.equal(1000);
    });
  });

  describe('#getRemainingTime', function() {
    it('should return the remaing time', function(done) {
      const countdown = new Countdown(3000);
      countdown.start();

      setTimeout( () => {
        expect(countdown.getRemainingTime()).to.be.equal(2000);
        done();
      }, 1100);
    });
  });

  describe('#getTimeLeft', function() {
    it('should return the time left', function(done) {
      const countdown = new Countdown(3000);
      countdown.start();

      setTimeout( () => {
        expect(countdown.getTimeLeft()).to.be.equal(1000);
        done();
      }, 1100);
    });
  });

  describe('#reduceDelay', function() {
    it('should decrease the countdown about the frame value', function() {
      const countdown = new Countdown(3000);
      countdown.reduceDelay();
      expect(countdown.countdown).to.be.equal(2000);
    });

    context('The countdown is over', function() {
      context('The restart options is activated', function() {
        beforeEach('activate the restart option', function() {
          this.countdown = new Countdown(1);
          this.countdown.countdown = 0;
        });

        beforeEach('mute & spy Countdown#restart', function() {
          sinon.stub(this.countdown, 'restart', function() {});
        });

        beforeEach('mute & spy Countdown#stop', function() {
          sinon.stub(this.countdown, 'stop', function() {});
        });

        it('should call Countdown#restart', function() {
          expect(this.countdown.restart.callCount).to.be.equal(0);
          this.countdown.reduceDelay()
          expect(this.countdown.restart.callCount).to.be.equal(1);
        });

        it('should not call Countdown#stop', function() {
          expect(this.countdown.stop.callCount).to.be.equal(0);
          this.countdown.reduceDelay()
          expect(this.countdown.stop.callCount).to.be.equal(0);
        });
      });

      context('The restart options is not activated', function() {
        beforeEach('activate the restart option', function() {
          this.countdown = new Countdown(1, { restart: false });
          this.countdown.countdown = 0;
        });

        beforeEach('mute & spy Countdown#restart', function() {
          sinon.stub(this.countdown, 'restart', function() {});
        });

        beforeEach('mute & spy Countdown#stop', function() {
          sinon.stub(this.countdown, 'stop', function() {});
        });

        it('should not call Countdown#restart', function() {
          expect(this.countdown.restart.callCount).to.be.equal(0);
          this.countdown.reduceDelay()
          expect(this.countdown.restart.callCount).to.be.equal(0);
        });

        it('should call Countdown#stop', function() {
          expect(this.countdown.stop.callCount).to.be.equal(0);
          this.countdown.reduceDelay()
          expect(this.countdown.stop.callCount).to.be.equal(1);
        });
      });
    });
  });

  describe('#start', function() {
    it('should start the setTimeout', function(done) {
      var self = this;
      this.countdown = new Countdown(1500, function() {
        done();
        self.countdown.stop();
      });

      this.countdown.start();
    });

    it('should start the setInterval', function(done) {
      this.countdown = new Countdown(1500);

      var self = this;
      this.countdown.reduceDelay = function() { 
        done(); 
        self.countdown.stop();
      };

      this.countdown.start();
    });
  });

  describe('#stop', function() {
    it('should clean the setTimeout', function(done) {
      this.countdown = new Countdown(1500, function() {
        done(new Error('should not comes here'));
      });

      this.countdown.start();
      this.countdown.stop();

      setTimeout( () => { done(); }, 1800);
    });

    it('should clean the setInterval', function(done) {
      this.countdown = new Countdown(1500);

      this.countdown.reduceDelay = function() { 
        done(new Error('should not comes here'));
      };

      this.countdown.start();
      this.countdown.stop();

      setTimeout( () => { done(); }, 1100);
    });
  });

  describe('#reset', function() {
    beforeEach('create a Countdown', function() {
      this.countdown = new Countdown(1500);
    });

    beforeEach('mute & spy Countdown#stop', function() {
      sinon.stub(this.countdown, 'stop', function() {});
    });

    it('should call Countdown#stop', function() {
      expect(this.countdown.stop.callCount).to.be.equal(0);
      this.countdown.reset();
      expect(this.countdown.stop.callCount).to.be.equal(1);
    });

    it('should restore the countdown', function() {
      this.countdown.countdown = 5000;
      this.countdown.reset();
      expect(this.countdown.countdown).to.be.equal(1500);
    });
  });

  describe('#restart', function() {
    beforeEach('create a Countdown', function() {
      this.countdown = new Countdown(1500);
    });

     beforeEach('mute & spy Countdown#reset', function() {
      sinon.stub(this.countdown, 'reset', function() {});
    });

      beforeEach('mute & spy Countdown#start', function() {
      sinon.stub(this.countdown, 'start', function() {});
    });

    it('should call Countdown#reset', function() {
      expect(this.countdown.reset.callCount).to.be.equal(0);
      this.countdown.restart();
      expect(this.countdown.reset.callCount).to.be.equal(1);
    });

    it('should call Countdown#start', function() {
      expect(this.countdown.start.callCount).to.be.equal(0);
      this.countdown.restart();
      expect(this.countdown.start.callCount).to.be.equal(1);
    });
  });
});