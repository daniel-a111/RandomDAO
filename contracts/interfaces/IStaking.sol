pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

abstract contract IStaking {
    function allowed(address account) virtual public view returns(bool);
}
