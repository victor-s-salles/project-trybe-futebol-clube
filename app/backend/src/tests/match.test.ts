import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore

import chaiHttp = require('chai-http');
import Token from '../auth/token';
import * as jwt from 'jsonwebtoken';
import { app } from '../app';
import Team from '../database/models/teamModel';

import { user} from './mocks/loginMock';
import Match from '../database/models/matchModel';
import { finishedMatches, inProgressMatches, matches, newMatchMock, newMatchReturnMock, tokenMock, updateMatchesMock } from './mocks/matchMock';

chai.use(chaiHttp);

const { expect } = chai;
const tokenJWT = new Token()
describe('Testes de match', () => {
  afterEach(sinon.restore);
  it('Se retorna um array com todos os times', async () => {
    sinon.stub(Match, 'findAll').resolves(matches)
    const response = await chai.request(app).get('/matches')
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(matches);

  });
  it('Se retorna um array com todos os time em jogo', async () => {
    sinon.stub(Match, 'findAll').resolves(matches)
    const response = await chai.request(app).get('/matches?inProgress=true')
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(inProgressMatches);

  });
  it('Se retorna um array com todos os time que as partidas acabaram', async () => {
    sinon.stub(Match, 'findAll').resolves(matches)
    const response = await chai.request(app).get('/matches?inProgress=false')
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(finishedMatches);

  });

  it('Se é possivel finalizar uma partida pelo seu id', async () => {
    sinon.stub(Match, 'update').resolves([1])
    sinon.stub(jwt, 'verify').resolves(user);
    sinon.stub(tokenJWT, 'authToken').resolves(user);

    const response = await chai.request(app).patch('/matches/1/finish').send().auth(tokenMock, { type: 'bearer' });
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq({ "message": "Finished" });
  });
  it('Se é não possivel finalizar uma partida pelo seu id sem o token', async () => {
    sinon.stub(Match, 'update').resolves([1])
    sinon.stub(jwt, 'verify').resolves(user);
    sinon.stub(tokenJWT, 'authToken').resolves(user);

    const response = await chai.request(app).patch('/matches/1/finish')
    expect(response.status).to.be.eq(401);
    expect(response.body).to.be.deep.eq({ "message": "Token not found" });
  });
  it('Se ao passar um id erro, gera o erro correto', async () => {
    sinon.stub(Match, 'update').resolves([0])
    sinon.stub(jwt, 'verify').resolves(user);
    sinon.stub(tokenJWT, 'authToken').resolves(user);

    const response = await chai.request(app).patch('/matches/999/finish').send().auth(tokenMock, { type: 'bearer' });
    expect(response.status).to.be.eq(404);
    expect(response.body).to.be.deep.eq({ "message": "Match not found or already finished" });
  });

  it('Se é possivel atualizar uma partida', async () => {
    sinon.stub(Match, 'update').resolves([1])
    sinon.stub(jwt, 'verify').resolves(user);
    sinon.stub(tokenJWT, 'authToken').resolves(user);

    const response = await chai.request(app).patch('/matches/1').send(updateMatchesMock).auth(tokenMock, { type: 'bearer' });
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq({ "message": "Updated" });
  });
  it('Se caso não envie os dados para atualizar a partida, gera o erro correto', async () => {
    sinon.stub(Match, 'update').resolves([1])
    sinon.stub(jwt, 'verify').resolves(user);
    sinon.stub(tokenJWT, 'authToken').resolves(user);

    const response = await chai.request(app).patch('/matches/1').send({}).auth(tokenMock, { type: 'bearer' });
    expect(response.status).to.be.eq(400);
    expect(response.body).to.be.deep.eq({ "message": "All fields must be filled correctly" });
  });

  it('Se caso não envie os dados para atualizar a partida, gera o erro correto', async () => {
    sinon.stub(Match, 'update').resolves([1])
    sinon.stub(jwt, 'verify').resolves(user);
    sinon.stub(tokenJWT, 'authToken').resolves(user);

    const response = await chai.request(app).patch('/matches/1').send({}).auth(tokenMock, { type: 'bearer' });
    expect(response.status).to.be.eq(400);
    expect(response.body).to.be.deep.eq({ "message": "All fields must be filled correctly" });
  });

  it('Se é possivel inserir uma nova partida', async () => {
    sinon.stub(Match, 'create').resolves(newMatchReturnMock)
    sinon.stub(jwt, 'verify').resolves(user);
    sinon.stub(tokenJWT, 'authToken').resolves(user);

    const response = await chai.request(app).post('/matches').send(newMatchMock).auth(tokenMock, { type: 'bearer' });
    expect(response.status).to.be.eq(201);
    expect(response.body).to.be.deep.eq(newMatchReturnMock);
  });
});
