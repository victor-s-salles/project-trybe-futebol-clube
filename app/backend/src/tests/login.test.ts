import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bycrypt from "bcryptjs";
import { app } from '../app';

import * as jwt from 'jsonwebtoken';
import { Response } from 'superagent';
import { teamById, teamsSqlResponse } from './mocks/teamMock';
import User from '../database/models/userModel';
import { login, loginInvalidPassword, loginnvalidEmail, tokenMock, user } from './mocks/loginMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do login', () => {
    afterEach(sinon.restore);
    it('Se realizar um login corretamente, retorna o token', async () => {
        sinon.stub(User, 'findOne').resolves(user)
        sinon.stub(bycrypt, 'compareSync').returns(true)
        const signMock = sinon.mock(jwt);
        signMock.expects('sign').returns(tokenMock);
        const response = await chai.request(app).post('/login').send(login)
        expect(response.status).to.be.eq(200);
        expect(response.body).to.be.deep.equal({token:tokenMock});
    });
    it('Se realizar um login com a senha incorreta, retorna o erro correto', async () => {
        sinon.stub(User, 'findOne').resolves(user)
        sinon.stub(bycrypt, 'compareSync').returns(false)
        const response = await chai.request(app).post('/login').send(login)
        expect(response.status).to.be.eq(401);
        expect(response.body).to.be.deep.equal({message: 'Invalid email or password'});
      });

    it('Se realizar um login com a email invalido, retorna o erro correto', async () => {
        const response = await chai.request(app).post('/login').send(loginnvalidEmail)
        expect(response.status).to.be.eq(401);
        expect(response.body).to.be.deep.equal({message: 'Invalid email or password'});
        });
    it('Se realizar um login com um password invalido, retorna o erro correto', async () => {
        const response = await chai.request(app).post('/login').send(loginInvalidPassword)
        expect(response.status).to.be.eq(401);
        expect(response.body).to.be.deep.equal({message: 'Invalid email or password'});
         });
        
    
  

  });
  