import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import type { DeployFunction } from 'hardhat-deploy/dist/types';

import { FuelChainState__factory } from '../../typechain';

const COMMITTER_ADDRESS = '0x2100240626d914AC448525B721D9C5b48b64F674';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers, deployments } = hre;
  const [deployer] = await ethers.getSigners();

  const { address } = await deployments.get('FuelChainState');

  const fuelChainState = FuelChainState__factory.connect(address, deployer);
  const COMMITTER_ROLE = await fuelChainState.COMMITTER_ROLE();

  await fuelChainState
    .grantRole(COMMITTER_ROLE, COMMITTER_ADDRESS)
    .then((tx) => tx.wait());

  console.log('Granted role COMMITTER_ROLE to', COMMITTER_ADDRESS);

  return true;
};

func.tags = ['register_committer'];
func.id = 'register_committer';
export default func;
