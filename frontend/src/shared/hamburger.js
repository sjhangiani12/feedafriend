import React from 'react';
import logo from "../static/FAF.svg";
import {
  Link
} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';

/* App.jsx */
export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    }
  }

  handleMenuClick() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  handleLinkClick(goTo) {
    this.setState({ menuOpen: false });
    
  }

  render() {
    const styles =
    {
      container: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: '99',
        opacity: 0.9,
        display: 'flex',
        alignItems: 'baseline',
        background: 'white',
        width: '100%',
        color: 'black',
        height: "7vh",
        fontFamily: 'Lobster',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "90px",
        marginLeft: "5%"

      },
      logo: {
        margin: '0 auto',
      },
      body: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        filter: this.state.menuOpen ? 'blur(2px)' : null,
        transition: 'filter 0.5s ease',
      },
    }

    const forLogo = {
      "color": "black",
      "font-family": "sans-serif",
      "text-decoration": "none",

      "&:hover": {
        textDecoration: "underline"
      },
      "position": "relative",
      "left": "10%",

    }
    const menu = ['Home', 'FAQ', 'About us', 'Receive a meal', 'Donate']
    const to = {0: "/", 1: "/faq", 2: "/about_us", 3: "/receive", 4: "/donate"}
    const menuItems = menu.map((val, index) => {
      return (
        <a href={to[index]}>
          <MenuItem
            key={index}
            delay={`${index * 0.1}s`}
            onClick={() => { this.handleLinkClick(index); }}><Link style={{ color: "inherit" }} to={to[index]}>{val}</Link></MenuItem>
        </a>)

    });
  
    return (
      <div>
        <div style={styles.container}>
          <a onClick={() => this.handleMenuClick()}><Link to="/" style={{ position: "relative", left: "5%" }} ><img style={{ width: "80%" }} src={logo} alt="logo" /></Link></a>
          <MenuButton open={this.state.menuOpen} onClick={() => this.handleMenuClick()} color='black' />

        </div>
        <Menu open={this.state.menuOpen}>
          {menuItems}
        </Menu>
      </div>
    )
  }
}

/* MenuItem.jsx*/
class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    }
  }

  handleHover() {
    this.setState({ hover: !this.state.hover });
  }

  render() {
    const styles = {
      container: {
        opacity: 0,
        animation: '1s appear forwards',
        animationDelay: this.props.delay,
      },
      menuItem: {
        fontFamily: `'Open Sans', sans-serif`,
        fontSize: '2rem',
        padding: '1rem 0',
        margin: '0 5%',
        cursor: 'pointer',
        color: this.state.hover ? 'black' : 'black',
        transition: 'color 0.2s ease-in-out',
        animation: '0.5s slideIn forwards',
        animationDelay: this.props.delay,

      },
      line: {
        width: '90%',
        height: '1px',
        background: 'gray',
        margin: '0 auto',
        animation: '0.5s shrink forwards',
        animationDelay: this.props.delay,

      }
    }
    return (
      <div style={styles.container}>
        <div
          style={styles.menuItem}
          onMouseEnter={() => { this.handleHover(); }}
          onMouseLeave={() => { this.handleHover(); }}
          onClick={this.props.onClick}
        >
          {this.props.children}
        </div>
        <div style={styles.line} />
      </div>
    )
  }
}

/* Menu.jsx */
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open ? this.props.open : false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.open) {
      this.setState({ open: nextProps.open });
    }
  }

  render() {
    const styles = {
      container: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: this.state.open ? '100%' : 0,
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
        opacity: 0.95,
        color: '#fafafa',
        transition: 'height 0.3s ease',
        zIndex: 2,
        marginTop: "10%"
      },
      menuList: {
        paddingTop: '3rem',
      }
    }
    return (
      <div style={styles.container}>
        {
          this.state.open ?
            <div style={styles.menuList}>
              {this.props.children}
            </div> : null
        }
      </div>
    )
  }
}

/* MenuButton.jsx */
class MenuButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open ? this.props.open : false,
      color: this.props.color ? this.props.color : 'black',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.open) {
      this.setState({ open: nextProps.open });
    }
  }

  handleClick() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const styles = {
      container: {
        right: "0",
        position: "absolute",
        height: 'auto',
        width: '10%',
        marginTop: "1%",
        marginBottom: "1%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '4px',
      },
      line: {
        height: '3px',
        width: '30px',
        background: this.state.color,
        transition: 'all 0.2s ease',
      },
      lineTop: {
        transform: this.state.open ? 'rotate(32.5deg)' : 'none',
        transformOrigin: 'top left',
        marginBottom: '5px',
      },
      lineMiddle: {
        opacity: this.state.open ? 0 : 1,
        transform: this.state.open ? 'translateX(-16px)' : 'none',
      },
      lineBottom: {
        transform: this.state.open ? 'translateX(-1px) rotate(-32.5deg)' : 'none',
        transformOrigin: 'top left',
        marginTop: '5px',
      },
    }
    return (
      <div style={styles.container}
        onClick={this.props.onClick ? this.props.onClick :
          () => { this.handleClick(); }}>
        <div style={{ ...styles.line, ...styles.lineTop }} />
        <div style={{ ...styles.line, ...styles.lineMiddle }} />
        <div style={{ ...styles.line, ...styles.lineBottom }} />
      </div>
    )
  }
}


