class PubSub {
  constructor() {
    this.topics = {};
    this._nextId = 0;
  }

  nextId() {
    return this._nextId++;
  }

  subscribe(topic, handler) {
    if (!(topic in this.topics)) {
      this.topics[topic] = {};
    }

    const fixedId = this.nextId();
    this.topics[topic][fixedId] = handler;

    return () => {
      delete this.topics[topic][fixedId];
    }
  }

  publish(topic, data) {
    if (topic in this.topics) {
      Object.values(this.topics[topic]).forEach(fn => fn(data));
    }
  }
}

module.exports = PubSub;
