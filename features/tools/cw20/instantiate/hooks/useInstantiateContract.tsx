import { useMutation } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { walletState, WalletStatusType } from "state/atoms/walletAtoms";
import { instantiateCW20Contract } from "services/token/instantiateCW20Contract";
import { TransactionStatus, transactionStatusState } from "state/atoms/transactionAtoms";
import { CW20BaseInstantiateMsg, CW20Coin } from "services/token/types";
import { Button, ErrorIcon, formatSdkErrorMessage, IconWrapper, Toast, UpRightArrow, Valid } from "junoblocks";
import toast from "react-hot-toast";

type UseInstantiateContractArgs = {
	name: string;
	symbol: string;
	decimals: number;
	initialBalances: CW20Coin[];
	minterAddress: string;
	cap: string;
	project: string;
	desc: string;
	marketing: string;
	logoUrl: string;
};

export const useInstantiateContract = ({
	name,
	symbol,
	decimals,
	initialBalances,
	minterAddress,
	cap,
	project,
	desc,
	marketing,
	logoUrl,
}: UseInstantiateContractArgs) => {

	const { client, address: senderAddress, status } = useRecoilValue(walletState)
	const setTransactionState = useSetRecoilState(transactionStatusState)

	return useMutation(
		'instantiateContract',
		async () => {

			if (status !== WalletStatusType.connected) {
				throw new Error('Please connect your wallet.')
			}

			setTransactionState(TransactionStatus.EXECUTING)

			const initMsg: CW20BaseInstantiateMsg = {
				name,
				symbol,
				decimals,
				initial_balances: initialBalances,
				...(minterAddress != '' && {
					mint: {
						minter: minterAddress,
						cap
					}
				}),
				...(project != '' && {
					marketing: {
						project: project,
						description: desc,
						logo: logoUrl,
						marketing: marketing,
					}
				})
			};

			return await instantiateCW20Contract({
				msg: initMsg,
				senderAddress,
				client,
			})
		},
		{
			onSuccess({ contractAddress }) {
				console.log('success address:', contractAddress)
				toast.custom((t) => (
					<Toast
						icon={<IconWrapper icon={<Valid />} color="primary" />}
						title="New token has created"
						body={`Contract Address: ${contractAddress}`}
						onClose={() => toast.dismiss(t.id)}
					/>
				))

				// setTokenSwap(([tokenA, tokenB]) => [
				// 	{
				// 		...tokenA,
				// 		amount: 0,
				// 	},
				// 	tokenB,
				// ])

				// refetchQueries()
			},
			onError(e) {
				const errorMessage = formatSdkErrorMessage(e)

				toast.custom((t) => (
					<Toast
						icon={<ErrorIcon color="error" />}
						title="Oops CW20 instantiate error!"
						body={errorMessage}
						buttons={
							<Button
								as="a"
								variant="ghost"
								href={process.env.NEXT_PUBLIC_FEEDBACK_LINK}
								target="__blank"
								iconRight={<UpRightArrow />}
							>
								Provide feedback
							</Button>
						}
						onClose={() => toast.dismiss(t.id)}
					/>
				))
			},
			onSettled() {
				setTransactionState(TransactionStatus.IDLE)
			},
		}
	)
};