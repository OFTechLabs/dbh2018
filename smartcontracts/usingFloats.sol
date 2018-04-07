pragma solidity ^0.4.20;

contract usingFloats {

  function usingFloats() public {
    oneFloat = 1000000000;
    minFloat = 1000000; // i.e. 0.001
  }

  int public oneFloat;
  int public minFloat;

}

