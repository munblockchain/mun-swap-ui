import {
	// MsgExecuteContractEncodeObject,
	SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'
import { DEFAULT_CW20_CODE_ID, __POOL_STAKING_ENABLED__ } from 'util/constants';
import { CW20BaseInstantiateMsg } from './types';

type InstantiateCW20ContractArgs = {
	msg: CW20BaseInstantiateMsg;
	senderAddress: string;
	client: SigningCosmWasmClient;
};

export const instantiateCW20Contract = async ({ 
	msg: initMsg,
	senderAddress,
	client,
}: InstantiateCW20ContractArgs) => {

	// const initMsg = msg
	const codeId = Number(DEFAULT_CW20_CODE_ID)
	const label = 'MunSwap-CW20-Label'

	return await client.instantiate(senderAddress, codeId, initMsg, label, "auto")
};