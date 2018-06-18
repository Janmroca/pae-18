var Wallet = artifacts.require("Wallet.sol");
var EventFactory  = artifacts.require("EventFactory.sol");

const initialAmount = 100000;

module.exports = function(deployer) {
  deployer.deploy(Wallet, initialAmount).then(function()
  {
    return deployer.deploy(EventFactory, Wallet.address);
  });
};
