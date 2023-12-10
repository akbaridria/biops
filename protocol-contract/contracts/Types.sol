// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

library Types {
  enum Status {
    ACTIVE,
    LOSE,
    WIN,
    CLAIMED
  }

  enum Direction {
    UP,
    DOWN
  }

  struct Trade {
    bool isExist;
    address trader;
    uint256 amount;
    Direction direction;
    int64 startPrice;
    Status status;
    uint256 expireTime;
    string market;
  }

}