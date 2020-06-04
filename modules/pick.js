import basePickBy from "https://raw.githubusercontent.com/lodash/lodash/master/.internal/basePickBy.js"
import hasPathIn from "https://deno.land/x/lodash/hasPathIn.js";
import flatten from "https://deno.land/x/lodash/flatten.js";
import isNative from "https://deno.land/x/lodash/isNative.js";
import constant from "./constant.ts"
import identity from "./identity.ts"

function getValue(object, key) {
  return object == null ? undefined : object[key];
}

function getNative(object, key) {
  var value = getValue(object, key);
  return isNative(value) ? value : undefined;
}

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

var HOT_COUNT = 800,
    HOT_SPAN = 16;

var nativeNow = Date.now;

function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

var setToString = shortOut(baseSetToString);

function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

var nativeMax = Math.max;

function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}

function basePick(object, paths) {
  return basePickBy(object, paths, function(value, path) {
    return hasPathIn(object, path);
  });
}


const pick = flatRest(function(object, paths) {
  return object == null ? {} : basePick(object, paths);
});

export default pick;
