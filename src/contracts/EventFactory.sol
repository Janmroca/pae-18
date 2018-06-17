pragma solidity ^0.4.23;

contract EventFactory
{
    address[] m_Events;
    address m_Owner;

    constructor() public
    {
        m_Owner = msg.sender;
    }

    function createEvent(bytes32 name, bytes32 description, bytes32 image, uint date, uint24 tickets, uint16 cost) public
    {
        address newEvent = new Event(name, description, image, date, tickets, cost);
        m_Events.push(newEvent);
    }

    function getEvents() public view returns (address[] events)
    {
        return m_Events;
    }

}

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

    constructor(bytes32 name, bytes32 description, bytes32 image, uint date, uint24 tickets, uint16 cost) public
    {
        m_Name = name;
        m_Description = description;
        m_Image = image;
        m_Date = date;
        m_Tickets = tickets;
        m_Cost = cost;
        m_Owner = msg.sender;
        m_TicketsLeft = m_Tickets;
    }

    function amountOfTickets() public view returns (uint24 amount)
    {
        return m_TicketMap[msg.sender];
    }

    function buyTickets(uint24 amount) public returns (bool success)
    {
        if (m_TicketsLeft < amount) return false;
        if (now >= m_Date) return false;
        // TODO: substract price

        m_TicketsLeft -= amount;
        m_TicketMap[msg.sender] += amount;

        return true;
    }

    function sellTickets(uint24 amount) public returns (bool success)
    {
        if (m_TicketMap[msg.sender] < amount) return false;
        // TODO: return price

        m_TicketsLeft += amount;
        m_TicketMap[msg.sender] -= amount;

        return true;
    }
}