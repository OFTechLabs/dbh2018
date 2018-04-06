pragma solidity ^0.4.20;

library SafeMath {

  function times(uint x, uint y) internal constant returns(uint) {
    uint z = x * y;
    if(x != 0 && (z / x != y)) throw;
    return z;
  }

  function divide(uint x, uint y) internal constant returns(uint) {
    if(y == 0) throw;
    return x / y;
  }

  function minus(uint x, uint y) internal constant returns(uint) {
    if(y > x) throw;
    return x - y;
  }

  function plus(uint x, uint y) internal constant returns(uint) {
    uint z = x + y;
    if(z < x || z < y) throw;
    return z;
  }

  function min(uint x, uint y) internal constant returns(uint) {
    return x <= y ? x : y;
  }

  function max(uint x, uint y) internal constant returns(uint) {
    return x > y ? x : y;
  }

}

