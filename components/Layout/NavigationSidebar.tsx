import { useConnectWallet } from 'hooks/useConnectWallet'
import { Logo, LogoText } from 'icons'
import {
  AddressIcon,
  ArrowUpIcon,
  Button,
  // ChevronIcon,
  // Column,
  Discord,
  // Divider,
  // FeedbackIcon,
  // Github,
  IconWrapper,
  Inline,
  media,
  MoonIcon,
  Open,
  // SharesIcon,
  styled,
  Telegram,
  Text,
  ToggleSwitch,
  // TreasuryIcon,
  Twitter,
  // UnionIcon,
  // UpRightArrow,
  useControlTheme,
  useMedia,
} from 'junoblocks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { walletState, WalletStatusType } from 'state/atoms/walletAtoms'
import { __TEST_MODE__ } from 'util/constants'
import { useBaseTokenInfo } from 'hooks/useTokenInfo'
import { useTokenBalance } from 'hooks/useTokenBalance'

import { ConnectedWalletButton } from '../ConnectedWalletButton'

// type NavigationSidebarProps = {
//   shouldRenderBackButton?: boolean
//   backButton?: ReactNode
// }

const LinksMenuData = [
  { name: 'Website', to: 'https://mun.money', icon: <Open /> },
  { name: 'Wallet', to: 'https://wallet.mun.money', icon: <Open /> },
  { name: 'Faucet', to: 'https://faucet.mun.money', icon: <Open /> },
  { name: 'Explorer', to: 'https://blockexplorer.mun.money', icon: <Open /> },
  { name: 'Discord', to: process.env.NEXT_PUBLIC_DISCORD_LINK, icon: <Discord /> },
  { name: 'Telegram', to: process.env.NEXT_PUBLIC_TELEGRAM_LINK, icon: <Telegram /> },
  { name: 'Twitter', to: process.env.NEXT_PUBLIC_TWITTER_LINK, icon: <Twitter /> },
]

const ToolsMenuData = [
  { name: 'Create New Token', to: '/tools/token/create', icon: <AddressIcon /> },
];

