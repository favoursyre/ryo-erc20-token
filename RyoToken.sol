//I want to learn how to create a ERC-20 Token

//Useful libraries that I would be working with -->
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7; //This specifies the version of solidity we wanna use

//Commencing with the code
contract RyoToken is ERC20 {
    address public admin;

    constructor() ERC20("Ryo Token", "RYO") {
        _mint(msg.sender, 10000 * 10**18);
        admin = msg.sender;
    }

    //This function helps to mint new tokens
    function mint(address to, uint amount) external {
        require(msg.sender == admin, "access denied");
        _mint(to, amount);
    }

    //This function helps to burn new token
    function burn(uint amount) external {
        _burn(msg.sender, amount);
    }
}
