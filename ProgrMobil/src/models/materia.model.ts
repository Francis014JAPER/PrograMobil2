import {Entity, model, property} from '@loopback/repository';

@model()
export class Materia extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idMateria?: number;

  @property({
    type: 'string',
    required: true,
  })
  nomMateria: string;

  @property({
    type: 'number',
    required: true,
  })
  cveGrado: number;


  constructor(data?: Partial<Materia>) {
    super(data);
  }
}

export interface MateriaRelations {
  // describe navigational properties here
}

export type MateriaWithRelations = Materia & MateriaRelations;
