import { expect } from 'chai';
import superTest from 'supertest';
import app from '../app';

const request = superTest(app);

export { request, expect };
