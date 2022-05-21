import { RequestHandler } from 'express';
import Person from './model';
import { Person as PersonType } from '../../../common/types/person';

export const login: RequestHandler = async (req, res, next) => {
  try {

  } catch (e) {
    return next(e);
  }
};

export const register: RequestHandler = async (req, res, next) => {
    try {

    } catch (e) {
        return next(e);
    }
};

export const me: RequestHandler = async (req, res, next) => {
  try {

  } catch (e) {
    return next(e);
  }
};