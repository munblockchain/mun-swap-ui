import { AppLayout, PageHeader } from "components"
import {
	Button,
	Divider,
	// Error,
	// IconWrapper,
	Inline,
	styled,
	Text,
	// Toast,
	PlusIcon,
} from 'junoblocks'
import { useState } from "react";
import { useInstantiateContract } from "features/tools/cw20/instantiate/hooks/useInstantiateContract";
import { CW20Coin } from "services/token/types";
import NewTokenCreationSuccessDialog from "../../../features/tools/cw20/instantiate/components/NewTokenCreationSuccessDialog";

const CreateTokenPage = () => {

	const [name, setName] = useState('');
	const [symbol, setSymbol] = useState('');
	const [decimals, setDecimals] = useState('');
	const [initialBalances, setInitialBalances] = useState<CW20Coin[]>([{ address: '', amount: '' }]);

	const [minterAddress, setMinterAddress] = useState('');
	const [cap, setCap] = useState('');
	const [project, setProject] = useState('');
	const [desc, setDesc] = useState('');
	const [marketing, setMarketing] = useState('');
	const [logoUrl, setLogoUrl] = useState('');

	const { mutate: handleInstantiate, isLoading: isExecutingTransaction } = useInstantiateContract({
		name,
		symbol,
		decimals: Number(decimals),
		initialBalances,
		minterAddress,
		cap,
		project,
		desc,
		marketing,
		logoUrl
	})

	const instantiateAvailable = (): boolean => {
		if (isExecutingTransaction)
			return false
		if (name == '' || symbol == '' || decimals == '' || Number(decimals) == 0 || isNaN(Number(decimals)))
			return false
		for (const coin of initialBalances) {
			if (coin.address == '' || coin.amount == '' || isNaN(Number(coin.amount)))
				return false
		}
		return true
	}

	const appendInitialBalance = () => {
		setInitialBalances([...initialBalances, { address: '', amount: '' }])
	}

	const removeInitialBalance = (index: number) => {
		let temp = [...initialBalances]
		temp.splice(index, 1)
		setInitialBalances(temp)
	}

	const setInitialBalancesData = (index: number, field: "address" | "balance", value: string) => {
		let temp = [...initialBalances]
		if (field == "address")
			temp[index].address = value
		else
			temp[index].amount = value

		setInitialBalances(temp)
	}

	const handleSubmit = () => {
		if (!isExecutingTransaction)
			handleInstantiate()
	};

	return (
		<>
			<AppLayout>
				<StyledWrapper>
					<PageHeader
						title="CW20 Base Contract"
						subtitle="CW20 Base is a specification for fungible tokens based on CosmWasm."
					/>

					<Inline css={{ display: 'flex', gap: '$5' }} align="flex-start">
						<Inline align={"flex-start"} css={{ flexDirection: 'column', flex: '4' }}>
							<Text>Contract Details</Text>
							<Text variant="secondary">Basic information about your new contract</Text>
						</Inline>

						<Inline align={"flex-start"} css={{ flexDirection: 'column', flex: '8' }}>
							<Text>Name *</Text>
							<MyInput type="text" value={name} onChange={(e) => setName(e.target.value)} />

							<Text>Symbol *</Text>
							<MyInput type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} />

							<Text>Decimals *</Text>
							<MyInput type="text" value={decimals} onChange={(e) => setDecimals(e.target.value)} />

							<Text>Initial Balances *</Text>
							<Text variant="secondary" css={{ marginBottom: '$5' }}>Enter at least one wallet address and initial balance</Text>

							{initialBalances.map((balance, index) => (
								<Inline key={index} css={{ gap: '$3' }} align="flex-end">
									<Inline style={{ flexDirection: 'column' }} align="flex-start">
										<Text>Wallet Address</Text>
										<MyInput value={balance.address} onChange={e => setInitialBalancesData(index, "address", e.target.value)} />
									</Inline>
									<Inline style={{ flexDirection: 'column' }} align="flex-start">
										<Text>Balance</Text>
										<MyInput value={balance.amount} onChange={e => setInitialBalancesData(index, "balance", e.target.value)} />
									</Inline>

									{(index == initialBalances.length - 1) ?
										<Button variant={"secondary"} css={{ marginBottom: '$5' }} icon={<PlusIcon />} onClick={appendInitialBalance}></Button>
										:
										<Button variant={"secondary"} css={{ marginBottom: '$5' }} onClick={() => removeInitialBalance(index)} >-</Button>
									}
								</Inline>
							))}
						</Inline>
					</Inline>

					<Divider offsetY="$10" />

					<Inline css={{ display: 'flex', gap: '$5' }} align="flex-start">
						<Inline align={"flex-start"} css={{ flexDirection: 'column', flex: '4' }}>
							<Text>Minting Details</Text>
							<Text variant="secondary">Your new contract minting rules</Text>
						</Inline>

						<Inline align={"flex-start"} css={{ flexDirection: 'column', flex: '8' }}>
							<Text>Minter Address</Text>
							<MyInput type="text" value={minterAddress} onChange={(e) => setMinterAddress(e.target.value)} />

							<Text>Cap</Text>
							<MyInput type="text" value={cap} onChange={(e) => setCap(e.target.value)} />
						</Inline>
					</Inline>

					<Divider offsetY="$10" />

					<Inline css={{ display: 'flex', gap: '$5' }} align="flex-start">
						<Inline align={"flex-start"} css={{ flexDirection: 'column', flex: '4' }}>
							<Text>Marketing Details</Text>
							<Text variant="secondary">Public metadata for your new contract</Text>
						</Inline>

						<Inline align="flex-start" css={{ flexDirection: 'column', flex: '8' }}>
							<Text>Project</Text>
							<MyInput type="text" value={project} onChange={(e) => setProject(e.target.value)} />

							<Text>Description</Text>
							<MyInput type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />

							<Text>Wallet Address (marketing)</Text>
							<MyInput type="text" value={marketing} onChange={(e) => setMarketing(e.target.value)} />

							<Text>Logo URL</Text>
							<MyInput type="text" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
						</Inline>
					</Inline>

					<Divider offsetY="$10" />

					<div style={{ textAlign: 'right' }}>
						<Button
							disabled={!instantiateAvailable()}
							css={{ marginLeft: 'auto' }}
							onClick={handleSubmit}
						>
							Instantiate Contract
						</Button>
					</div>

				</StyledWrapper>

				<NewTokenCreationSuccessDialog isShowing={false} address="123" />
			</AppLayout>
		</>
	)
}

const StyledWrapper = styled('section', {
	paddingBottom: '$17',
});

const MyInput = styled('input', {
	border: '1px solid',
	padding: '$3 $5',
	marginBottom: '$5',
	marginTop: '$2',
	borderColor: '$borderColors$default',
	color: '$textColors$primary',
	// borderRadius: '$1',
	fontSize: '14px'
})

export default CreateTokenPage