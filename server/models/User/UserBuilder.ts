import User from './User';

/**
 * Builder pattern for User
 */
class UserBuilder {
  private _name: string;
  private _score: number;

  public get name(): string {
    return this._name;
  }

  public get score(): number {
    return this._score;
  }

  public setName(name: string): UserBuilder {
    this._name = name;
    return this;
  }

  public setScore(score: number): UserBuilder {
    this._score = score;
    return this;
  }

  public build(): User {
    return new User(this);
  }
}

export default UserBuilder;