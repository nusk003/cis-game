import { CognitoUser } from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";

export type User = CognitoUser & {
  attributes: { name: string; email: string };
};

export class UserService {
  static userService: UserService | undefined;
  _auth = Auth;
  private currentUser: CognitoUser | undefined;

  private constructor() {}

  static get instance() {
    if (!this.userService) {
      this.userService = new UserService();
    }
    return this.userService;
  }

  async getCurrentUser() {
    if (!this.currentUser) {
      this.currentUser = await this._auth.currentAuthenticatedUser();
    }

    return this.currentUser;
  }

  async updateUser(name: string, email: string) {
    const currentUser = await this.getCurrentUser();
    currentUser?.updateAttributes(
      [
        { Name: "name", Value: name },
        { Name: "email", Value: email },
      ],
      async (err, res) => {
        if (!err) this.currentUser = await this.getCurrentUser();
        else console.error(err);
      }
    );
  }

  async login(email: string, password: string) {
    const user = await this._auth.signIn({ username: email, password });
    this.currentUser = user;
  }

  async logout() {
    await this._auth.signOut();
    this.currentUser = undefined;
  }

  async registerUser(name: string, email: string, password: string) {
    const { user } = await this._auth.signUp({
      username: email,
      password,
      attributes: { name },
    });

    this.currentUser = user;
  }

  async verifyUser(code: string, callback: () => void) {
    if (!this.currentUser) {
      throw new Error("User doesn't exist");
    }

    this.currentUser.confirmRegistration(code, true, (err, result) => {
      if (!err && result === "SUCCESS") {
        callback();
      }
    });
  }
}
