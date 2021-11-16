
import rows from "../Data.json"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom'


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 5,
    marginTop: theme.spacing(1),
    minWidth: 120,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 15,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));



function Main() {
    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    return (
        <>
        <Button
        id="demo-customized-button"
        aria-controls="demo-customized-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Sort by
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
  
          By ID
        </MenuItem>
 
        <MenuItem onClick={handleClose} disableRipple>
         
          By Project Name
        </MenuItem>
       
        <MenuItem onClick={handleClose} disableRipple>
     
          By Client Sponsor
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
      
          By Client Name
        </MenuItem>
      </StyledMenu>
        <div className="container">
            <div className="innerheader">
            
                <div>
                 <h3>PO/SOW's Information</h3>
                </div>
                <div className="buttondiv">
                    <Link to="/capture_new_SOW"><button className="button1">Capture PO/SOW </button></Link>
                </div>   
            </div>

            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="tablehead">
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Client Name</TableCell>
            <TableCell>Project Name</TableCell>
            <TableCell>PO Number</TableCell>
            <TableCell>PO Amount</TableCell>
            <TableCell>Client Sponsor</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.posts.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell >{row.clientname}</TableCell>
              <TableCell>{row.Projectname}</TableCell>
              <TableCell>{row.PONumber}</TableCell>
              <TableCell>{row.POAmount}</TableCell>
              <TableCell>{row.ClientSponsor}</TableCell>
              {row.status==="rejected"||row.status==="drafted"?
              <TableCell>{row.Action}</TableCell>:<TableCell>Uneditable</TableCell>}
              
              
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            

        </div>
        </>
    )
}

export default Main
