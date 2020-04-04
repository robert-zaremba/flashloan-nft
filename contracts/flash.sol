pragma solidity ^0.6.0;

// import "./interface/IERC721.sol";



interface ERC721Borrower() {
    function erc721Borrow(address token, uint256 tokenId, uint256 interest);
}



contract FlashPool {

    function mkFlashLoan(address token, uint256 tokenId) {

    }

}
