pragma solidity ^0.4.21;

contract DynamicStrategy  {
	
    struct UserData {
    
    	address referenceAddress;
    
    	int256 balance;
    	int256[100] balanceHistory;
    
    	uint256 startYear;
    	uint256 elapsedYears;
    	uint256[100] yearHistory;

    	int256 goal;	
    	int256 horizon;
    	
    	int256 beta0;
    	int256 beta1;
    	int256 beta2;
    
    	int256 currentBond;
    	int256 currentStock;

    	int256[100] bondHistory;
    	int256[100] stockHistory;
    
    }

	uint256 public currentYear;
	
	function setcurrenttime(uint256 year) public returns(bool){
	    currentYear = year;
	    return true;
	}

	modifier newuser {
		require(usersData[msg.sender].referenceAddress == address(0));
		_;
	}

	modifier existuser {
		require(usersData[msg.sender].referenceAddress != address(0));
		_;
	}		

	mapping(address => UserData) public usersData;
	address[] public users;

	uint256 public total_users;
	int256 public total_balance;

	function DynamicStrategy() public {
		currentYear = 2018;
	}
	
	function getBalanceHistory(address user) public view returns (int256[100]) {
	    return usersData[user].balanceHistory;
	}
	
	function getYearHistory(address user) public view returns (uint256[100]) {
	    return usersData[user].yearHistory;
	}
	
	function getBondHistory(address user) public view returns (int256[100]) {
	    return usersData[user].bondHistory;
	}
	
	function getStockHistory(address user) public view returns (int256[100]) {
	    return usersData[user].stockHistory;
	}

	function subscribe(int256 balance, int256 goal, int256 horizon, int256 beta0, int256 beta1, int256 beta2) public newuser returns(bool) {		
	    users.push(msg.sender);
		
		total_users++;
		total_balance = total_balance + balance;
		
		usersData[msg.sender].referenceAddress = msg.sender;
		usersData[msg.sender].balance = balance;
		usersData[msg.sender].startYear = currentYear;
		usersData[msg.sender].goal = goal;
		usersData[msg.sender].horizon = horizon;
		usersData[msg.sender].beta0 = beta0;
		usersData[msg.sender].beta1 = beta1;
		usersData[msg.sender].beta2 = beta2;
		usersData[msg.sender].currentBond = 1e9;
		usersData[msg.sender].currentStock = 0;

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
		int256 fbonds = 1e9 - fstock;		

		require(fstock >= 0);
		require(fbonds >= 0);
		require(fstock+fbonds == 1e9);

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
	        require(reallocate(users[i]));
	        require(makerecord(users[i]));
	    }
	    currentYear++;
	    return true;
	}
}

