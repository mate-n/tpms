export class CloneHelper {
  clone<T>(source: T): T {
    return JSON.parse(JSON.stringify(source));
  }
}
