pragma solidity ^0.4.23;

import "./Wallet.sol";

contract Event
{
    bytes32 public m_Name;
    bytes32 public m_Description;
    bytes32 public m_Image;
    uint public m_Date;
    uint8 public m_Duration;
    uint24 public m_Tickets;
    uint16 public m_Cost;
    address public m_Owner;
    uint24 public m_TicketsLeft;

    mapping ( address => uint24 ) m_TicketMap;
    Wallet m_Wallet;

    constructor(bytes32 name, bytes32 description, bytes32 image, uint date, uint8 duration,
                uint24 tickets, uint16 cost, address walletAddress) public
    {
        m_Name = name;
        m_Description = description;
        m_Image = image;
        m_Date = date;
        m_Duration = duration;
        m_Tickets = tickets;
        m_Cost = cost;
        m_TicketsLeft = m_Tickets;

        m_Owner = msg.sender;
        m_Wallet = Wallet(walletAddress);
    }

    modifier onlyOwner()
    {
        require(msg.sender == m_Owner);
        _;
    }

    function hasStarted() public view returns(bool)
    {
        return m_Date < now;
    }

    function hasEnded() public view returns(bool)
    {
        return (m_Date + m_Duration) < now;
    }

    function amountOfTickets() public view returns (uint24 amount)
    {
        return m_TicketMap[msg.sender];
    }

    function buyTickets(uint24 amount) public
    {
        require(!hasStarted());
        require(m_TicketsLeft >= amount);

        m_Wallet.transferFrom(msg.sender, this, amount*m_Cost);

        m_TicketsLeft -= amount;
        m_TicketMap[msg.sender] += amount;
    }

    function sellTickets(uint24 amount) public
    {
        require(!hasStarted());
        require(amountOfTickets() >= amount);

        m_Wallet.transferFrom(this, msg.sender, amount*m_Cost);

        m_TicketsLeft += amount;
        m_TicketMap[msg.sender] -= amount;
    }
}