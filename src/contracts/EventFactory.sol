pragma solidity ^0.4.23;

import "./Event.sol";

contract EventFactory
{
    address[] m_Events;
    address m_Owner;
    address  m_WalletAddress;

    constructor(address walletAddress) public
    {
        m_Owner = msg.sender;
        m_WalletAddress = walletAddress;
    }

    function createEvent(bytes32 name, bytes32 description, bytes32 image, uint date, uint24 tickets, uint16 cost) public
    {
        address newEvent = new Event(name, description, image, date, tickets, cost, m_WalletAddress);
        m_Events.push(newEvent);
    }

    function getEvents() public view returns (address[] events)
    {
        return m_Events;
    }

}
