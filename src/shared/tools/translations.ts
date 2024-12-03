export class Translations {
  private source: { [key: string]: string } = {};

  load(data: { [key: string]: string }) {
    this.source = data;
  }

  get(key: string, params: { [key: string]: string }) {
    let preview = this.source[key] as string;
    for (const param of Object.keys(params)) {
      preview = preview.replace(param, params[param]);
    }
    return preview;
  }

  map(target: {
    [key: string]: {
      key: string;
      params: { [key: string]: string };
    };
  }) {
    const result: { [key: string]: string } = {};
    for (const targetKey of Object.keys(target)) {
      result[targetKey] = this.get(
        target[targetKey].key,
        target[targetKey].params
      );
    }
    return result;
  }

  getSource() {
    return this.source;
  }
}
