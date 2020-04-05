pragma solidity ^0.6.0;

import "./interfaces/IERC721.sol";



interface ERC721Borrower {
    function erc721Borrow(address token, uint256 tokenId, uint256 interest) external;
}

/* List of errors:
 * EPool1: ERC721 token not deposted (user doesn't own that token).
 */


contract FlashPool is IERC721Receiver {
    enum Available {Null, Yes, Borrowed}

    struct DepositS {
        address owner;
        Available available;
        // fee?
    }
    // ERC721 address => tokenID => Deposit
    mapping(address => mapping (uint256 => DepositS)) public deposits;

    event Deposit(address indexed from, address indexed _contract, uint256 indexed tokenId);
    event Withdraw(address indexed to, address indexed _contract, uint256 indexed tokenId);


    // @notice Depositing token. This function registers a token deposit on the ERC721 token
    // `safeTransferFrom`.
    // @dev Callback on sending a token to the pool. To use it you MUST use
    // `token.safeTransferFrom` method with the address of the pool.
    function onERC721Received(address /* _operator */, address _from, uint256 _tokenId, bytes calldata /* _data */) external override returns(bytes4){
        // Assure that the transfer was made by ERC721 contract and we are a new owner.
        require(IERC721(msg.sender).ownerOf(_tokenId) == address(this));
        // Protect from some weird attacks of a `fake` ERC721 token contracts.
        // TODO: what if an attacker used `transferFrom` instead of `safeTransferFrom`?
        require(deposits[msg.sender][_tokenId].available == Available.Null, "EPool1");

        deposits[msg.sender][_tokenId] = DepositS(_from, Available.Yes);
        emit Deposit(_from, msg.sender, _tokenId);
        return bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    }

    // @dev Throws if token is not deposited and not registered.
    // @dev The function uses `safeTransferFrom` so in case of transferring to a smart-contract,
    //   `onERC721Received` method will be called.
    function withdrawToken(address _to, address _contract, uint256 _tokenId) public {
        require(deposits[_contract][_tokenId].available == Available.Yes, "EPool1");
        delete deposits[_contract][_tokenId];
        emit Withdraw(_to, _contract, _tokenId);
        IERC721(_contract).safeTransferFrom(address(this), _to, _tokenId, "withdraw");
    }

    // @notice Sending a token with a not safe method (`token.transferFrom`) will not register
    // a token deposit. Hence it could cause token loss. Ot recover from that event we define
    // this method to allow a user to try to obtain back the ownership of his token.
    // @dev Throws if token is deposited and registered. You should call `withdrawToken`.
    function withdrawTokenNotRegistered(address _to, address _contract, uint256 _tokenId) public {
        require(deposits[_contract][_tokenId].available == Available.Null, "EPool1");
        IERC721(_contract).safeTransferFrom(address(this), _to, _tokenId, "recover");
    }
}