export function NavigationSidebar() {
  const { mutate: connectWallet } = useConnectWallet()
  const [{ key }, setWalletState] = useRecoilState(walletState)
  const baseToken = useBaseTokenInfo();
  const { balance } = useTokenBalance(baseToken?.symbol)

  const themeController = useControlTheme()

  const isMobile = useMedia('sm')
  // const [isOpen, setOpen] = useState(false)
  const [showLinksMenu, setShowLinksMenu] = useState(false)
  const [showToolsMenu, setShowToolsMenu] = useState(false)

  function resetWalletConnection() {
    setWalletState({
      status: WalletStatusType.idle,
      address: '',
      key: null,
      client: null,
    })
  }

  const walletButton = (
    <ConnectedWalletButton
      connected={Boolean(key?.name)}
      walletName={key?.name}
      onConnect={() => connectWallet(null)}
      onDisconnect={resetWalletConnection}
      css={{
        // marginBottom: '$8',
        backgroundColor: '#AD61D8',
        '&:hover': {
          backgroundColor: '#BD71E8'
        }
      }}
    />
  )

  const { pathname } = useRouter()
  const getIsLinkActive = (path) => pathname === path
  const getIsLinkInclude = (path) => pathname.indexOf(path) === 0

  const LinksMenu = (
    <>
      {LinksMenuData.map((menu, index) => (

        <Link href={menu.to} passHref key={index} target="_blank">
          <Button
            as="a"
            variant="menu"
            size="large"
            iconLeft={<IconWrapper icon={menu.icon} />}
          >
            {menu.name}
          </Button>
        </Link>
      ))}
    </>
  )

  const ToolsMenu = (
    <>
      {ToolsMenuData.map((menu, index) => (

        <Link href={menu.to} passHref key={index}>
          <Button
            as="a"
            variant="menu"
            size="large"
            iconLeft={<IconWrapper icon={menu.icon} />}
          >
            {menu.name}
          </Button>
        </Link>
      ))}
    </>
  )

  const menuLinks = (
    <StyledListForLinks>
      <Link href="/" passHref>
        <Button
          as="a"
          variant="menu"
          size="large"
          iconLeft={<AddressIcon />}
          selected={getIsLinkActive('/')}
        >
          Swap
        </Button>
      </Link>
      <Link href="/transfer" passHref>
        <Button
          as="a"
          variant="menu"
          size="large"
          iconLeft={<ArrowUpIcon />}
          selected={getIsLinkActive('/transfer')}
        >
          Transfer
        </Button>
      </Link>
      <Link href="/pools" passHref>
        <Button
          as="a"
          variant="menu"
          size="large"
          iconLeft={<IconWrapper icon={<Open />} />}
          selected={getIsLinkActive('/pools')}
        >
          Liquidity
        </Button>
      </Link>
      <Button
        as="button"
        variant="menu"
        size="large"
        iconLeft={<IconWrapper icon={<AddressIcon />} />}
        onClick={() => {
          setShowToolsMenu(!showToolsMenu);
        }}
        selected={getIsLinkInclude('/tools')}
        style={{ position: 'relative' }}
      >
        Tools
        {showToolsMenu && (isMobile ?
          <StyledLinksMenu>
            {ToolsMenu}
          </StyledLinksMenu> :
          <StyledLinksMenuDesktop>
            {ToolsMenu}
          </StyledLinksMenuDesktop>)
        }
      </Button>
      {/* <Divider offsetY="$8" /> */}
      <Button
        as="button"
        // target="__blank"
        variant="menu"
        size="large"
        // iconLeft={<TreasuryIcon />}
        iconLeft={<IconWrapper icon={<AddressIcon />} />}
        onClick={() => {
          setShowLinksMenu(!showLinksMenu);
        }}
        style={{ position: 'relative' }}
      >
        Links
        {showLinksMenu && (isMobile ?
          <StyledLinksMenu>
            {LinksMenu}
          </StyledLinksMenu> :
          <StyledLinksMenuDesktop>
            {LinksMenu}
          </StyledLinksMenuDesktop>)
        }
      </Button>
    </StyledListForLinks>
  )

  if (isMobile) {

    return (
      <StyledWrapperForMobile>
        <Inline align="center" justifyContent="space-between">
          <Link href="/" passHref>
            <StyledDivForLogo as="a">
              <Logo data-logo="" width="37px" height="47px" />
            </StyledDivForLogo>
          </Link>
          <div style={{
            display: 'flex',
            gap: '10px'
          }}>
            <Button
              iconLeft={<MoonIcon />}
              variant="ghost"
              size="small"
              onClick={(e) => {
                if (e.target !== document.querySelector('#theme-toggle')) {
                  themeController.toggle()
                }
              }}
              iconRight={
                <ToggleSwitch
                  id="theme-toggle"
                  name="dark-theme"
                  onChange={themeController.setDarkTheme}
                  checked={themeController.theme.name === 'dark'}
                  optionLabels={['Dark theme', 'Light theme']}
                />
              }
            >
            </Button>

            <Button
              as="a"
              href="https://mun.money"
              target="__blank"
              icon={
                <IconWrapper
                  icon={
                    <img src="/icons8-home-48.png"
                      width={20}
                      height={20} />}
                />
              }
              variant="ghost"
              size="medium"
              css={buttonIconCss}
            />
            {walletButton}
          </div>
        </Inline>
        <Inline align="center" justifyContent="space-between" css={{
          marginTop: '$4',
        }}>
          {menuLinks}
        </Inline>
      </StyledWrapperForMobile>
    )
  }

  return (
    <StyledWrapper>
      <StyledMenuContainer>
        <Link href="/" passHref>
          <StyledDivForLogo as="a">
            <Logo data-logo="" width="37px" height="47px" />
            <div data-logo-label="">
              <Text
                variant="caption"
                color="error"
                css={{ padding: '0 0 $1 0' }}
              >
                {__TEST_MODE__ ? 'Testnet' : 'Mainnet'}
              </Text>
              <LogoText />
            </div>
          </StyledDivForLogo>
        </Link>

        {/* {walletButton} */}
        {menuLinks}
      </StyledMenuContainer>

      <StyledDivForRightMenu>
        {key &&
          <Text css={{ display: 'flex', alignItems: 'center', gap: '$2' }}>
            <img src="/logo.png" width="20" height="20" />
            {balance}</Text>
        }
        <Inline css={{ display: 'flex', gap: '$5' }}>

          <Button
            iconLeft={<MoonIcon />}
            variant="ghost"
            size="large"
            onClick={(e) => {
              if (e.target !== document.querySelector('#theme-toggle')) {
                themeController.toggle()
              }
            }}
            iconRight={
              <ToggleSwitch
                id="theme-toggle"
                name="dark-theme"
                onChange={themeController.setDarkTheme}
                checked={themeController.theme.name === 'dark'}
                optionLabels={['Dark theme', 'Light theme']}
              />
            }
          >
            Dark mode
          </Button>

          <Button
            as="a"
            href="https://mun.money"
            target="__blank"
            icon={
              <IconWrapper
                icon={
                  <img src="/icons8-home-48.png"
                    width={20}
                    height={20} />}
              />
            }
            variant="ghost"
            size="medium"
            css={buttonIconCss}
          />
        </Inline>

        {walletButton}
      </StyledDivForRightMenu>
    </StyledWrapper>
  )
}

const StyledWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '0 $8',
  backgroundColor: '$backgroundColors$base',
  // overflow: 'auto',
  borderBottom: '1px solid $borderColors$inactive',
  // position: 'sticky',
  top: 0,
  left: 0,
  width: '100%',
  height: '80px',
  // maxHeight: '100vh',
  zIndex: 2,
})

const StyledWrapperForMobile = styled('div', {
  display: 'block',
  position: 'sticky',
  left: 0,
  top: 0,
  padding: '$10 $12',
  backgroundColor: '$backgroundColors$base',
  zIndex: '$3',
})

const StyledMenuContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  position: 'relative',
  zIndex: '$2',
  padding: '$10 0',
  gap: '$10',
})

const StyledListForLinks = styled('div', {
  display: 'flex',
  gap: '$space$2',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  // overflowX: 'auto',

  '&::-webkit-scrollbar': {
    height: '0',
  }
})

const StyledDivForLogo = styled('div', {
  display: 'grid',
  gridTemplateColumns: '37px 1fr',
  columnGap: '$space$4',
  alignItems: 'center',
  paddingBottom: '$8',

  '& [data-logo]': {
    marginBottom: '$2',
  },
  '& svg': {
    color: '$colors$black',
  },

  [media.sm]: {
    paddingBottom: 0,
  },

  variants: {
    size: {
      small: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& [data-logo]': {
          marginBottom: 0,
        },
      },
    },
  },
})

const buttonIconCss = {
  '& svg': {
    color: '$iconColors$tertiary',
  },
}

const StyledDivForRightMenu = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  padding: '$10 0',
  gap: '$5',
});

const StyledLinksMenu = styled('div', {
  // display: 'none',
  position: 'absolute',
  top: '100%',
  right: '$1',
  backgroundColor: '$colors$light',
});

const StyledLinksMenuDesktop = styled('div', {
  // display: 'none',
  position: 'absolute',
  top: '100%',
  right: '$1',
  backgroundColor: '$colors$light',
});