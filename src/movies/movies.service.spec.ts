import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  //테스트 전 실행됨
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });
  //테스트 부분
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  //모든 영화를 받는다.
  describe("getAll",() => {
    it("shold return an array",() => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });
  //id로 하나만 받는다.
  describe("getOne",() => {
    it('should return a movie', () => {
      service.create({
        title:'Test Movie',
        genres : ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    })
  })
  it("should throw 404 error", () => {
    try{
      service.getOne(999);
    }catch(e){
      expect(e).toBeInstanceOf(NotFoundException);
      expect(e.message).toEqual('Movie with ID 999 not found')
    }
  })

  describe("deleteOne", () => {
    it("deletes a movie", () => {
      service.create({
        title:'Test Movie',
        genres: ['test'],
        year : 2000,
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1)
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete)
    })
    it("should return a 404", () => {
      try{
        service.deleteOne(999);
      } catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })

  describe("createOne", () => {
    it("should create a movie", () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title:'Test Movie',
        genres: ['test'],
        year : 2000,
      });
      const afterCreate = service.getAll().length;
      //console.log(beforeCreate, afterCreate)
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });
});