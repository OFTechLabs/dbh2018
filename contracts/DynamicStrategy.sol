pragma solidity ^0.4.20;

import "./SafeMath.sol";
import "./usingTime.sol";
import "./usingFloats.sol";

contract DynamicStrategy is usingTime, usingFloats {
	using SafeMath for uint256;
	
    struct UserSettings {
    
    	address referenceAddress;
    
    	uint256 balance;
    
    	uint256 t_start;
    
    	uint256 goal;	
    	uint256 horizon;
    	
    	uint256 beta0;
    	uint256 beta1;
    	uint256 beta2;
    
    	uint256 fbonds;
    	uint256 fstock;
    
    }

	uint256 public t_current;
	
	function setcurrenttime(uint256 time) public returns(bool){
	    t_current = time;
	    return true;
	}

	modifier newuser {
		require(settings[msg.sender].referenceAddress == address(0));
		_;
	}

	modifier existuser {
		require(settings[msg.sender].referenceAddress != address(0));
		_;
	}		

	mapping(address => UserSettings) public settings;
	address[] public users;

	uint256 public total_users;
	uint256 public total_balance;

	function DynamicStrategy() {
		t_current = 2000;
	}

	function subscribe(uint256 amount, uint256 goal, uint256 horizon, uint256 beta0, uint256 beta1, uint256 beta2) public newuser returns(bool) {
	    users.push(msg.sender);
		total_users++;
		
		total_balance += amount;

		settings[msg.sender] = UserSettings(msg.sender, amount, t_current, goal, horizon, beta0, beta1, beta2, oneFloat, 0);

		reallocate(msg.sender);

		return true;	
	}

	function deposit(uint256 amount) public existuser returns(bool) {
		settings[msg.sender].balance += amount;
		total_balance += amount;
		return true;
	}

	function reallocate(address user) public existuser returns(bool) {
		
		uint256 t_start = settings[user].t_start;

		uint256 beta0 = settings[user].beta0;
		uint256 beta1 = settings[user].beta1;
		uint256 beta2 = settings[user].beta2;

		uint256 wealth = settings[user].balance;

		uint256 fstock = beta0 + beta1*wealth + beta2*(t_current- t_start);
		uint256 fbonds = oneFloat - fstock;		

		require(fstock >= 0);
		require(fbonds >= 0);
		require(fstock+fbonds == 1e9);

		settings[user].fstock = fstock;
		settings[user].fbonds = fbonds;

		return true;		
	}
	
	function update() public returns(bool){
	    for(uint i = 0; i < total_users; i++) {
	        require(reallocate(users[i]));
	    }
	    return true;
	}
}

