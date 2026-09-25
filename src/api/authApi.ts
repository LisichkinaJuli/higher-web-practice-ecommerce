import { baseApi } from './baseApi';
import type { User, LoginPayload, RegisterPayload, UpdateProfilePayload } from '../types/user';
interface UserWithPassword extends User {
  password?: string;
}
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<User, LoginPayload>({
      query: (credentials) => ({
        url: `/users?email=${encodeURIComponent(credentials.email)}&password=${encodeURIComponent(credentials.password)}`,
        method: 'GET',
      }),
      transformResponse: (response: UserWithPassword[]) => {
        if (!response || response.length === 0) {
          throw { status: 401, data: 'Неверный email или пароль' };
        }
        const targetUser = response[0];
        const userWithoutPassword = { ...targetUser };
        delete userWithoutPassword.password;
        return userWithoutPassword as User;
      },
    }),
    signUp: builder.mutation<User, Omit<RegisterPayload, 'confirmPassword'>>({
      query: (payload) => ({
        url: '/users',
        method: 'POST',
        body: {
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          password: payload.password,
          createdAt: new Date().toISOString(),
        },
      }),
      transformResponse: (response: UserWithPassword) => {
        const userWithoutPassword = { ...response };
        delete userWithoutPassword.password;
        return userWithoutPassword as User;
      },
    }),
    updateProfile: builder.mutation<User, { id: string; changes: UpdateProfilePayload }>({
      query: ({ id, changes }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: changes,
      }),
      transformResponse: (response: UserWithPassword) => {
        const userWithoutPassword = { ...response };
        delete userWithoutPassword.password;
        return userWithoutPassword as User;
      },
    }),
  }),
});
export const { useSignInMutation, useSignUpMutation, useUpdateProfileMutation } = authApi;