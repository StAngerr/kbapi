import User from "../User.model";

export default class UserDTO {
  id: number;
  email: string;
  firstName: string = "";
  lastName: string = "";

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}
