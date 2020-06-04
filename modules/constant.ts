function constant(value:any) {
  return function() {
    return value;
  };
}

export default constant;
