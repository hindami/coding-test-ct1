import React, { Component } from "react";
import Comments from "./comments";
import "./main.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { fields: {}, errors: {}, border: {}, data: [] };
    this.fetchData = this.fetchData.bind(this);
    this.incrementPoint = this.incrementPoint.bind(this);
    this.decrementPoint = this.decrementPoint.bind(this);
    this.editData = this.editData.bind(this);
  }

  editData(x, index) {
    fetch(`http://localhost:3004/posts/${index}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(x),
    });
  }

  incrementPoint(id, idRep) {
    const { data } = this.state;
    let index = data
      .map((x) => {
        return x.id;
      })
      .indexOf(id);

    let indexReplies = data[index].replies
      .map((x) => {
        return x.id;
      })
      .indexOf(idRep);

    if (idRep === undefined) {
      data[index].point += 1;
      this.editData(data[index], data[index].id);
    } else {
      data[index].replies[indexReplies].point += 1;
      this.editData(data[index], data[index].id);
    }

    this.fetchData();
  }

  decrementPoint(id, idRep) {
    const { data } = this.state;
    let index = data
      .map((x) => {
        return x.id;
      })
      .indexOf(id);

    let indexReplies = data[index].replies
      .map((x) => {
        return x.id;
      })
      .indexOf(idRep);

    if (idRep === undefined) {
      data[index].point -= 1;
      this.editData(data[index], data[index].id);
    } else {
      data[index].replies[indexReplies].point -= 1;
      this.editData(data[index], data[index].id);
    }
    this.fetchData();
  }

  fetchData() {
    fetch("http://localhost:3004/posts")
      .then((res) => res.json())
      .then((res) => {
        this.setState({ data: res });
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  fieldValidation() {
    let fields = this.state.fields;
    let errors = {};
    let border = {};
    let formIsValid = true;

    //Name
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

    //Email
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

    //Komentar
    if (!fields["komentar"]) {
      formIsValid = false;
      errors["komentar"] = "Wajib diisi";
      border["komentar"] = "error";
    } else {
      border["komentar"] = "success";
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

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  resetFields() {
    const fields = document.querySelectorAll(".main-comment-field");
    fields.forEach((e, i) => {
      fields[i].value = "";
    });
  }

  render() {
    return (
      <main>
        <div className="main-section">
          <article className="main-article">
            <h1 className="bold black title">
              Lampu webcam tiba-tiba menyala sendiri tanpa membuka aplikasi
              webcam
            </h1>
            <br />
            <p className="black article">
              Mau tanya, akhir-akhir ini webcam sering nyala sendiri. Apakah ada
              yang tahu penyebabnya dan solusi untuk memperbaiki hal itu? Apakah
              ada kemungkinan laptop saya di-hack karena kasus terjadi tiap
              terkoneksi internet.
            </p>
          </article>

          <br />

          <div className="comment-title">
            <h2 className="bold black">Komentar</h2>
            <div className="comment-line bg-gray"></div>
          </div>

          <br />

          {this.state.data.map((item, index) => (
            <Comments
              className="d-none"
              id={item.id}
              author={item.author}
              avatar={item.avatar}
              date={item.date}
              message={item.message}
              point={item.point}
              replies={item.replies}
              incrementPointPost={this.incrementPoint}
              decrementPointPost={this.decrementPoint}
            />
          ))}

          {/* <Comments
            data={this.state.data}
            increment={this.incrementPoint}
            decrement={this.decrementPoint}
          /> */}

          <br />
          <div className="comment-title">
            <h2 className="bold black title-tambah">Tambahkan Komentar</h2>
            <div className="comment-line tambahkan-komentar bg-gray "></div>
          </div>

          <br />

          <form
            name="tambahkomentar"
            onSubmit={this.submitForm.bind(this)}
            className="form-comment"
          >
            <input
              type="text"
              name="nama"
              className="input-comment form-control  normal main-comment-field"
              placeholder="Nama"
              id="tambah-nama"
              style={{
                border:
                  this.state.border["email"] === "success"
                    ? "1px solid green"
                    : this.state.border["email"] === "error"
                    ? "1px solid red"
                    : "1px solid #333333",
                marginBottom: "10px",
              }}
              onChange={this.handleChange.bind(this, "name")}
              value={this.state.fields["name"]}
            />
            <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
            <input
              type="email"
              name="email"
              className="input-comment form-control normal main-comment-field"
              placeholder="Email"
              id="tambah-email"
              style={{
                border:
                  this.state.border["email"] === "success"
                    ? "1px solid green"
                    : this.state.border["email"] === "error"
                    ? "1px solid red"
                    : "1px solid #333333",
                marginBottom: "10px",
              }}
              onChange={this.handleChange.bind(this, "email")}
              value={this.state.fields["email"]}
            />
            <span style={{ color: "red" }}>{this.state.errors["email"]}</span>

            <textarea
              name="komentar"
              id="tambah-komentar"
              cols="1"
              rows="10"
              placeholder="Komentar Anda"
              className="text-area-comment normal main-comment-field"
              style={{
                border:
                  this.state.border["email"] === "success"
                    ? "1px solid green"
                    : this.state.border["email"] === "error"
                    ? "1px solid red"
                    : "1px solid #333333",
                marginBottom: "10px",
              }}
              onChange={this.handleChange.bind(this, "komentar")}
              value={this.state.fields["komentar"]}
            ></textarea>
            <span style={{ color: "red" }}>
              {this.state.errors["komentar"]}
            </span>

            <div className="button-group">
              <button
                type="button"
                className="submit-btn bold black bg-gray"
                onClick={this.resetFields}
              >
                Reset
              </button>
              <button
                type="submit"
                className="submit-btn bold bg-dark-brown white"
                value="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <aside className="aside-section">
          <h2 className="bold black diskusi-5-teratas-title ">
            Diskusi 5 Teratas
          </h2>
          <ul className="diskusi-5-teratas black">
            <li>
              <span className="kotak bg-dark-brown white">1</span>
              <p>Bersihkan laptop dari butiran debu</p>
            </li>
            <li>
              <span className="kotak bg-dark-brown white">2</span>
              <p>Cara akses website dengan koneksi openVPN</p>
            </li>
            <li>
              <span className="kotak bg-dark-brown white">3</span>
              <p>Batas aman overclock PC rakitan</p>
            </li>
            <li>
              <span className="kotak bg-dark-brown white">4</span>
              <p>Cara mengetahui akun facebook di-hack melalui aplikasi</p>
            </li>
            <li>
              <span className="kotak bg-dark-brown white">5</span>
              <p>Tutorial: langkah-langkah mencegah website untuk track user</p>
            </li>
          </ul>
        </aside>
      </main>
    );
  }
}

export default Main;
