module.exports = class UserDto {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phone = user.phone;
    this.activated = user.activated;
    this.activationLink = user.activationLink;
  }
};
