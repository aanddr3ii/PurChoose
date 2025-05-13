export interface Mensaje {
  id: number;
  chat_id: number;
  usuario_id: number;
  contenido: string;
  leido: boolean;
  created_at: string;
  updated_at: string;
}