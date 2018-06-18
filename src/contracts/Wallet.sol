pragma solidity ^0.4.23;

contract Wallet
{
    mapping( address => uint256 ) m_BalanceMap;
    address m_Owner;

    constructor(uint256 initialAmount) public
    {
        m_Owner = msg.sender;
        m_BalanceMap[m_Owner] = initialAmount;
    }

    function balanceOf(address user) public view returns(uint256)
    {
        return m_BalanceMap[user];
    }

    function _transfer(address from, address to, uint amount) internal
    {
        require(balanceOf(from) >= amount);

        m_BalanceMap[from] -= amount;
        m_BalanceMap[to] += amount;
    }

    function transfer(address to, uint amount) public
    {
        _transfer(msg.sender, to, amount);
    }

    function transferFrom(address from, address to, uint amount) public
    {
        _transfer(from, to, amount);
    }
}