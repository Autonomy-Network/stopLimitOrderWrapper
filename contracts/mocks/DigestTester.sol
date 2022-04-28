// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.6;

/// @dev it has signature verification part from StopLimitOrder.sol
/// Dedicated to StopLimitOrder deployed in Avalanche
contract DigestTester {
    struct OrderArgs {
        address maker; 
        uint256 amountIn; 
        uint256 amountOut; 
        address recipient; 
        uint256 startTime;
        uint256 endTime;
        uint256 stopPrice;
        address oracleAddress;
        bytes oracleData;
        uint256 amountToFill;
        uint8 v; 
        bytes32 r;
        bytes32 s;
    }

    // See https://eips.ethereum.org/EIPS/eip-191
    string private constant EIP191_PREFIX_FOR_EIP712_STRUCTURED_DATA = "\x19\x01";
    bytes32 private constant DOMAIN_SEPARATOR_SIGNATURE_HASH = keccak256("EIP712Domain(string name,uint256 chainId,address verifyingContract)");
    bytes32 private constant ORDER_TYPEHASH = keccak256("LimitOrder(address maker,address tokenIn,address tokenOut,uint256 amountIn,uint256 amountOut,address recipient,uint256 startTime,uint256 endTime,uint256 stopPrice,address oracleAddress,bytes32 oracleData)");
    bytes32 private immutable _DOMAIN_SEPARATOR;

    /// @dev address of StopLimitOrder, deployed in Avalanche
    address private constant STOP_LIMIT_ORDER_ADDRESS = address(0xf6f9c9DB78AF5791A296c4bF34d59E0236E990E0);

    constructor() {
        _DOMAIN_SEPARATOR = _calculateDomainSeparator(43114);
    }

    /// @dev Calculate the DOMAIN_SEPARATOR
    function _calculateDomainSeparator(uint256 chainId) internal view returns (bytes32) {
        return keccak256(
            abi.encode(
                DOMAIN_SEPARATOR_SIGNATURE_HASH,
                keccak256("LimitOrder"),
                chainId,
                STOP_LIMIT_ORDER_ADDRESS
            )
        );
    }

    function DOMAIN_SEPARATOR() internal view returns (bytes32) {
        return _DOMAIN_SEPARATOR;
    }

    function _getDigest(OrderArgs memory order, address tokenIn, address tokenOut) internal view returns(bytes32 digest) {
        bytes32 encoded = keccak256(
            abi.encode(
                ORDER_TYPEHASH,
                order.maker,
                tokenIn,
                tokenOut,
                order.amountIn,
                order.amountOut,
                order.recipient,
                order.startTime,
                order.endTime,
                order.stopPrice,
                order.oracleAddress,
                keccak256(order.oracleData)
            )
        );
        
        digest =
            keccak256(
                abi.encodePacked(
                    EIP191_PREFIX_FOR_EIP712_STRUCTURED_DATA,
                    DOMAIN_SEPARATOR(),
                    encoded
                )
            );
    }

    function checkDigest(OrderArgs memory order, address tokenIn, address tokenOut) public view returns (address maker) {
        bytes32 digest = _getDigest(order, tokenIn, tokenOut);
        maker = ecrecover(digest, order.v, order.r, order.s);
    }
}