import { v4 } from "uuid";
export enum Events {
  changeUser = "changeUser",
  login = "login",
  logout = "logout",
}
export default class Publisher {
  private constructor() {}
  static subscribers: Map<Events, { id: string; fn: (context: any) => any }[]> =
    new Map();
  static subscribeTo(event: Events, callback: (context: any) => any): string {
    const id = v4();
    Publisher.subscribers.set(
      event,
      (Publisher.subscribers.get(event) || []).concat({ id, fn: callback })
    );
    return id;
  }
  static subscribeToMany(
    events: Events[],
    callback: (context: any) => any
  ): string {
    const id = v4();
    for (const event of events) {
      Publisher.subscribers.set(
        event,
        (Publisher.subscribers.get(event) || []).concat({ id, fn: callback })
      );
    }
    return id;
  }
  static unsubscribeToMany(events: Events[], fnId: string) {
    for (const event of events) {
      Publisher.subscribers.set(
        event,
        (Publisher.subscribers.get(event) || []).filter((s) => s.id !== fnId)
      );
    }
  }
  static unsubscribeTo(event: Events, fnId: string) {
    Publisher.subscribers.set(
      event,
      (Publisher.subscribers.get(event) || []).filter((s) => s.id !== fnId)
    );
  }
  static publish(event: Events, context: any) {
    const subs = Publisher.subscribers.get(event) || [];
    for (const { fn: sub } of subs) {
      sub(context);
    }
  }
}
