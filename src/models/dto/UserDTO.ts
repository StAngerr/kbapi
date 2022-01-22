import User from "../User.model";

export default class UserDTO {
  email: string;
  firstName: string = "";
  lastName: string = "";

  constructor(user: User) {
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}
