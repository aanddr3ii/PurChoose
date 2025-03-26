export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: string;
  fechaRegistro?: Date;
  ubicacion: string;
  telefono: number;
  fotoPerfil?: string;
}