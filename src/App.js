import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import Main from "./components/main.js";
import "./App.css";
import Login from "./components/login.js";
import Register from "./components/register.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: { login: false, register: false },
    };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  closeModal(modal) {
    if (modal === "login") {
      this.setState({ modal: { login: false } });
    } else {
      this.setState({ modal: { register: false } });
    }
  }

  openModal(modal) {
    if (modal === "login") {
      this.setState({ modal: { login: true } });
    } else {
      this.setState({ modal: { register: true } });
    }
  }

  openNav() {
    const sideBar = document.querySelector(".side-nav");
    sideBar.style.transform = "translate3d(0px,0px,0px)";
  }

  closeNav() {
    const sideBar = document.querySelector(".side-nav");
    sideBar.style.transform = "translate3d(400px,0px,0px)";
  }

  openDCat() {
    const navMenuCategories = document.querySelector(".nav-menu-categories");
    navMenuCategories.classList.toggle("active");
  }

  openMCat() {
    const subMenuCategories = document.querySelector(".sub-menu-categories");
    subMenuCategories.classList.toggle("active");
  }

  render() {
    const { login, register } = this.state.modal;
    const { openModal, closeModal } = this;
    return (
      <div className="App">
        <header className="bg-brown">
          <div className="nav-logo">
            <h2 className="bold white">Forum anak IT</h2>
          </div>
          <div className="nav-search">
            <form>
              <input
                type="text"
                placeholder="masukan kata kunci ..."
                className="nav-input-search form-control bg-gray black normal"
                id="navInput-search"
                required
              />
              <button type="submit" className="nav-search-btn">
                <FontAwesomeIcon icon={faSearch} className="black" />
              </button>
            </form>
          </div>
          <nav className="nav-menu-wrapper">
            <ul className="white nav-menu bold">
              <li onClick={this.openDCat}>
                <div>Categories</div>
                <ul className="nav-menu-categories bg-black">
                  <li>Linux</li>
                  <li>Windows</li>
                  <li>MAC OS</li>
                  <li>Android</li>
                  <li>iOS</li>
                </ul>
              </li>

              <li onClick={() => openModal("login")}>
                <div>Login</div>
              </li>
              <li onClick={() => openModal("register")}>
                <div>Register</div>
              </li>
            </ul>
            <button
              className="nav-menu-btn bg-light-gray black"
              onClick={this.openNav}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </nav>
        </header>

        <aside className="side-nav bg-black">
          <button
            className="side-nav-close-btn white bg-red"
            onClick={this.closeNav}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <form className="side-nav-search">
            <input
              type="text"
              name="sidenav-search"
              id="sideNav-search"
              className="form-control side-nav-search-input bg-gray black normal"
              placeholder="Search"
              required
            />
            <button type="submit" className="side-nav-search-btn">
              <FontAwesomeIcon icon={faSearch} className="black" />
            </button>
          </form>
          <nav className="side-nav-menu-wrapper">
            <ul className="side-nav-menu white bold">
              <li>
                <div onClick={this.openMCat}>Categories</div>
                <ul className="sub-menu-categories">
                  <li>Linux</li>
                  <li>Windows</li>
                  <li>MAC OS</li>
                  <li>Android</li>
                  <li>iOS</li>
                </ul>
              </li>

              <li>
                <div onClick={() => openModal("login")}>Login</div>
              </li>

              <li>
                <div onClick={() => openModal("register")}>Register</div>
              </li>
            </ul>
          </nav>
        </aside>

        <Main />

        <Login status={login} closeModal={closeModal} />

        <Register status={register} closeModal={closeModal} />
      </div>
    );
  }
}

export default App;
