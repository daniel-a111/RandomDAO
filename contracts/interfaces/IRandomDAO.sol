pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "./IStaking.sol";
import "./IRandomizer.sol";
import "../RNDM.sol";

abstract contract IRandomDAO is IRandomizer {

    function burn(address account, uint amount) virtual public;

    function seed() public virtual view returns(bytes32);

    function mine(uint256 random) virtual public;

    function mine_and_difficulty_fit(uint256 random) virtual public;

    function coin() public virtual view returns(IERC20);
}
