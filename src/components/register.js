import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
      border: {},
    };
    this.submitForm = this.submitForm.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  fieldValidation() {
    let fields = this.state.fields;
    let errors = {};
    let border = {};
    let formIsValid = true;

    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Wajib diisi";
      border["name"] = "error";
    } else {
      border["name"] = "success";
    }

    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["name"] = "Hanya huruf";
        border["name"] = "error";
      } else {
        border["name"] = "success";
      }
    }

    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Wajib diisi";
      border["email"] = "error";
    } else {
      border["email"] = "success";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Email tidak valid";
      } else {
        border["email"] = "success";
      }
    }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "Wajib diisi";
      border["password"] = "error";
    } else {
      border["password"] = "success";
    }

    this.setState({ errors: errors });
    this.setState({ border: border });
    return formIsValid;
  }

  submitForm(e) {
    e.preventDefault();

    if (this.fieldValidation()) {
      console.log("form-submitted");
    } else {
      console.log("form-error");
    }
  }

  // handleChange(field, e) {
  //   let fields = this.state.fields;
  //   fields[field] = e.target.value;
  //   this.setState({ fields });
  // }

  render() {
    const { status, closeModal } = this.props;
    const { border, errors, fields } = this.state;
    return (
      <div
        className={
          status ? "register-form overlay active" : "register-form overlay"
        }
      >
        <div className="card">
          <button
            className="card-close-btn bg-red white"
            onClick={() => closeModal("register")}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="card-body bg-white">
            <h2 className="black form-title">Register</h2>
            <form
              name="registerForm"
              action=""
              className="login-input-group w-100"
              onSubmit={this.submitForm}
            >
              <div className="input-group w-100">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="registername"
                  id="register-name"
                  className="form-control w-100 normal"
                  style={{
                    border:
                      border["name"] === "success"
                        ? "1px solid green"
                        : border["name"] === "error"
                        ? "1px solid red"
                        : "1px solid #333333",
                  }}
                />
                <span style={{ color: "red" }}>{errors["name"]}</span>
              </div>
              <div className="input-group w-100">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="registeremail"
                  id="register-email"
                  className="form-control w-100 normal"
                  style={{
                    border:
                      border["email"] === "success"
                        ? "1px solid green"
                        : border["email"] === "error"
                        ? "1px solid red"
                        : "1px solid #333333",
                  }}
                />
                <span style={{ color: "red" }}>{errors["email"]}</span>
              </div>
              <div className="input-group w-100">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="registerpassword"
                  id="register-password"
                  className="form-control w-100 normal"
                  style={{
                    border:
                      border["password"] === "success"
                        ? "1px solid green"
                        : border["password"] === "error"
                        ? "1px solid red"
                        : "1px solid #333333",
                  }}
                />
                <span style={{ color: "red" }}>{errors["password"]}</span>
              </div>
              <button
                type="submit"
                className="submit-btn white bg-dark-brown bold"
                value="submit"
              >
                Create account
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
