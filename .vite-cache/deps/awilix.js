import "./chunk-PR4QN5HX.js";

// node_modules/awilix/lib/awilix.browser.mjs
var EOL = "\n";
var ExtendableError = class extends Error {
  /**
   * Constructor for the error.
   *
   * @param  {String} message
   * The error message.
   */
  constructor(message) {
    super(message);
    Object.defineProperty(this, "message", {
      enumerable: false,
      value: message
    });
    Object.defineProperty(this, "name", {
      enumerable: false,
      value: this.constructor.name
    });
    if ("captureStackTrace" in Error) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      Object.defineProperty(this, "stack", {
        enumerable: false,
        value: Error(message).stack,
        writable: true,
        configurable: true
      });
    }
  }
};
var AwilixError = class extends ExtendableError {
};
var AwilixTypeError = class _AwilixTypeError extends AwilixError {
  /**
   * Constructor, takes the function name, expected and given
   * type to produce an error.
   *
   * @param {string} funcDescription
   * Name of the function being guarded.
   *
   * @param {string} paramName
   * The parameter there was an issue with.
   *
   * @param {string} expectedType
   * Name of the expected type.
   *
   * @param {string} givenType
   * Name of the given type.
   */
  constructor(funcDescription, paramName, expectedType, givenType) {
    super(`${funcDescription}: expected ${paramName} to be ${expectedType}, but got ${givenType}.`);
  }
  /**
   * Asserts the given condition, throws an error otherwise.
   *
   * @param {*} condition
   * The condition to check
   *
   * @param {string} funcDescription
   * Name of the function being guarded.
   *
   * @param {string} paramName
   * The parameter there was an issue with.
   *
   * @param {string} expectedType
   * Name of the expected type.
   *
   * @param {string} givenType
   * Name of the given type.
   */
  static assert(condition, funcDescription, paramName, expectedType, givenType) {
    if (!condition) {
      throw new _AwilixTypeError(funcDescription, paramName, expectedType, givenType);
    }
    return condition;
  }
};
var AwilixResolutionError = class extends AwilixError {
  /**
   * Constructor, takes the registered modules and unresolved tokens
   * to create a message.
   *
   * @param {string|symbol} name
   * The name of the module that could not be resolved.
   *
   * @param  {string[]} resolutionStack
   * The current resolution stack
   */
  constructor(name, resolutionStack, message) {
    const stringName = name.toString();
    const nameStack = resolutionStack.map(({ name: val }) => val.toString());
    nameStack.push(stringName);
    const resolutionPathString = nameStack.join(" -> ");
    let msg = `Could not resolve '${stringName}'.`;
    if (message) {
      msg += ` ${message}`;
    }
    msg += EOL + EOL;
    msg += `Resolution path: ${resolutionPathString}`;
    super(msg);
  }
};
var AwilixRegistrationError = class extends AwilixError {
  /**
   * Constructor, takes the registered modules and unresolved tokens
   * to create a message.
   *
   * @param {string|symbol} name
   * The name of the module that could not be registered.
   */
  constructor(name, message) {
    const stringName = name.toString();
    let msg = `Could not register '${stringName}'.`;
    if (message) {
      msg += ` ${message}`;
    }
    super(msg);
  }
};
var InjectionMode = {
  /**
   * The dependencies will be resolved by injecting the cradle proxy.
   *
   * @type {String}
   */
  PROXY: "PROXY",
  /**
   * The dependencies will be resolved by inspecting parameter names of the function/constructor.
   *
   * @type {String}
   */
  CLASSIC: "CLASSIC"
};
var Lifetime = {
  /**
   * The registration will be resolved once and only once.
   * @type {String}
   */
  SINGLETON: "SINGLETON",
  /**
   * The registration will be resolved every time (never cached).
   * @type {String}
   */
  TRANSIENT: "TRANSIENT",
  /**
   * The registration will be resolved once per scope.
   * @type {String}
   */
  SCOPED: "SCOPED"
};
function isLifetimeLonger(a, b) {
  return a === Lifetime.SINGLETON && b !== Lifetime.SINGLETON || a === Lifetime.SCOPED && b === Lifetime.TRANSIENT;
}
function createTokenizer(source) {
  const end = source.length;
  let pos = 0;
  let type = "EOF";
  let value = "";
  let flags = 0;
  let parenLeft = 0;
  let parenRight = 0;
  return {
    next,
    done
  };
  function next(nextFlags = 0) {
    flags = nextFlags;
    advance();
    return createToken();
  }
  function advance() {
    value = "";
    type = "EOF";
    while (true) {
      if (pos >= end) {
        return type = "EOF";
      }
      const ch = source.charAt(pos);
      if (isWhiteSpace(ch)) {
        pos++;
        continue;
      }
      switch (ch) {
        case "(":
          pos++;
          parenLeft++;
          return type = ch;
        case ")":
          pos++;
          parenRight++;
          return type = ch;
        case "*":
          pos++;
          return type = ch;
        case ",":
          pos++;
          return type = ch;
        case "=":
          pos++;
          if ((flags & 1) === 0) {
            skipExpression();
          }
          return type = ch;
        case "/": {
          pos++;
          const nextCh = source.charAt(pos);
          if (nextCh === "/") {
            skipUntil((c) => c === "\n", true);
            pos++;
          }
          if (nextCh === "*") {
            skipUntil((c) => {
              const closing = source.charAt(pos + 1);
              return c === "*" && closing === "/";
            }, true);
            pos++;
          }
          break;
        }
        default:
          if (isIdentifierStart(ch)) {
            scanIdentifier();
            return type;
          }
          pos++;
      }
    }
  }
  function scanIdentifier() {
    const identStart = source.charAt(pos);
    const start = ++pos;
    while (isIdentifierPart(source.charAt(pos))) {
      pos++;
    }
    value = "" + identStart + source.substring(start, pos);
    type = value === "function" || value === "class" ? value : "ident";
    if (type !== "ident") {
      value = "";
    }
    return value;
  }
  function skipExpression() {
    skipUntil((ch) => {
      const isAtRoot = parenLeft === parenRight + 1;
      if (ch === "," && isAtRoot) {
        return true;
      }
      if (ch === "(") {
        parenLeft++;
        return false;
      }
      if (ch === ")") {
        parenRight++;
        if (isAtRoot) {
          return true;
        }
      }
      return false;
    });
  }
  function skipUntil(callback, dumb = false) {
    while (pos < source.length) {
      const ch = source.charAt(pos);
      if (callback(ch)) {
        return;
      }
      if (!dumb) {
        if (isWhiteSpace(ch)) {
          pos++;
          continue;
        }
        if (isStringQuote(ch)) {
          skipString();
          continue;
        }
      }
      pos++;
    }
  }
  function skipString() {
    const quote = source.charAt(pos);
    pos++;
    while (pos < source.length) {
      const ch = source.charAt(pos);
      const prev = source.charAt(pos - 1);
      if (ch === quote && prev !== "\\") {
        pos++;
        return;
      }
      if (quote === "`") {
        const next2 = source.charAt(pos + 1);
        if (next2 === "$") {
          const afterDollar = source.charAt(pos + 2);
          if (afterDollar === "{") {
            pos = pos + 2;
            skipUntil((ch2) => ch2 === "}");
          }
        }
      }
      pos++;
    }
  }
  function createToken() {
    if (value) {
      return { value, type };
    }
    return { type };
  }
  function done() {
    return type === "EOF";
  }
}
function isWhiteSpace(ch) {
  switch (ch) {
    case "\r":
    case "\n":
    case " ":
      return true;
  }
  return false;
}
function isStringQuote(ch) {
  switch (ch) {
    case "'":
    case '"':
    case "`":
      return true;
  }
  return false;
}
var IDENT_START_EXPR = /^[_$a-zA-Z\xA0-\uFFFF]$/;
var IDENT_PART_EXPR = /^[?._$a-zA-Z0-9\xA0-\uFFFF]$/;
function isIdentifierStart(ch) {
  return IDENT_START_EXPR.test(ch);
}
function isIdentifierPart(ch) {
  return IDENT_PART_EXPR.test(ch);
}
function nameValueToObject(name, value) {
  const obj = name;
  if (typeof obj === "string" || typeof obj === "symbol") {
    return { [name]: value };
  }
  return obj;
}
function last(arr) {
  return arr[arr.length - 1];
}
function isClass(fn) {
  if (typeof fn !== "function") {
    return false;
  }
  const tokenizer = createTokenizer(fn.toString());
  const first = tokenizer.next();
  if (first.type === "class") {
    return true;
  }
  const second = tokenizer.next();
  if (first.type === "function" && second.value) {
    if (second.value[0] === second.value[0].toUpperCase()) {
      return true;
    }
  }
  return false;
}
function isFunction(val) {
  return typeof val === "function";
}
function uniq(arr) {
  return Array.from(new Set(arr));
}
function parseParameterList(source) {
  const { next: _next, done } = createTokenizer(source);
  const params = [];
  let t = null;
  nextToken();
  while (!done()) {
    switch (t.type) {
      case "class": {
        const foundConstructor = advanceToConstructor();
        if (!foundConstructor) {
          return null;
        }
        break;
      }
      case "function": {
        const next = nextToken();
        if (next.type === "ident" || next.type === "*") {
          nextToken();
        }
        break;
      }
      case "(":
        parseParams();
        break;
      case ")":
        return params;
      // When we're encountering an identifier token
      // at this level, it could be because it's an arrow function
      // with a single parameter, e.g. `foo => ...`.
      // This path won't be hit if we've already identified the `(` token.
      case "ident": {
        const param = { name: t.value, optional: false };
        if (t.value === "async") {
          const next = nextToken();
          if (next && next.type !== "=") {
            break;
          }
        }
        params.push(param);
        return params;
      }
      /* istanbul ignore next */
      default:
        throw unexpected();
    }
  }
  return params;
  function parseParams() {
    let param = { name: "", optional: false };
    while (!done()) {
      nextToken();
      switch (t.type) {
        case "ident":
          param.name = t.value;
          break;
        case "=":
          param.optional = true;
          break;
        case ",":
          params.push(param);
          param = { name: "", optional: false };
          break;
        case ")":
          if (param.name) {
            params.push(param);
          }
          return;
        /* istanbul ignore next */
        default:
          throw unexpected();
      }
    }
  }
  function advanceToConstructor() {
    while (!done()) {
      if (isConstructorToken()) {
        nextToken(
          1
          /* TokenizerFlags.Dumb */
        );
        if (t.type !== "(") {
          continue;
        }
        return true;
      }
      nextToken(
        1
        /* TokenizerFlags.Dumb */
      );
    }
    return false;
  }
  function isConstructorToken() {
    return t.type === "ident" && t.value === "constructor";
  }
  function nextToken(flags = 0) {
    t = _next(flags);
    return t;
  }
  function unexpected() {
    return new SyntaxError(`Parsing parameter list, did not expect ${t.type} token${t.value ? ` (${t.value})` : ""}`);
  }
}
var RESOLVER = Symbol("Awilix Resolver Config");
function asValue(value) {
  return {
    resolve: () => value,
    isLeakSafe: true
  };
}
function asFunction(fn, opts) {
  if (!isFunction(fn)) {
    throw new AwilixTypeError("asFunction", "fn", "function", fn);
  }
  const defaults = {
    lifetime: Lifetime.TRANSIENT
  };
  opts = makeOptions(defaults, opts, fn[RESOLVER]);
  const resolve = generateResolve(fn);
  const result = {
    resolve,
    ...opts
  };
  return createDisposableResolver(createBuildResolver(result));
}
function asClass(Type, opts) {
  if (!isFunction(Type)) {
    throw new AwilixTypeError("asClass", "Type", "class", Type);
  }
  const defaults = {
    lifetime: Lifetime.TRANSIENT
  };
  opts = makeOptions(defaults, opts, Type[RESOLVER]);
  const newClass = function newClass2(...args) {
    return Reflect.construct(Type, args);
  };
  const resolve = generateResolve(newClass, Type);
  return createDisposableResolver(createBuildResolver({
    ...opts,
    resolve
  }));
}
function aliasTo(name) {
  return {
    resolve(container) {
      return container.resolve(name);
    },
    isLeakSafe: true
  };
}
function createBuildResolver(obj) {
  function setLifetime(value) {
    return createBuildResolver({
      ...this,
      lifetime: value
    });
  }
  function setInjectionMode(value) {
    return createBuildResolver({
      ...this,
      injectionMode: value
    });
  }
  function inject(injector) {
    return createBuildResolver({
      ...this,
      injector
    });
  }
  return updateResolver(obj, {
    setLifetime,
    inject,
    transient: partial(setLifetime, Lifetime.TRANSIENT),
    scoped: partial(setLifetime, Lifetime.SCOPED),
    singleton: partial(setLifetime, Lifetime.SINGLETON),
    setInjectionMode,
    proxy: partial(setInjectionMode, InjectionMode.PROXY),
    classic: partial(setInjectionMode, InjectionMode.CLASSIC)
  });
}
function createDisposableResolver(obj) {
  function disposer(dispose) {
    return createDisposableResolver({
      ...this,
      dispose
    });
  }
  return updateResolver(obj, {
    disposer
  });
}
function partial(fn, arg1) {
  return function partiallyApplied() {
    return fn.call(this, arg1);
  };
}
function makeOptions(defaults, ...rest) {
  return Object.assign({}, defaults, ...rest);
}
function updateResolver(source, target) {
  const result = {
    ...source,
    ...target
  };
  return result;
}
function wrapWithLocals(container, locals) {
  return function wrappedResolve(name, resolveOpts) {
    if (name in locals) {
      return locals[name];
    }
    return container.resolve(name, resolveOpts);
  };
}
function createInjectorProxy(container, injector) {
  const locals = injector(container);
  const allKeys = uniq([
    ...Reflect.ownKeys(container.cradle),
    ...Reflect.ownKeys(locals)
  ]);
  const proxy = new Proxy({}, {
    /**
     * Resolves the value by first checking the locals, then the container.
     */
    get(target, name) {
      if (name === Symbol.iterator) {
        return function* iterateRegistrationsAndLocals() {
          for (const prop in container.cradle) {
            yield prop;
          }
          for (const prop in locals) {
            yield prop;
          }
        };
      }
      if (name in locals) {
        return locals[name];
      }
      return container.resolve(name);
    },
    /**
     * Used for `Object.keys`.
     */
    ownKeys() {
      return allKeys;
    },
    /**
     * Used for `Object.keys`.
     */
    getOwnPropertyDescriptor(target, key) {
      if (allKeys.indexOf(key) > -1) {
        return {
          enumerable: true,
          configurable: true
        };
      }
      return void 0;
    }
  });
  return proxy;
}
function generateResolve(fn, dependencyParseTarget) {
  if (!dependencyParseTarget) {
    dependencyParseTarget = fn;
  }
  const dependencies = parseDependencies(dependencyParseTarget);
  return function resolve(container) {
    const injectionMode = this.injectionMode || container.options.injectionMode || InjectionMode.PROXY;
    if (injectionMode !== InjectionMode.CLASSIC) {
      const cradle = this.injector ? createInjectorProxy(container, this.injector) : container.cradle;
      return fn(cradle);
    }
    if (dependencies.length > 0) {
      const resolve2 = this.injector ? wrapWithLocals(container, this.injector(container)) : container.resolve;
      const children = dependencies.map((p) => resolve2(p.name, { allowUnregistered: p.optional }));
      return fn(...children);
    }
    return fn();
  };
}
function parseDependencies(fn) {
  const result = parseParameterList(fn.toString());
  if (!result) {
    const parent = Object.getPrototypeOf(fn);
    if (typeof parent === "function" && parent !== Function.prototype) {
      return parseDependencies(parent);
    }
    return [];
  }
  return result;
}
var FAMILY_TREE = Symbol("familyTree");
var ROLL_UP_REGISTRATIONS = Symbol("rollUpRegistrations");
var CRADLE_STRING_TAG = "AwilixContainerCradle";
function createContainer(options = {}) {
  return createContainerInternal(options);
}
function createContainerInternal(options, parentContainer, parentResolutionStack) {
  options = {
    injectionMode: InjectionMode.PROXY,
    strict: false,
    ...options
  };
  const resolutionStack = parentResolutionStack ?? [];
  const registrations = {};
  const cradle = new Proxy({
    /* removed in browser build */
  }, {
    /**
     * The `get` handler is invoked whenever a get-call for `container.cradle.*` is made.
     *
     * @param  {object} _target
     * The proxy target. Irrelevant.
     *
     * @param  {string} name
     * The property name.
     *
     * @return {*}
     * Whatever the resolve call returns.
     */
    get: (_target, name) => resolve(name),
    /**
     * Setting things on the cradle throws an error.
     *
     * @param  {object} target
     * @param  {string} name
     */
    set: (_target, name) => {
      throw new Error(`Attempted setting property "${name}" on container cradle - this is not allowed.`);
    },
    /**
     * Used for `Object.keys`.
     */
    ownKeys() {
      return Array.from(cradle);
    },
    /**
     * Used for `Object.keys`.
     */
    getOwnPropertyDescriptor(target, key) {
      const regs = rollUpRegistrations();
      if (Object.getOwnPropertyDescriptor(regs, key)) {
        return {
          enumerable: true,
          configurable: true
        };
      }
      return void 0;
    }
  });
  const container = {
    options,
    cradle,
    inspect,
    cache: /* @__PURE__ */ new Map(),
    loadModules: () => {
      throw new Error("loadModules is not supported in the browser.");
    },
    createScope,
    register,
    build,
    resolve,
    hasRegistration,
    dispose,
    getRegistration,
    /* removed in browser build */
    [ROLL_UP_REGISTRATIONS]: rollUpRegistrations,
    get registrations() {
      return rollUpRegistrations();
    }
  };
  const familyTree = parentContainer ? [container].concat(parentContainer[FAMILY_TREE]) : [container];
  container[FAMILY_TREE] = familyTree;
  const rootContainer = last(familyTree);
  return container;
  function inspect() {
    return `[AwilixContainer (${parentContainer ? "scoped, " : ""}registrations: ${Object.keys(container.registrations).length})]`;
  }
  function rollUpRegistrations() {
    return {
      ...parentContainer && parentContainer[ROLL_UP_REGISTRATIONS](),
      ...registrations
    };
  }
  function* cradleIterator() {
    const registrations2 = rollUpRegistrations();
    for (const registrationName in registrations2) {
      yield registrationName;
    }
  }
  function createScope() {
    return createContainerInternal(options, container, resolutionStack);
  }
  function register(arg1, arg2) {
    const obj = nameValueToObject(arg1, arg2);
    const keys = [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)];
    for (const key of keys) {
      const resolver = obj[key];
      if (options.strict && resolver.lifetime === Lifetime.SINGLETON) {
        if (parentContainer) {
          throw new AwilixRegistrationError(key, "Cannot register a singleton on a scoped container.");
        }
      }
      registrations[key] = resolver;
    }
    return container;
  }
  function toStringRepresentationFn() {
    return Object.prototype.toString.call(cradle);
  }
  function getRegistration(name) {
    const resolver = registrations[name];
    if (resolver) {
      return resolver;
    }
    if (parentContainer) {
      return parentContainer.getRegistration(name);
    }
    return null;
  }
  function resolve(name, resolveOpts) {
    resolveOpts = resolveOpts || {};
    try {
      const resolver = getRegistration(name);
      if (resolutionStack.some(({ name: parentName }) => parentName === name)) {
        throw new AwilixResolutionError(name, resolutionStack, "Cyclic dependencies detected.");
      }
      if (name === "toJSON") {
        return toStringRepresentationFn;
      }
      if (name === "constructor") {
        return createContainer;
      }
      if (!resolver) {
        switch (name) {
          // The following checks ensure that console.log on the cradle does not
          // throw an error (issue #7).
          case "inspect":
          case "toString":
            return toStringRepresentationFn;
          case Symbol.toStringTag:
            return CRADLE_STRING_TAG;
          // Edge case: Promise unwrapping will look for a "then" property and attempt to call it.
          // Return undefined so that we won't cause a resolution error. (issue #109)
          case "then":
            return void 0;
          // When using `Array.from` or spreading the cradle, this will
          // return the registration names.
          case Symbol.iterator:
            return cradleIterator;
        }
        if (resolveOpts.allowUnregistered) {
          return void 0;
        }
        throw new AwilixResolutionError(name, resolutionStack);
      }
      const lifetime = resolver.lifetime || Lifetime.TRANSIENT;
      if (options.strict && !resolver.isLeakSafe) {
        const maybeLongerLifetimeParentIndex = resolutionStack.findIndex(({ lifetime: parentLifetime }) => isLifetimeLonger(parentLifetime, lifetime));
        if (maybeLongerLifetimeParentIndex > -1) {
          throw new AwilixResolutionError(name, resolutionStack, `Dependency '${name.toString()}' has a shorter lifetime than its ancestor: '${resolutionStack[maybeLongerLifetimeParentIndex].name.toString()}'`);
        }
      }
      resolutionStack.push({ name, lifetime });
      let cached;
      let resolved;
      switch (lifetime) {
        case Lifetime.TRANSIENT:
          resolved = resolver.resolve(container);
          break;
        case Lifetime.SINGLETON:
          cached = rootContainer.cache.get(name);
          if (!cached) {
            resolved = resolver.resolve(options.strict ? rootContainer : container);
            rootContainer.cache.set(name, { resolver, value: resolved });
          } else {
            resolved = cached.value;
          }
          break;
        case Lifetime.SCOPED:
          cached = container.cache.get(name);
          if (cached !== void 0) {
            resolved = cached.value;
            break;
          }
          resolved = resolver.resolve(container);
          container.cache.set(name, { resolver, value: resolved });
          break;
        default:
          throw new AwilixResolutionError(name, resolutionStack, `Unknown lifetime "${resolver.lifetime}"`);
      }
      resolutionStack.pop();
      return resolved;
    } catch (err) {
      resolutionStack.length = 0;
      throw err;
    }
  }
  function hasRegistration(name) {
    return !!getRegistration(name);
  }
  function build(targetOrResolver, opts) {
    if (targetOrResolver && targetOrResolver.resolve) {
      return targetOrResolver.resolve(container);
    }
    const funcName = "build";
    const paramName = "targetOrResolver";
    AwilixTypeError.assert(targetOrResolver, funcName, paramName, "a registration, function or class", targetOrResolver);
    AwilixTypeError.assert(typeof targetOrResolver === "function", funcName, paramName, "a function or class", targetOrResolver);
    const resolver = isClass(targetOrResolver) ? asClass(targetOrResolver, opts) : asFunction(targetOrResolver, opts);
    return resolver.resolve(container);
  }
  function dispose() {
    const entries = Array.from(container.cache.entries());
    container.cache.clear();
    return Promise.all(entries.map(([, entry]) => {
      const { resolver, value } = entry;
      const disposable = resolver;
      if (disposable.dispose) {
        return Promise.resolve().then(() => disposable.dispose(value));
      }
      return Promise.resolve();
    })).then(() => void 0);
  }
}
export {
  AwilixError,
  AwilixRegistrationError,
  AwilixResolutionError,
  AwilixTypeError,
  InjectionMode,
  Lifetime,
  RESOLVER,
  aliasTo,
  asClass,
  asFunction,
  asValue,
  createBuildResolver,
  createContainer,
  createDisposableResolver,
  isClass,
  isFunction
};
//# sourceMappingURL=awilix.js.map
