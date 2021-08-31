import { InternalError } from '../core/apiError';
import UserDto from '../models/User/UserDto';
import Repository from './Repository';
import Store from './Store';

class UserRepository implements Repository<UserDto> {
  private readonly COLLECTION_NAME = 'users';
  
  /**
   * Adding highscore to database
   * @param user - User
   */
  public async create(user: UserDto): Promise<UserDto> {
    try {
      const userRef = await Store.create(this.COLLECTION_NAME, { ...user });
      const userData = await userRef.get();

      return new UserDto({
        ...userData,
      });
    } catch (error) {
      throw new InternalError("Something went wrong when trying to add highscore.");
    }
  }

  /**
   * Get all highscores to list
   */
  public async getList(): Promise<UserDto[]> {
    try {
      const userRef = await Store.getList(this.COLLECTION_NAME);

      return userRef.docs.map(doc => new UserDto(doc.data()));
    } catch (error) {
      throw new InternalError("Something went wrong when trying to get highscore.");
    }
  }
}

export default UserRepository;