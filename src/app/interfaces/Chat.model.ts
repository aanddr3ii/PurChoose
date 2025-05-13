import { Mensaje } from './Mensaje.model';
import { User } from './user';

export interface Chat {
  id: number;
  producto_id: number;
  usuario1_id: number;
  usuario2_id: number;
  created_at: string;
  updated_at: string;

  mensajes: Mensaje[];
  usuario1: User;
  usuario2: User;
}