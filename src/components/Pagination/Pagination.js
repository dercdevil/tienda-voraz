import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#F15A22",
    },
  },
});
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",

    "& nav": {
      marginLeft: "auto",
      marginRight: "auto",
    },

    "& nav ul li button.Mui-selected": {
      color: "#fff",
    },
  },

  button: {
    borderRadius: "50px",
  },

  menuItem: {
    "&:hover": {
      backgroundColor: "#f15a22",
      color: "#fff",
    },
  },
}));

export default function EnhancedPagination({
  pageCount,
  pageIndex,
  gotoPage,
  pageSizeOptions,
  setPageSize,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event, value) => {
    gotoPage(value - 1);
  };

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const renderPageOptions = () => {
    return pageSizeOptions.map((o, index) => (
      <MenuItem
        onClick={() => setPageSize(o)}
        className={classes.menuItem}
        key={index}
      >
        {o}
      </MenuItem>
    ));
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
    <ThemeProvider theme={theme}>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          {renderPageOptions()}
        </Menu>

        <Button
          className={classes.button}
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="outlined"
          color="primary"
          onClick={handleClick}
        >
          8
        </Button>

        <Pagination
          color="primary"
          count={pageCount}
          page={pageIndex + 1}
          onChange={handleChange}
          boundaryCount={2}
          defaultPage={1}
          siblingCount={2}
        />
      </ThemeProvider>
    </div>
  );
}
