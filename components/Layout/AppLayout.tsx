import { media, styled, useMedia } from 'junoblocks'
import { APP_MAX_WIDTH } from 'util/constants'

import { ExtensionSidebar } from './ExtensionSidebar'
import { FooterBar } from './FooterBar'
import { NavigationSidebar } from './NavigationSidebar'

export const AppLayout = ({
  navigationSidebar = <NavigationSidebar />,
  extensionSidebar = <ExtensionSidebar />,
  footerBar = <FooterBar />,
  children,
}) => {
  const isSmallScreen = useMedia('sm')
  const isMediumScreen = useMedia('md')

  if (isSmallScreen) {
    return (
      <StyledWrapperForMobile>
        <StyledContainerForMobile>
          {navigationSidebar}

          <main data-content="">{children}</main>
        </StyledContainerForMobile>

        <StyledContainerForMobile>
          <div data-content="">{footerBar}</div>
        </StyledContainerForMobile>
      </StyledWrapperForMobile>
    )
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      {navigationSidebar}
      <StyledWrapper>

        <StyledContainer>
          <main>{children}</main>
        </StyledContainer>

        {!isMediumScreen && extensionSidebar}
      </StyledWrapper>
    </div>
  )
}

const StyledWrapper = styled('div', {
  flex: 1,
  display: 'grid',
  minHeight: 'calc(100vh - 80px)',
  gridTemplateColumns: '1fr 16.5rem',
  backgroundColor: '$backgroundColors$base',
  maxWidth: APP_MAX_WIDTH,
  width: '100%',
  margin: '0 auto',
  [media.md]: {
    gridTemplateColumns: '1fr',
  },
})

const StyledContainer = styled('div', {
  position: 'relative',
  zIndex: '$2',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '0 $12 $20 $12',
  '& main': {
    margin: '0 auto',
    width: '100%',
    maxWidth: '69.5rem',
  },
  [media.sm]: {
    zIndex: '$1',
  },
})

const StyledWrapperForMobile = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '100vh',
  backgroundColor: '$backgroundColors$base',
})

const StyledContainerForMobile = styled('div', {
  position: 'relative',
  zIndex: '$1',
  '& [data-content]': {
    margin: '0 auto',
    width: '100%',
    padding: '0 $12',
  },
})
