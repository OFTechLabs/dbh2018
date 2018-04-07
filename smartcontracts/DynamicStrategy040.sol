pragma solidity 0.4.0;

contract DynamicStrategy  {
	
    struct UserData {
    
    	address referenceAddress;
    
    	int256 balance;
    	int256[] balanceHistory;
    
    	uint256 startYear;
    	uint256 elapsedYears;
    	uint256[] yearHistory;

    	int256 goal;	
    	int256 horizon;
    	
    	int256 beta0;
    	int256 beta1;
    	int256 beta2;
    
    	int256 currentBond;
    	int256 currentStock;

    	int256[] bondHistory;
    	int256[] stockHistory;
    
    }

	uint256 public currentYear;
	
	function setcurrenttime(uint256 year) public returns(bool){
	    currentYear = year;
	    return true;
	}

	modifier newuser {
		if (usersData[msg.sender].referenceAddress != address(0)) { 
		    throw; 
		}
		_;
	}

	modifier existuser {
		if (usersData[msg.sender].referenceAddress == address(0)) {
		    throw;
		}
		_;
	}		

	mapping(address => UserData) public usersData;
	address[] public users;

	uint256 public total_users;
	int256 public total_balance;

	function DynamicStrategy() public {
		currentYear = 2018;
	}

	function subscribe(int256 balance, int256 goal, int256 horizon, int256 beta0, int256 beta1, int256 beta2) public newuser returns(bool) {		
	    users.push(msg.sender);
		total_users++;
		total_balance = total_balance + balance;
		usersData[msg.sender] = UserData({
			referenceAddress: msg.sender, 
			balance: int256(balance), 
			balanceHistory: new int256[](100),
			startYear: currentYear,
			elapsedYears: 0,
			yearHistory: new uint256[](100),
			goal: goal,
			horizon: horizon,
			beta0: beta0,
			beta1: beta1,
			beta2: beta2,
			currentBond: 1000000000,
			currentStock: 0,
			bondHistory: new int256[](100),
			stockHistory: new int256[](100)
			});

		reallocate(msg.sender);
		makerecord(msg.sender);		
		return true;	
	}

	function deposit(int256 amount) public existuser returns(bool) {
		usersData[msg.sender].balance += amount;
		total_balance += amount;
		return true;
	}

	function reallocate(address user) public existuser returns(bool) {
		
		uint256 startYear = usersData[user].startYear;

		int256 beta0 = usersData[user].beta0;
		int256 beta1 = usersData[user].beta1;
		int256 beta2 = usersData[user].beta2;

		int256 wealth = usersData[user].balance;

		int256 fstock = beta0 + beta1*wealth + beta2*int256(currentYear- startYear);
		int256 fbonds = 1000000000 - fstock;		

		if (fstock < 0) {
		    throw;
		}
		if (fbonds < 0) {
		    throw;
		}
		if (fstock+fbonds != 1000000000) {
		    throw;
		}

		usersData[user].currentStock = fstock;
		usersData[user].currentBond = fbonds;

		return true;		
	}
	
	function makerecord(address user) private existuser returns(bool) {
		uint256 elapsedYears = usersData[user].elapsedYears;
		usersData[user].balanceHistory[elapsedYears] = usersData[user].balance;
		usersData[user].yearHistory[elapsedYears] = currentYear;
		usersData[user].bondHistory[elapsedYears] = usersData[user].currentBond;
		usersData[user].stockHistory[elapsedYears] = usersData[user].currentStock;		
		usersData[user].elapsedYears++;
		return true;
	}


	function update() public returns(bool){
	    for(uint256 i = 0; i < uint256(total_users); i++) {
	        if (!reallocate(users[i])) {
	            throw;
	        }
	        if (!makerecord(users[i])) {
	            throw;
	        }
	    }
	    currentYear++;
	    return true;
	}
}
