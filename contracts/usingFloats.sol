pragma solidity ^0.4.20;

contract usingFloats {

  function usingFloats() {
    oneFloat = 1000000000;
    minFloat = 1000000; // i.e. 0.001
  }

  uint public oneFloat;
  uint public minFloat;

}

