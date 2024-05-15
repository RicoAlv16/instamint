export interface ICredentials {
  identifierType: 'email' | 'username';
  identifier: string;
  password: string;
}
