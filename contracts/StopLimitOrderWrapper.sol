//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./interfaces/IStopLimitOrder.sol";
import "./interfaces/IBentoBox.sol";

contract StopLimitOrderWrapper{
    IBentoBoxV1 public immutable bentoBox;
    address payable public immutable registry;
    address public immutable gasFeeForwarder;
    IStopLimitOrder public immutable stopLimitOrderContract;
    address public immutable WETH;

    constructor(
        address payable registry_,
        address gasFeeForwarder_,
        address bentoBox_,
        address stopLimitOrderContract_,
        address WETH_
    ) {
        registry = registry_;
        gasFeeForwarder = gasFeeForwarder_;
        bentoBox = IBentoBoxV1(bentoBox_);

        stopLimitOrderContract = IStopLimitOrder(stopLimitOrderContract_);
        WETH = WETH_;
    }

    function fillOrder(
        uint256 feeAmount,
        OrderArgs memory order,
        address tokenIn,
        address tokenOut, 
        address receiver, 
        bytes calldata data
    ) external gasFeeForwarderVerified {
        stopLimitOrderContract.fillOrder(
            order,
            tokenIn,
            tokenOut,
            receiver,
            data
        );

        uint256 _feeReceivedAsShare = bentoBox.balanceOf(WETH, address(this));
        uint256 _feeReceivedAmount = bentoBox.toAmount(WETH, _feeReceivedAsShare, false);
        require(_feeReceivedAmount >= feeAmount, "Invalid Fee");

        bentoBox.withdraw(
            address(0), // USE_ETHEREUM
            address(this),
            registry,   // transfer to registry
            0,
            _feeReceivedAsShare
        );
    }

    modifier gasFeeForwarderVerified() {
        require(msg.sender == gasFeeForwarder, "StopLimitOrderWrapper: no gasFF");
        _;
    }
}
