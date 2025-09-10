export interface UserProps {
  email: string;
  name: string;
  passwordHash: string;
}

export class UserEntity {
  constructor(public props: UserProps, public id?: string) {}
}
