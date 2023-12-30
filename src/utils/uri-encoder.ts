const uriEncoder = (() => {
  const encode = (uri: string) => {
    return encodeURIComponent(uri.toLowerCase());
  };
  const decode = (uri: string) => {
    return decodeURIComponent(uri);
  };
  return {
    encode,
    decode,
  };
})();

export default uriEncoder;
