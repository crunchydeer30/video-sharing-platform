class BaseFilter<T extends object> {
  protected allowedFilters = {} as T;
  protected allowedIncludes = [] as string[];

  public buildFilters(query: object): {
    [key: string]: string;
  } {
    const filters: { [key: string]: string } = {};

    for (const [key, value] of Object.entries(query)) {
      if (key in this.allowedFilters) {
        const allowed_operators = this.allowedFilters[
          key as keyof T
        ] as object[];
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

  public buildIncludes(query: object) {
    const includes: { [key: string]: boolean } = {};
    if ('include' in query) {
      const includeParam = query['include'];
      if (Array.isArray(includeParam)) {
        for (const item of includeParam) {
          if (this.allowedIncludes.includes(item as string))
            includes[item] = true;
        }
      } else if (typeof includeParam === 'string') {
        if (this.allowedIncludes.includes(includeParam))
          includes[includeParam] = true;
      }
    }

    return includes;
  }
}

export default BaseFilter;
