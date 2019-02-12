class EventProvider {
  constructor() {
    this.events = {};
    this.bindEvents = false;
  }

  on(eventName, handler) {
    if (this.bindEvents) {
      this.events[eventName] = handler.bind(this);
    } else {
      this.events[eventName] = handler;
    }
  }

  off(eventName) {
    if (eventName in this.events) {
      delete this.events[eventName];
    }
  }

  trigger(eventName, data) {
    typeof this.events[eventName] === 'function' && this.events[eventName](data);
  }
}

module.exports = EventProvider;
