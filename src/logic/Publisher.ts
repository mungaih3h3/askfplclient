import { v4 } from "uuid";

export default class Publisher {
  private constructor() {}
  static subscribers: Map<string, { id: string; fn: (context: any) => any }[]> =
    new Map();
  static subscribeTo(event: string, callback: (context: any) => any): string {
    const id = v4();
    Publisher.subscribers.set(
      event,
      (Publisher.subscribers.get(event) || []).concat({ id, fn: callback })
    );
    return id;
  }
  static unsubscribeTo(event: string, fnId: string) {
    Publisher.subscribers.set(
      event,
      (Publisher.subscribers.get(event) || []).filter((s) => s.id !== fnId)
    );
  }
  static publish(event: string, context: any) {
    const subs = Publisher.subscribers.get(event) || [];
    for (const { fn: sub } of subs) {
      sub(context);
    }
  }
}
