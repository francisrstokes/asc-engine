export class EventProvider<E> {
  events: { [type in keyof E]?: (data: E[type]) => void } = {};
  private bindEvents = false;

  constructor(bindEvents = true) {
    this.bindEvents = bindEvents;
  }

  on<K extends keyof E>(type: K, cb: (data: E[K]) => void) {
    if (this.bindEvents) {
      this.events[type] = cb.bind(this);
    } else {
      this.events[type] = cb;
    }
  }

  off<K extends keyof E>(type: K) {
    delete this.events[type];
  }

  trigger<K extends keyof E>(type: K, data: E[K]) {
    this.events[type]?.(data);
  }
}
