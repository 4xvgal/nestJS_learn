import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
//테스트 블록 구문
describe('AppController (e2e)', () => {
  let app: INestApplication;
  //시작전 세팅 
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ 
      imports: [AppModule], //AppModule를 임포트
    }).compile();
    app = moduleFixture.createNestApplication(); //nestApplication 시작점 생성
    //실제 어플리케이션과 같이 동작하도록 app을 설정함. 
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // if there is a non-whitelisted property, it will be removed
        forbidNonWhitelisted: true, // if there is a non-whitelisted property, it will be removed
        transform: true, //클라이언트가 보낸것을 서버가 원하는 실제 타입으로 변환해줌
      })
    );
    await app.init(); // app 시작
  });
  //기본 get 테스트 
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  
  //movies 테스트
  describe('/ (movies)', () => {
    //맨처음 get 테스트
    it("(GET)", () => {
      return request(app.getHttpServer())
        .get("/movies")
        .expect(200)
        .expect([])
    })
    // movie POST 기능 테스트
    it("(POST)", ()=> {
        return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres : ['test'],
        })
        .expect(201);
    })

    //remove 기능 테스트 

    it('(DELETE)', () => {
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(404);
    });
    
    //movies/:id 테스트
    describe('/movies/:id',()=> {
      it('GET 200', ()=> {
        return request(app.getHttpServer())
        .get("/movies/1")
        .expect(200);
      });
      it('GET 404',() => {
        return request(app.getHttpServer())
        .get('/movies/999')
        .expect(404);
      })
      it.todo('DELETE');
      it.todo('POST');
      it.todo('PATCH');
    });

  });
});