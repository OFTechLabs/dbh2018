pragma solidity 0.4.8;

contract DynamicStrategy  {
	
    struct UserData {
    
    	address referenceAddress;
    
    	int256 balance;
    	int256[100] balanceHistory;
    
    	uint256 startYear;
    	uint256 elapsedYears;
    	uint256[100] yearHistory;

    	int256 goal;	
    	uint256 horizon;
    	
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

	mapping(address => UserData) public usersData;
	address[] public users;

	uint256 public total_users;
	int256 public total_balance;

	mapping(uint256 => int256) public stockRetuns;
	mapping(uint256 => int256) public bondReturns;
	

	function DynamicStrategy() public {
		currentYear = 2018;
	}
	
	function getBalanceHistory(address user) public returns (int256[100]) {
	    return usersData[user].balanceHistory;
	}
	
	function getYearHistory(address user) public returns (uint256[100]) {
	    return usersData[user].yearHistory;
	}
	
	function getBondHistory(address user) public returns (int256[100]) {
	    return usersData[user].bondHistory;
	}
	
	function getStockHistory(address user) public returns (int256[100]) {
	    return usersData[user].stockHistory;
	}
	
	function getTotalBalance() public returns (int256) {
	    return total_balance;
	}
	
	function getTotalUsers() public returns (uint256) {
	    return total_users;
	}
	
	function getCurrentYear() public returns (uint256) {
	    return currentYear;
	}
	
	function getUserData(address user) returns (int256, int256, uint256, uint256, uint256) {
	    return (usersData[user].balance, usersData[user].goal, usersData[user].startYear, 
	    usersData[user].elapsedYears, usersData[user].horizon);
	}
	
	function getUserAllocation(address user) returns (int256, int256){
	    return (usersData[user].currentStock, usersData[user].currentBond);
	}

	function subscribe(int256 balance, int256 goal, uint256 horizon, int256 beta0, int256 beta1, int256 beta2) public returns(bool) {		
	    if(usersData[msg.sender].referenceAddress != address(0)){
	        total_balance-=usersData[msg.sender].balance;
	        delete usersData[msg.sender];
	    } 
	    else {
	        users.push(msg.sender);    
	        total_users++;
	    }
		
		total_balance = total_balance + balance;
		
		usersData[msg.sender].referenceAddress = msg.sender;
		usersData[msg.sender].balance = balance;
		usersData[msg.sender].startYear = currentYear;
		usersData[msg.sender].goal = goal;
		usersData[msg.sender].horizon = horizon;
		usersData[msg.sender].beta0 = beta0;
		usersData[msg.sender].beta1 = beta1;
		usersData[msg.sender].beta2 = beta2;
		usersData[msg.sender].currentBond = 1000000000;
		usersData[msg.sender].currentStock = 0;

		reallocate(msg.sender);
		makerecord(msg.sender);		
		return true;	
	}

	function deposit(int256 amount) public returns(bool) {
	    if(usersData[msg.sender].referenceAddress == address(0)) throw;
	    
		usersData[msg.sender].balance += amount;
		total_balance += amount;
		return true;
	}

	function reallocate(address user) internal returns(bool) {
		if(usersData[msg.sender].referenceAddress == address(0)) throw;
		
		uint256 startYear = usersData[user].startYear;

		int256 beta0 = usersData[user].beta0;
		int256 beta1 = usersData[user].beta1;
		int256 beta2 = usersData[user].beta2;

		int256 wealth = usersData[user].balance;

		int256 fstock = beta0 + beta1*wealth + beta2*int256(currentYear- startYear);
		if(fstock < 0) fstock = 0;
		if(fstock > 1000000000) fstock = 1000000000;
		
		int256 fbonds = 1000000000 - fstock;		
		if(fstock+fbonds != 1000000000) throw;

		usersData[user].currentStock = fstock;
		usersData[user].currentBond = fbonds;

		return true;		
	}
	
	function makerecord(address user) internal returns(bool) {
	    if(usersData[msg.sender].referenceAddress == address(0)) throw;
	    
		uint256 elapsedYears = usersData[user].elapsedYears;
		usersData[user].balanceHistory[elapsedYears] = usersData[user].balance;
		usersData[user].yearHistory[elapsedYears] = currentYear;
		usersData[user].bondHistory[elapsedYears] = usersData[user].currentBond;
		usersData[user].stockHistory[elapsedYears] = usersData[user].currentStock;
		usersData[user].elapsedYears++;
		return true;
	}

	function processReturns(address user) internal returns(bool) {
	    if(usersData[msg.sender].referenceAddress == address(0)) throw;
	    
    	int256 factor = ((1000000000 + stockRetuns[currentYear])*usersData[user].currentStock)/1000000000 
    		+ ((1000000000 + bondReturns[currentYear])*usersData[user].currentBond)/1000000000;
    	int256 accruedReturn = (usersData[user].balance*(factor - 1000000000))/1000000000;	    
	    total_balance+= accruedReturn;	 
	    usersData[user].balance+= accruedReturn;
	    return true;
    }

	function setMarketData(uint[] timeStamps, int[] newStockReturns, int[] newBondReturns) public returns(bool) {    
	    for(uint i = 0; i < timeStamps.length; i++) {
	    	stockRetuns[timeStamps[i]] = newStockReturns[i];
	    	bondReturns[timeStamps[i]] = newBondReturns[i];
	    }
    return true;
  }

  function update() public returns(bool){
    currentYear++;
    for(uint256 i = 0; i < uint256(total_users); i++) {
        if(!processReturns(users[i])) throw;
        if(!reallocate(users[i])) throw; 
        if(!makerecord(users[i])) throw;
    }
    return true;
  }
}

