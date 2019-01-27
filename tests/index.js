'use strict';

import { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import superTest from 'supertest';

const request =  superTest(app);

export { request, expect };
