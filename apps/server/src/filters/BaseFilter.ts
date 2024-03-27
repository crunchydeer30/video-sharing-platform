class BaseFilter<T extends object> {
  protected filterParams = {} as T;

  public buildFilters(query: object): {
    [key: string]: string;
  } {
    const filters: { [key: string]: string } = {};

    for (const [key, value] of Object.entries(query)) {
      if (key in this.filterParams) {
        const allowed_operators = this.filterParams[key as keyof T] as object[];
        const operator = Object.keys(value as object)[0];
        if (
          operator &&
          allowed_operators &&
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
          allowed_operators.includes(operator as any)
        ) {
          filters[key] = value as string;
        }
      }
    }

    return filters;
  }
}

export default BaseFilter;
