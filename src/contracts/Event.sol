pragma solidity ^0.4.23;

import "./Wallet.sol";

contract Event
{
    bytes32 public m_Name;
    bytes32 public m_Description;
    bytes32 public m_Image;
    uint public m_StartDate;
    uint public m_EntranceDate;
    uint public m_FinishDate;
    uint24 public m_TotalTickets;
    uint16 public m_Cost;
    uint24 public m_TicketsLeft;

    mapping ( address => tickets ) m_TicketMap;
    Wallet m_Wallet;
    address m_BenefitiaryAddress;

    struct tickets
    {
        uint24 amount;
        uint24 amountRedeemed;
    }

    constructor(bytes32 name, bytes32 description, bytes32 image, uint startDate, uint16 duration, uint16 entranceDuration,
                uint24 totalTickets, uint16 cost, address walletAddress, address benefitiaryAddress) public
    {
        m_Name = name;
        m_Description = description;
        m_Image = image;
        m_StartDate = startDate;
        m_FinishDate = m_StartDate + duration;
        m_EntranceDate = m_StartDate - entranceDuration;
        m_TotalTickets = totalTickets;
        m_Cost = cost;
        m_TicketsLeft = m_TotalTickets;

        m_Wallet = Wallet(walletAddress);
        m_BenefitiaryAddress = benefitiaryAddress;
    }

    function isBenefitiary() public view returns(bool)
    {
        return(msg.sender == m_BenefitiaryAddress);
    }

    function isEntranceOpen() public view returns(bool)
    {
        return !hasStarted() && now >= m_EntranceDate;
    }

    function hasStarted() public view returns(bool)
    {
        return now >= m_StartDate;
    }

    function hasFinished() public view returns(bool)
    {
        return now >= m_FinishDate;
    }

    function amountOfTickets() public view returns (uint24 amount)
    {
        return m_TicketMap[msg.sender].amount;
    }

    function amountOfRedeemedTickets() public view returns (uint24 amount)
    {
        return m_TicketMap[msg.sender].amountRedeemed;
    }

    function buyTickets(uint24 amount) public
    {
        require(!hasStarted());
        require(m_TicketsLeft >= amount);

        m_Wallet.transferFrom(msg.sender, this, amount*m_Cost);

        m_TicketsLeft -= amount;
        m_TicketMap[msg.sender].amount += amount;
    }

    function sellTickets(uint24 amount) public
    {
        require(!hasStarted());
        require(amountOfTickets() >= amount);

        m_Wallet.transferFrom(this, msg.sender, amount*m_Cost);

        m_TicketsLeft += amount;
        m_TicketMap[msg.sender].amount -= amount;
    }

    function redeemTicket() public
    {
        require(amountOfTickets() >= 1);
        require(isEntranceOpen() || (hasStarted() && !hasFinished()));

        --m_TicketMap[msg.sender].amount;
        ++m_TicketMap[msg.sender].amountRedeemed;
    }

    function releasePayment() public
    {
        require(hasFinished());
        require(isBenefitiary());

        m_Wallet.transferFrom(this, m_BenefitiaryAddress, m_Wallet.balanceOf(this));
    }
}