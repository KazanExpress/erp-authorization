/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Mutation
// ====================================================

export interface Mutation_signIn_account_role {
  __typename: "Role";
  name: string;
  localizedName: string;
  description: string | null;
  permissions: string[];
}

export interface Mutation_signIn_account {
  __typename: "Account";
  accountId: string;
  phone: string;
  firstName: string;
  lastName: string;
  patronymic: string | null;
  dateCreated: any | null;
  role: Mutation_signIn_account_role;
}

export interface Mutation_signIn {
  __typename: "AuthDetails";
  accessToken: string;
  refreshToken: string;
  account: Mutation_signIn_account;
}

export interface Mutation {
  signIn: Mutation_signIn;
}

export interface MutationVariables {
  username: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RefreshToken
// ====================================================

export interface RefreshToken_refreshToken {
  __typename: "AuthDetails";
  accessToken: string;
  refreshToken: string;
}

export interface RefreshToken {
  refreshToken: RefreshToken_refreshToken;
}

export interface RefreshTokenVariables {
  refreshToken: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
