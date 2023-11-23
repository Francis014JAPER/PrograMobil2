import {Entity, model, property} from '@loopback/repository';

@model()
export class Grupo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idGrupo?: number;

  @property({
    type: 'number',
    required: true,
  })
  cveGrado: number;

  @property({
    type: 'string',
    required: true,
  })
  nomGrupo: string;

  @property({
    type: 'number',
    required: true,
  })
  noAlumnos: number;


  constructor(data?: Partial<Grupo>) {
    super(data);
  }
}

export interface GrupoRelations {
  // describe navigational properties here
}

export type GrupoWithRelations = Grupo & GrupoRelations;
