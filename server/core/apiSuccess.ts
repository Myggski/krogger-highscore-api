import { Response } from 'express';
import {
  SuccessResponse,
  SuccessCreatedResponse,
  SuccessNoContentResponse,
} from './ApiResponse';
enum SuccessType {
  OK,
  CREATED,
  NO_CONTENT,
}

/**
 * Base custom api success response
 * TODO: Maybe make two ApiSuccess instead of that data is nullable. 
 * One function where data is required, and one without data
 * @param type - What type of response to return
 * @param message - Message to return if needed 
 * @param data - Example: If response is Created, return the created object
 */
const ApiSuccess = <T>(type: SuccessType, message: string = 'Success', data?: T) => ({
  send: (res: Response): Response => {
    switch (type) {
      case SuccessType.CREATED:
        return new SuccessCreatedResponse(message).send(res);
      case SuccessType.NO_CONTENT:
        return new SuccessNoContentResponse(message).send(res);
      default: {
        return new SuccessResponse(message, data).send(res);
      }
    }
  },
});

/**
 * Response code 200 - It went ok, nothing more, nothing less
 * Example: When in doubt and the request went well, use this
 * @param data - Object to return
 * @param message - Success message
 */
export const Success = <T>(data: T, message: string = 'Response OK') => {
  return ApiSuccess(SuccessType.OK, message, data);
};

/**
 * Response code 201 - Did I made that?
 * Example: When an entity is created
 * @param data - Created object
 * @param message - Success message
 */
export const Created = <T>(data: T, message: string = 'Response OK - Created') => {
  return ApiSuccess(SuccessType.CREATED, message, data);
};

/**
 * Response code 204
 * When the request went well, but the server has nothing to prove
 * Example: When an item is deleted, it has nothing to return, because it's deleted
 * @param message - Success message
 */
export const NoContent = (message: string = 'Response OK - No Content') => {
  return ApiSuccess(SuccessType.NO_CONTENT, message);
};