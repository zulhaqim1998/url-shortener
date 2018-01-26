var alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
var base = alphabet.length;

function encode(num){
  var encoded = '';
  while(num){
    let remainder = num % base;
    num = Math.floor(num / base);
    encoded = alphabet[remainder].toString() + encoded;
  }
  return encoded;
}

function decode(code){
  var decoded = 0;
  while(code){
    var index = alphabet.indexOf(code[0]);
    var power = code.length - 1;
    decoded += index * Math.pow(base, power);
    code = code.substring(1);
  }
  return decoded;
}

module.exports.encode = encode;
module.exports.decode = decode;
