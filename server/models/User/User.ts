import UserBuilder from './UserBuilder';

/**
 * User-object for 'end users'
 */
class User {
  private name: string;
  private score: number;

  constructor(builder: UserBuilder) {
    this.name = builder.name;
    this.score = builder.score;
  }
}

export default User;
