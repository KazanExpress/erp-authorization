import { InMemoryCache } from '@apollo/client/core';
import possibleTypes from '../models/possibleTypes.json';

export const cache: InMemoryCache = new InMemoryCache({
  possibleTypes,
});
