import { worker } from '../src/worker';
import request from 'supertest';
import { DEFAULT_PORT } from '../src/consts';
import { ERRORS, SERVICES } from '../src/services/consts';
import { IUser } from '../src/db/users/types';
import { USER_ERRORS } from '../src/services/users/consts';
import { clearUsers } from '../src/db/users/db';

const USER = {
  id: '81147749-9de7-435a-949c-f422acf8eedf',
  username: 'username',
  age: 18,
  hobbies: ['hobby'],
};

describe('Users API', () => {
  const server = worker(DEFAULT_PORT);
  beforeAll(async () => {
    await clearUsers();
  });

  afterAll(async () => {
    server.close();
    await clearUsers();
  });

  describe('#1 scenario with valid data', () => {
    describe('GET /api/users', () => {
      it('should return empty users with status 200', async () => {
        const response = await request(server).get(`/${SERVICES.USERS}`);

        expect(response.status).toBe(200);
        expect(JSON.parse(response.text)).toEqual([]);
      });
    });

    describe('POST /api/users', () => {
      it('should return created user with status 201', async () => {
        const response = await request(server)
          .post(`/${SERVICES.USERS}`)
          .send(USER);
        const createdUser: IUser = JSON.parse(response.text);
        USER.id = createdUser.id;
        expect(response.status).toBe(201);
        expect(createdUser).toEqual({ ...USER });
      });
    });

    describe('GET /api/users/:id', () => {
      it('should return user by id with status 200 ', async () => {
        const response = await request(server).get(
          `/${SERVICES.USERS}/${USER.id}`,
        );
        const user: IUser = JSON.parse(response.text);

        expect(response.status).toBe(200);
        expect(user).toEqual({ ...USER });
      });
    });

    describe('PUT /api/users/:id', () => {
      it('should return updated user with status 200', async () => {
        const response = await request(server)
          .put(`/${SERVICES.USERS}/${USER.id}`)
          .send({ ...USER, age: 20 });
        const updatedUser: IUser = JSON.parse(response.text);
        expect(response.status).toBe(200);
        expect(updatedUser).toEqual({ ...USER, age: 20, id: USER.id });
      });
    });

    describe('DELETE /api/users/:id', () => {
      it('should delete user with status 204', async () => {
        const response = await request(server).delete(
          `/${SERVICES.USERS}/${USER.id}`,
        );
        expect(response.status).toBe(204);
      });
    });

    describe('GET /api/users', () => {
      it('should return empty users with status 200', async () => {
        const response = await request(server).get(`/${SERVICES.USERS}`);

        expect(response.status).toBe(200);
        expect(JSON.parse(response.text)).toEqual([]);
      });
    });
  });

  describe('#2 scenario with invalid data', () => {
    describe('GET /api/users/:id', () => {
      it('should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)', async () => {
        await request(server)
          .get(`/${SERVICES.USERS}/invalid-id`)
          .expect(400, USER_ERRORS.UUID.message);
      });

      it("should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist", async () => {
        await request(server)
          .get(`/${SERVICES.USERS}/${USER.id}`)
          .expect(404, USER_ERRORS.FIND.message);
      });
    });

    describe('POST /api/users', () => {
      it('should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields', async () => {
        await request(server)
          .post(`/${SERVICES.USERS}`)
          .send({})
          .expect(400, USER_ERRORS.CREATE.message);
      });
    });

    describe('PUT /api/users/:id', () => {
      it('should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)', async () => {
        await request(server)
          .put(`/${SERVICES.USERS}/invalid-id`)
          .send(USER)
          .expect(400, USER_ERRORS.UUID.message);
      });

      it("should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist", async () => {
        await request(server)
          .put(`/${SERVICES.USERS}/${USER.id}`)
          .send({ USER })
          .expect(404, USER_ERRORS.FIND.message);
      });
    });

    describe('DELETE /api/users/:id', () => {
      it('should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)', async () => {
        await request(server)
          .delete(`/${SERVICES.USERS}/invalid-id`)
          .expect(400, USER_ERRORS.UUID.message);
      });

      it("should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist", async () => {
        await request(server)
          .delete(`/${SERVICES.USERS}/${USER.id}`)
          .expect(404, USER_ERRORS.FIND.message);
      });
    });
  });

  describe('#3 scenario with invalid endpoint', () => {
    describe('GET /api/invalid-path', () => {
      it('should answer with status code 404', async () => {
        await request(server)
          .get(`/api/invalid-path`)
          .expect(404, ERRORS.SERVICE_NOT_FOUND.message);
      });
    });

    describe('PATCH /api/users', () => {
      it('should answer with status code 404', async () => {
        await request(server)
          .patch(`/${SERVICES.USERS}`)
          .expect(404, ERRORS.METHODS_NOT_SUPPORTED.message);
      });
    });

    describe('PATCH /api/users/:id', () => {
      it('should answer with status code 404', async () => {
        await request(server)
          .patch(`/${SERVICES.USERS}/${USER.id}`)
          .expect(404, ERRORS.METHODS_NOT_SUPPORTED.message);
      });
    });
  });
});
