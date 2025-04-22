export const CART_ITEM_STATUS = {
  NO_PAGADO: "No pagado",
  PAGADO: "Pagado",
  ENVIADO: "Enviado",
  RECIBIDO: "Recibido",
} as const;

export type CartItemStatus = typeof CART_ITEM_STATUS[keyof typeof CART_ITEM_STATUS];