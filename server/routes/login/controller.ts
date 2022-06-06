import { RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import omit from 'lodash/omit';

import { Person as PersonType } from '../../../common/types'
import Person from '../../models/person/Person'

export const login: RequestHandler = (req, res) => {
    // @ts-ignore
    res.json(omit(req.user.toObject(), ['hash', 'salt']));
};

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const {username, firstName, lastName, password, birthDate} = req.body
    const personData: PersonType = {
        _id: uuidv4(),
        firstName,
        lastName,
        birthDate,
        interests: [] // TODO: Edit this
    }

    // Fuck this
    // @ts-ignore
    Person.register({...personData, username}, password).then(() => {
        res.sendStatus(200);
    }).catch(e => next(e));
    
  } catch (e) {
    return next(e);
  }
};

export const logout: RequestHandler = (req, res) => {
    req.logout();
    res.sendStatus(200)
}