/**
 * Database class
 */
class UserDto {
  private name: string;
  private score: number;

  constructor(args: any) {
    this.name = args?.name || '';
    this.score = args?.score || '';
  }

  public get getName(): string {
    return this.name;
  }

  public get getScore() {
    return this.score;
  }
}

export default UserDto;
