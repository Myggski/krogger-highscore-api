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
  private readonly _nameRegExp = new RegExp('^[A-Za-z0-9]{1,12}$', 'g');

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
    
    if (!name.match(this._nameRegExp)?.length) {
      throw new BadRequestError('Invalid name, try again.');
    }

    const dboUser = UserService.convertToUserDto(name, score);
    await this._repository.create(dboUser)
    return UserService.convertToUser(dboUser);
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