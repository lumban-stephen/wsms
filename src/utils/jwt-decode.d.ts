declare module 'jwt-decode' {
    function jwtDecode<T extends object = object>(token: string): T;
    export class InvalidTokenError extends Error {
      constructor(message: string);
    }
    export { jwtDecode, InvalidTokenError };
  }
  