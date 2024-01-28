class User {
  constructor(id, name, email) {
    this._id = id;
    this._name = name;
    this._email = email;
  }

  getId() {
    return this._id;
  }

  setId(id) {
    this._id = id;
  }

  getName() {
    return this._name;
  }

  setName(name) {
    this._name = name;
  }

  getEmail() {
    return this._email;
  }

  setEmail(email) {
    this._email = email;
  }
}

module.exports = User;
