import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import { Button } from '@mui/material'

function HeaderComponent() {
  return (
    <AppBar
      position="sticky"
      style={{
        width: '100%',
        backgroundColor: 'blue',
        padding: '12px',
        height: '90px',
        boxShadow: 'none',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 900,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            fewfwef
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <div className="pages headerY" style={{ color: 'black' }}>
              <button
                style={{
                  backgroundColor: 'white',
                  border: 'none',
                  outline: 'none',
                }}
              >
                <b>main</b>
              </button>
            </div>
          </Box>

          <Box className="bet headerY">
            {localStorage.getItem('user') ? (
              <>
                <Button> fwefwf</Button>
                <Button>t('logout')</Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  window.location.href = '/login'
                }}
              >
                flmwef{' '}
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default HeaderComponent
