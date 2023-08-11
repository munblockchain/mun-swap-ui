import { CSS } from '@stitches/react'
import { useTokenBalance } from 'hooks/useTokenBalance'
import { useBaseTokenInfo } from 'hooks/useTokenInfo'
import {
  Button,
  Column,
  Copy,
  CopyTextTooltip,
  formatTokenBalance,
  IconWrapper,
  Logout,
  media,
  styled,
  Text,
  Tooltip,
  Valid,
  Wallet,
  useMedia,
} from 'junoblocks'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { walletState } from 'state/atoms/walletAtoms'

type ConnectedWalletButtonProps = { css?: CSS } & {
  walletName?: string
  onConnect: () => void
  onDisconnect: () => void
  connected: boolean
}

export const ConnectedWalletButton = ({
  onConnect,
  connected,
  onDisconnect,
  walletName,
  ...props
}: ConnectedWalletButtonProps) => {
  const baseToken = useBaseTokenInfo()
  const { balance } = useTokenBalance(baseToken?.symbol)
  const { address } = useRecoilValue(walletState)
  const isMobile = useMedia('sm')

  if (!connected) {
    return (
      <Column css={{ paddingBottom: '0' }}>
        <Button onClick={onConnect} size="large" variant="primary" {...props}>
          {isMobile ? 'Connect' : 'Connect Kelpr'}
        </Button>
      </Column>
    )
  }

  return (
    <ConWalletButton onClick={onDisconnect}>
      <svg
        viewBox="0 0 24 24"
        color="primary"
        width="24px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#1fc7d4"
          d="M17 4C18.5 4 19 4.5 19 6L19 8C20.1046 8 21 8.89543 21 10L21 17C21 19 20 20 17.999 20H6C4 20 3 19 3 17L3 7C3 5.5 4.5 4 6 4L17 4ZM5 7C5 6.44772 5.44772 6 6 6L19 6L19 8L6 8C5.44772 8 5 7.55229 5 7ZM17 16C18 16 19.001 15 19 14C18.999 13 18 12 17 12C16 12 15 13 15 14C15 15 16 16 17 16Z">
        </path>
      </svg>
    </ConWalletButton>
  )

  return (
    <StyledWalletButton {...props} role="button">
      <IconWrapper size="medium" css={{ color: '#FE8D9E' }} icon={<Wallet />} />
      <div data-content="">
        <Text variant="link" color="body">
          {walletName}
        </Text>
        <Text
          variant="legend"
          css={{
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
            backgroundImage:
              'linear-gradient(90.55deg, #FE9C9E 1.35%, #FA2995 19.1%, #EA1EE9 37.37%, #287CF4 58.83%, #4CA7F2 75.84%, #31DAE2 99.52%)',
          }}
        >
          {formatTokenBalance(balance, { includeCommaSeparation: true })}{' '}
          {baseToken?.symbol}
        </Text>
      </div>
      <StyledDivForActions>
        <StyledDivForInlineActions>
          <CopyTextTooltip
            label="Copy wallet address"
            successLabel="Wallet address copied!"
            ariaLabel="Copy wallet address"
            value={address}
          >
            {({ copied, ...bind }) => (
              <Button
                variant="ghost"
                size="small"
                icon={<IconWrapper icon={copied ? <Valid /> : <Copy />} />}
                {...bind}
              />
            )}
          </CopyTextTooltip>
          <Tooltip
            label="Disconnect your wallet"
            aria-label="Disconnect your wallet"
          >
            <Button
              variant="ghost"
              size="small"
              onClick={onDisconnect}
              icon={<IconWrapper icon={<Logout />} />}
            />
          </Tooltip>
        </StyledDivForInlineActions>
      </StyledDivForActions>
    </StyledWalletButton>
  )
}

const StyledDivForActions = styled('div', {
  position: 'absolute',
  right: 0,
  top: 0,
  padding: '0 $6 0 $8',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  background:
    'linear-gradient(to right, $colors$white0 0%, $colors$white95 5%, $colors$white)',
  borderRadius: '$2',
  opacity: 0,
  transition: 'opacity .1s ease-out',
})

const StyledDivForInlineActions = styled('div', {
  display: 'flex',
  columnGap: '$space$2',
})

const StyledWalletButton = styled('div', {
  position: 'relative',
  transition: 'background-color .1s ease-out, border .1s ease-out',
  display: 'flex',
  alignItems: 'center',
  columnGap: '$space$6',
  padding: '$4 $6 $5',
  borderRadius: '$2',
  textAlign: 'left',
  border: '1px solid $borderColors$default',
  '&:hover': {
    border: '1px solid $borderColors$selected',
    [`${StyledDivForActions}`]: {
      opacity: 1,
    },
  },
  [media.sm]: {
    border: '1px solid $borderColors$selected',
    [`${StyledDivForActions}`]: {
      // opacity: 1,
    },
  },
})

const ConWalletButton = styled('button', {
  // backgroundColor: '$backgroundColors$primary',
  display: 'flex',
  alignItems: 'center',

  '& svg': {
    border: '2px solid #1fc7d4',
    borderRadius: '50%',
    backgroundColor: '$backgroundColors$base',
  }
})