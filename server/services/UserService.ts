import Service from './Service';
import User from '../models/User/User';
import UserBuilder from '../models/User/UserBuilder';
import UserDto from '../models/User/UserDto';
import UserRepository from '../repositories/UserRepository';
import { BadRequestError } from '../core/apiError';

/**
 * User service, to add highscore and get a list of it
 */
class UserService implements Service<User> {
  private readonly _repository: UserRepository;
  private readonly _nameRegExp = new RegExp('^\\w+$', 'g');

  constructor() {
    this._repository = new UserRepository();
  }

  /**
   * Get list of highscores
   */
  async getList(): Promise<User[]> {
    const list = await this._repository.getList();

    return list.map((userDto: UserDto) => UserService.convertToUser(userDto));
  }

  /**
   * Create highscore
   * @param name Is the name of the player
   * @param score Is the score that he player got
   */
  async create(name: string, score: number): Promise<User> {
    const highscore = Number.parseInt(score.toString());
    
    if (!Number.isInteger(highscore)) {
      throw new BadRequestError(`Value ${score} is not a number`);
    }
    
    if (!name || name.length > 3 || !this._nameRegExp.test(name)) {
        throw new BadRequestError(`The name need to contain letters and digits (between 1-3 characters).`);    
    }

    const user = await this._repository.create(UserService.convertToUserDto(name, score))
    return UserService.convertToUser(user);
  }

  /**
   * Converts variables to a UserDto-object
   * @param name
   * @param score
   * @private
   */
  private static convertToUserDto(name: string, score: number): UserDto {
    return new UserDto({ name, score });
  }

  /**
   * Converts UserDto to User
   * @param userDto
   * @private
   */
  private static convertToUser(userDto: UserDto): User {
    return new UserBuilder()
        .setName(userDto.getName)
        .setScore(userDto.getScore)
        .build();
  }
}

export default UserService;