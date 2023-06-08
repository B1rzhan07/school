import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from 'react-router-dom'

function HeaderComponent() {
  const log = localStorage.getItem('log')
  log && console.log('log', JSON.parse(log))
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  )
  console.log('anchorElNav', anchorElNav)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const navigate = useNavigate()

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
    navigate('/stepper')
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position="static">
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
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Login
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Stepper
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            {log && (
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <>
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography textAlign="center">
                      {JSON.parse(log).role === 'ROLE_ADMIN'
                        ? 'Admin'
                        : log && JSON.parse(log).role === 'ROLE_COMMISSION'
                        ? 'Teacher'
                        : 'Student'}
                    </Typography>
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      localStorage.removeItem('log')
                      window.location.reload()
                    }}
                  >
                    Logout
                  </MenuItem>
                </>
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default HeaderComponent
