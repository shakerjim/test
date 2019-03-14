var formatUrl = function (data) {
  var _string = '';
  Object.keys(data).forEach((item) => {
    _string += encodeURI(item) + "=" + encodeURI(data[item]) + "&";
  })
  return _string.substr(0, _string.length - 1);
};
export default formatUrl
