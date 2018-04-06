pragma solidity ^0.4.20;

import "./SafeMath";
import "./usingTime";
import "./usingFloats";

contract DynamicStrategy is usingTime, usingFloats {
	using SafeMath for int256;
	
    struct UserSettings {
    
    	address referenceAddress;
    
    	int256 balance;
    
    	int256 t_start;
    
    	int256 goal;	
    	int256 horizon;
    	
    	int256 beta0;
    	int256 beta1;
    	int256 beta2;
    
    	int256 fbonds;
    	int256 fstock;
    
    }

	int256 public t_current;
	
	function setcurrenttime(int256 time) public returns(bool){
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

	int256 public total_users;
	int256 public total_balance;

	function DynamicStrategy() public {
		t_current = 2000;
	}

	function subscribe(int256 amount, int256 goal, int256 horizon, int256 beta0, int256 beta1, int256 beta2) public newuser returns(bool) {
	    users.push(msg.sender);
		total_users++;
		
		total_balance += amount;

		settings[msg.sender] = UserSettings(msg.sender, amount, t_current, goal, horizon, beta0, beta1, beta2, oneFloat, 0);

		reallocate(msg.sender);

		return true;	
	}

	function deposit(int256 amount) public existuser returns(bool) {
		settings[msg.sender].balance += amount;
		total_balance += amount;
		return true;
	}

	function reallocate(address user) public existuser returns(bool) {
		
		int256 t_start = settings[user].t_start;

		int256 beta0 = settings[user].beta0;
		int256 beta1 = settings[user].beta1;
		int256 beta2 = settings[user].beta2;

		int256 wealth = settings[user].balance;

		int256 fstock = beta0 + beta1*wealth + beta2*(t_current- t_start);
		int256 fbonds = oneFloat - fstock;		

		require(fstock >= 0);
		require(fbonds >= 0);
		require(fstock+fbonds == 1e9);

		settings[user].fstock = fstock;
		settings[user].fbonds = fbonds;

		return true;		
	}
	
	function update() public returns(bool){
	    for(uint256 i = 0; i < uint256(total_users); i++) {
	        require(reallocate(users[i]));
	    }
	    return true;
	}
}

