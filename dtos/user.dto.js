module.exports = class UserDto {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.activated = user.activated;
    this.activationLink = user.activationLink;
  }
};
