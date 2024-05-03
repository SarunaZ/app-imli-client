/**
 * Credit goes to https://github.com/phryneas/ts-deep-extract-types/tree/master
 * Extract type for deeply nested types
 */
type NonNullSkipArray<T> = NonNullable<T> extends infer T1
  ? T1 extends unknown[]
    ? NonNullable<T1[number]>
    : T1
  : never;

type Tail<Path extends any[]> = ((...args: Path) => any) extends (
  _: any,
  ..._1: infer Rest
) => any
  ? Rest
  : never;

type Id<T> = { [K in keyof T]: T[K] } & {};

declare const error: unique symbol;
declare const path: unique symbol;
declare const object: unique symbol;

/**
 * interface describing a non-existing key passed as a Path argument to DeepExtractTypeSkipArrays or DeepExtractType
 */
export interface KeyNotFoundTypeError<O, K> {
  [error]: "key not found";
  [path]: K;
  [object]: O;
}

type ___PickSkipArrays<T, Path extends [...string[]]> = Path extends [
  keyof T,
  ...any[],
]
  ? {
      [Head in Path[0]]: ___PickSkipArrays<
        NonNullSkipArray<T[Path[0]]>,
        Tail<Path>
      >;
    }[Path[0]]
  : Path extends [any, ...any[]]
  ? KeyNotFoundTypeError<T, Path[0]>
  : T;

export type DeepExtractTypeSkipArrays<Source, Path extends [...string[]]> = Id<
  NonNullSkipArray<___PickSkipArrays<NonNullable<Source>, Path>>
>;

type ___Pick<T, Path extends [...(string | number)[]]> = Path extends [
  keyof T,
  ...any[],
]
  ? {
      [Head in Path[0]]: ___Pick<NonNullable<T[Path[0]]>, Tail<Path>>;
    }[Path[0]]
  : Path extends [any, ...any[]]
  ? KeyNotFoundTypeError<T, Path[0]>
  : T;

export type DeepExtractType<Source, Path extends [...(string | number)[]]> = Id<
  NonNullable<___Pick<NonNullable<Source>, Path>>
>;
