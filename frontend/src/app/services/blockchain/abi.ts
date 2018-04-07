export const abiArray = [
  {
    constant: false,
    inputs: [
      {
        name: 'amount',
        type: 'int256'
      },
      {
        name: 'goal',
        type: 'int256'
      },
      {
        name: 'horizon',
        type: 'int256'
      },
      {
        name: 'beta0',
        type: 'int256'
      },
      {
        name: 'beta1',
        type: 'int256'
      },
      {
        name: 'beta2',
        type: 'int256'
      }
    ],
    name: 'subscribe',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 't_current',
    outputs: [
      {
        name: '',
        type: 'int256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'time',
        type: 'int256'
      }
    ],
    name: 'setcurrenttime',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    name: 'users',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'oneFloat',
    outputs: [
      {
        name: '',
        type: 'int256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'user',
        type: 'address'
      }
    ],
    name: 'reallocate',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'timestamp',
        type: 'uint256'
      }
    ],
    name: 'getYear',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'update',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'year',
        type: 'uint256'
      }
    ],
    name: 'leapYearsBefore',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'year',
        type: 'uint256'
      }
    ],
    name: 'isLeapYear',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'month',
        type: 'uint256'
      },
      {
        name: 'year',
        type: 'uint256'
      }
    ],
    name: 'getDaysInMonth',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'timestamp',
        type: 'uint256'
      }
    ],
    name: 'getYearMonth',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'total_balance',
    outputs: [
      {
        name: '',
        type: 'int256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    name: 'settings',
    outputs: [
      {
        name: 'referenceAddress',
        type: 'address'
      },
      {
        name: 'balance',
        type: 'int256'
      },
      {
        name: 't_start',
        type: 'int256'
      },
      {
        name: 'goal',
        type: 'int256'
      },
      {
        name: 'horizon',
        type: 'int256'
      },
      {
        name: 'beta0',
        type: 'int256'
      },
      {
        name: 'beta1',
        type: 'int256'
      },
      {
        name: 'beta2',
        type: 'int256'
      },
      {
        name: 'fbonds',
        type: 'int256'
      },
      {
        name: 'fstock',
        type: 'int256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'total_users',
    outputs: [
      {
        name: '',
        type: 'int256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'amount',
        type: 'int256'
      }
    ],
    name: 'deposit',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'minFloat',
    outputs: [
      {
        name: '',
        type: 'int256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  }
];
