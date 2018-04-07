pragma solidity ^0.4.20;

library SafeMath {

  function times(uint x, uint y) internal pure returns(uint) {
    uint z = x * y;
    assert(x == 0 || (z / x == y));
    return z;
  }

  function divide(uint x, uint y) internal pure returns(uint) {
    assert(y != 0);
    return x / y;
  }

  function minus(uint x, uint y) internal pure returns(uint) {
    assert(y <= x);
    return x - y;
  }

  function plus(uint x, uint y) internal pure returns(uint) {
    uint z = x + y;
    assert(z >= x && z >= y);
    return z;
  }

  function min(uint x, uint y) internal pure returns(uint) {
    return x <= y ? x : y;
  }

  function max(uint x, uint y) internal pure returns(uint) {
    return x > y ? x : y;
  }

}

