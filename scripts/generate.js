const fs = require('fs')

const R = require('ramda')

const needsLiftRec = new Map(
  Object.entries({
    F: {needs: 0, arity: 0},
    T: {needs: 0, arity: 0},
    __: {needs: 0, arity: null},
    add: {needs: 0, arity: 2},
    addIndex: {needs: 1, arity: 1},
    adjust: {needs: 0, arity: 3},
    all: {needs: 0, arity: 2},
    allPass: {needs: 1, arity: 1},
    always: {needs: 1, arity: 1},
    and: {needs: 0, arity: 2},
    any: {needs: 0, arity: 2},
    anyPass: {needs: 1, arity: 1},
    ap: {needs: 0, arity: 2},
    aperture: {needs: 0, arity: 2},
    append: {needs: 0, arity: 2},
    apply: {needs: 0, arity: 2},
    applySpec: {needs: 1, arity: 1},
    applyTo: {needs: 0, arity: 2},
    ascend: {needs: 0, arity: 3},
    assoc: {needs: 0, arity: 3},
    assocPath: {needs: 0, arity: 3},
    binary: {needs: 1, arity: 1},
    bind: {needs: 1, arity: 2},
    both: {needs: 1, arity: 2},
    call: {needs: 1, arity: 1},
    chain: {needs: 1, arity: 2},
    clamp: {needs: 0, arity: 3},
    clone: {needs: 0, arity: 1},
    comparator: {needs: 1, arity: 1},
    complement: {needs: 1, arity: 1},
    compose: {needs: 1, arity: 0},
    composeK: {needs: 1, arity: 0},
    composeP: {needs: 1, arity: 0},
    concat: {needs: 0, arity: 2},
    cond: {needs: 1, arity: 1},
    construct: {needs: 1, arity: 1},
    constructN: {needs: 1, arity: 2},
    contains: {needs: 0, arity: 2},
    converge: {needs: 1, arity: 2},
    countBy: {needs: 0, arity: 2},
    curry: {needs: 1, arity: 1},
    curryN: {needs: 1, arity: 2},
    dec: {needs: 0, arity: 1},
    defaultTo: {needs: 0, arity: 2},
    descend: {needs: 0, arity: 3},
    difference: {needs: 0, arity: 2},
    differenceWith: {needs: 0, arity: 3},
    dissoc: {needs: 0, arity: 2},
    dissocPath: {needs: 0, arity: 2},
    divide: {needs: 0, arity: 2},
    drop: {needs: 0, arity: 2},
    dropLast: {needs: 0, arity: 2},
    dropLastWhile: {needs: 0, arity: 2},
    dropRepeats: {needs: 0, arity: 1},
    dropRepeatsWith: {needs: 0, arity: 2},
    dropWhile: {needs: 0, arity: 2},
    either: {needs: 1, arity: 2},
    empty: {needs: 0, arity: 1},
    endsWith: {needs: 0, arity: 2},
    eqBy: {needs: 0, arity: 3},
    eqProps: {needs: 0, arity: 3},
    equals: {needs: 0, arity: 2},
    evolve: {needs: 0, arity: 2},
    filter: {needs: 0, arity: 2},
    find: {needs: 0, arity: 2},
    findIndex: {needs: 0, arity: 2},
    findLast: {needs: 0, arity: 2},
    findLastIndex: {needs: 0, arity: 2},
    flatten: {needs: 0, arity: 1},
    flip: {needs: 1, arity: 1},
    forEach: {needs: 0, arity: 2},
    forEachObjIndexed: {needs: 0, arity: 2},
    fromPairs: {needs: 0, arity: 1},
    groupBy: {needs: 0, arity: 2},
    groupWith: {needs: 0, arity: 2},
    gt: {needs: 0, arity: 2},
    gte: {needs: 0, arity: 2},
    has: {needs: 0, arity: 2},
    hasIn: {needs: 0, arity: 2},
    head: {needs: 0, arity: 1},
    identical: {needs: 0, arity: 2},
    identity: {needs: 0, arity: 1},
    ifElse: {needs: 1, arity: 3},
    inc: {needs: 0, arity: 1},
    indexBy: {needs: 0, arity: 2},
    indexOf: {needs: 0, arity: 2},
    init: {needs: 0, arity: 1},
    innerJoin: {needs: 0, arity: 3},
    insert: {needs: 0, arity: 3},
    insertAll: {needs: 0, arity: 3},
    intersection: {needs: 0, arity: 2},
    intersperse: {needs: 0, arity: 2},
    into: {needs: 0, arity: 3},
    invert: {needs: 0, arity: 1},
    invertObj: {needs: 0, arity: 1},
    invoker: {needs: 1, arity: 2},
    is: {needs: 0, arity: 2},
    isEmpty: {needs: 0, arity: 1},
    isNil: {needs: 0, arity: 1},
    join: {needs: 0, arity: 2},
    juxt: {needs: 1, arity: 1},
    keys: {needs: 0, arity: 1},
    keysIn: {needs: 0, arity: 1},
    last: {needs: 0, arity: 1},
    lastIndexOf: {needs: 0, arity: 2},
    length: {needs: 0, arity: 1},
    lens: {needs: 0, arity: 2},
    lensIndex: {needs: 0, arity: 1},
    lensPath: {needs: 0, arity: 1},
    lensProp: {needs: 0, arity: 1},
    lift: {needs: 1, arity: 1},
    liftN: {needs: 1, arity: 2},
    lt: {needs: 0, arity: 2},
    lte: {needs: 0, arity: 2},
    map: {needs: 0, arity: 2},
    mapAccum: {needs: 0, arity: 3},
    mapAccumRight: {needs: 0, arity: 3},
    mapObjIndexed: {needs: 0, arity: 2},
    match: {needs: 0, arity: 2},
    mathMod: {needs: 0, arity: 2},
    max: {needs: 0, arity: 2},
    maxBy: {needs: 0, arity: 3},
    mean: {needs: 0, arity: 1},
    median: {needs: 0, arity: 1},
    memoize: {needs: 1, arity: 1},
    memoizeWith: {needs: 1, arity: 2},
    merge: {needs: 1, arity: 2},
    mergeAll: {needs: 0, arity: 1},
    mergeDeepLeft: {needs: 0, arity: 2},
    mergeDeepRight: {needs: 0, arity: 2},
    mergeDeepWith: {needs: 0, arity: 3},
    mergeDeepWithKey: {needs: 0, arity: 3},
    mergeWith: {needs: 0, arity: 3},
    mergeWithKey: {needs: 0, arity: 3},
    min: {needs: 0, arity: 2},
    minBy: {needs: 0, arity: 3},
    modulo: {needs: 0, arity: 2},
    multiply: {needs: 0, arity: 2},
    nAry: {needs: 1, arity: 2},
    negate: {needs: 0, arity: 1},
    none: {needs: 0, arity: 2},
    not: {needs: 0, arity: 1},
    nth: {needs: 0, arity: 2},
    nthArg: {needs: 1, arity: 1},
    o: {needs: 1, arity: 3},
    objOf: {needs: 0, arity: 2},
    of: {needs: 0, arity: 1},
    omit: {needs: 0, arity: 2},
    once: {needs: 1, arity: 1},
    or: {needs: 0, arity: 2},
    over: {needs: 0, arity: 3},
    pair: {needs: 0, arity: 2},
    partial: {needs: 1, arity: 2},
    partialRight: {needs: 1, arity: 2},
    partition: {needs: 0, arity: 2},
    path: {needs: 0, arity: 2},
    pathEq: {needs: 0, arity: 3},
    pathOr: {needs: 0, arity: 3},
    pathSatisfies: {needs: 0, arity: 3},
    pick: {needs: 0, arity: 2},
    pickAll: {needs: 0, arity: 2},
    pickBy: {needs: 0, arity: 2},
    pipe: {needs: 1, arity: 0},
    pipeK: {needs: 1, arity: 0},
    pipeP: {needs: 1, arity: 0},
    pluck: {needs: 0, arity: 2},
    prepend: {needs: 0, arity: 2},
    product: {needs: 0, arity: 1},
    project: {needs: 0, arity: 2},
    prop: {needs: 0, arity: 2},
    propEq: {needs: 0, arity: 3},
    propIs: {needs: 0, arity: 3},
    propOr: {needs: 0, arity: 3},
    propSatisfies: {needs: 0, arity: 3},
    props: {needs: 0, arity: 2},
    range: {needs: 0, arity: 2},
    reduce: {needs: 0, arity: 3},
    reduceBy: {needs: 1, arity: 0},
    reduceRight: {needs: 0, arity: 3},
    reduceWhile: {needs: 1, arity: 0},
    reduced: {needs: 0, arity: 1},
    reject: {needs: 0, arity: 2},
    remove: {needs: 0, arity: 3},
    repeat: {needs: 0, arity: 2},
    replace: {needs: 0, arity: 3},
    reverse: {needs: 0, arity: 1},
    scan: {needs: 0, arity: 3},
    sequence: {needs: 0, arity: 2},
    set: {needs: 0, arity: 3},
    slice: {needs: 0, arity: 3},
    sort: {needs: 0, arity: 2},
    sortBy: {needs: 0, arity: 2},
    sortWith: {needs: 0, arity: 2},
    split: {needs: 0, arity: 2},
    splitAt: {needs: 0, arity: 2},
    splitEvery: {needs: 0, arity: 2},
    splitWhen: {needs: 0, arity: 2},
    startsWith: {needs: 0, arity: 2},
    subtract: {needs: 0, arity: 2},
    sum: {needs: 0, arity: 1},
    symmetricDifference: {needs: 0, arity: 2},
    symmetricDifferenceWith: {needs: 0, arity: 3},
    tail: {needs: 0, arity: 1},
    take: {needs: 0, arity: 2},
    takeLast: {needs: 0, arity: 2},
    takeLastWhile: {needs: 0, arity: 2},
    takeWhile: {needs: 0, arity: 2},
    tap: {needs: 0, arity: 2},
    test: {needs: 0, arity: 2},
    times: {needs: 0, arity: 2},
    toLower: {needs: 0, arity: 1},
    toPairs: {needs: 0, arity: 1},
    toPairsIn: {needs: 0, arity: 1},
    toString: {needs: 0, arity: 1},
    toUpper: {needs: 0, arity: 1},
    transduce: {needs: 0, arity: 4},
    transpose: {needs: 0, arity: 1},
    traverse: {needs: 0, arity: 3},
    trim: {needs: 0, arity: 1},
    tryCatch: {needs: 1, arity: 2},
    type: {needs: 0, arity: 1},
    unapply: {needs: 1, arity: 1},
    unary: {needs: 1, arity: 1},
    uncurryN: {needs: 1, arity: 2},
    unfold: {needs: 0, arity: 2},
    union: {needs: 0, arity: 2},
    unionWith: {needs: 0, arity: 3},
    uniq: {needs: 0, arity: 1},
    uniqBy: {needs: 0, arity: 2},
    uniqWith: {needs: 0, arity: 2},
    unless: {needs: 0, arity: 3},
    unnest: {needs: 0, arity: 1},
    until: {needs: 0, arity: 3},
    update: {needs: 0, arity: 3},
    useWith: {needs: 1, arity: 2},
    values: {needs: 0, arity: 1},
    valuesIn: {needs: 0, arity: 1},
    view: {needs: 0, arity: 2},
    when: {needs: 0, arity: 3},
    where: {needs: 0, arity: 2},
    whereEq: {needs: 0, arity: 2},
    without: {needs: 0, arity: 2},
    xprod: {needs: 0, arity: 2},
    zip: {needs: 0, arity: 2},
    zipObj: {needs: 0, arity: 2},
    zipWith: {needs: 0, arity: 3}
  })
)

fs.writeFileSync(
  'src/kefir.ramda.js',
  `// THIS FILE IS GENERATED

import * as R from 'ramda'
import * as K from 'karet.lift'

${Object.entries(R)
    .sort()
    .map(([name, value]) => {
      const rec = needsLiftRec.get(name)

      if (!needsLiftRec.delete(name))
        throw Error(`Lifting of '${name}' must be specified explicitly.`)

      if (typeof value !== 'function') return `export {${name}} from 'ramda'`

      if (value.length !== rec.arity)
        throw Error(
          `Arity mismatch '${name}': ${rec.arity} !== ${value.length}`
        )

      return `export const ${name} = K.lift${rec.needs ? 'Rec' : ''}(R.${name})`
    })
    .join('\n')}
`
)

if (needsLiftRec.size)
  throw Error(
    `These names do not exist in Ramda: ${Array.from(needsLiftRec.keys())}`
  )
