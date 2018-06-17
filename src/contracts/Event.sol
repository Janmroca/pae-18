pragma solidity ^0.4.23;

import "./Wallet.sol";

contract Event
{
    bytes32 public m_Name;
    bytes32 public m_Description;
    bytes32 public m_Image;
    uint public m_Date;
    uint24 public m_Tickets;
    uint16 public m_Cost;
    address public m_Owner;
    mapping ( address => uint24 ) m_TicketMap;
    uint24 public m_TicketsLeft;
    Wallet m_Wallet;

    constructor(bytes32 name, bytes32 description, bytes32 image, uint date, uint24 tickets, uint16 cost, address walletAddress) public
    {
        m_Name = name;
        m_Description = description;
        m_Image = image;
        m_Date = date;
        m_Tickets = tickets;
        m_Cost = cost;

        m_Owner = msg.sender;
        m_TicketsLeft = m_Tickets;

        m_Wallet = Wallet(walletAddress);
    }

    modifier onlyOwner()
    {
        require(msg.sender == m_Owner);
        _;
    }

    modifier notStarted()
    {
        require(now < m_Date);
        _;
    }

    function amountOfTickets() public view returns (uint24 amount)
    {
        return m_TicketMap[msg.sender];
    }

    function buyTickets(uint24 amount) notStarted public returns (bool success)
    {
        if (m_TicketsLeft < amount) return false;
        if (!m_Wallet.transfer(this, amount)) return false;

        m_TicketsLeft -= amount;
        m_TicketMap[msg.sender] += amount;

        return true;
    }

    function sellTickets(uint24 amount) notStarted public returns (bool success)
    {
        if (m_TicketMap[msg.sender] < amount) return false;
        if (!m_Wallet.transferFrom(this, msg.sender, amount)) return false;

        m_TicketsLeft += amount;
        m_TicketMap[msg.sender] -= amount;

        return true;
    }
}