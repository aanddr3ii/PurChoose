# Manual de Usuario – PurChoose

> Versión: 1.0  
> Autores: Oscar Pena, Andrei Fodorean, Raul Segura
> Fecha: 20 de Mayo del 2025  

---

## Índice

1. [Introducción](#introducción)  
2. [Registro e Inicio de Sesión](#registro-e-inicio-de-sesión)  
3. [Perfil del Usuario](#perfil-del-usuario)  
4. [Comprar un Producto](#comprar-un-producto)  
5. [Vender un Producto](#vender-un-producto)  
6. [Chat entre Usuarios](#chat-entre-usuarios)  
7. [Métodos de Pago](#métodos-de-pago)  
8. [Historial de Compras](#historial-de-compras)  
9. [Panel Empresarial](#panel-empresarial)  
10. [Soporte Técnico](#soporte-técnico)

---

## 1. Introducción

**PurChoose** es una plataforma web desarrollada con **Laravel (backend)** y **Angular (frontend)**.

### Funcionalidades Principales:
- Registro e inicio de sesión
- Publicación de productos usados o nuevos
- Carrito de compra y gestión de métodos de pago
- Chat directo entre usuarios
- Historial de compras
- Gestion de Productos, tanto individuales como en masa
---

## 2. Registro e Inicio de Sesión

### 2.1 Registro de Nuevo Usuario

Para registrarte:
1. Ve a `/registro`
2. Completa los siguientes campos:
   - **Nombre**: Tu nombre completo
   - **Correo electrónico**: Un email válido
   - **Teléfono**: Prefijo internacional (ej. +34)
   - **Contraseña**: Mínimo 6 caracteres(tambien tendras que confirmarla)
   - **Terminos i condiciones**: un checkbox para aceptarlas
3. Haz clic en **"Registrarse"**
4. Tambien tienes la opcion de Registrarte como vendedor (click en **"Registro de vendedor"**)

✅ Una vez registrado, podrás iniciar sesión.

---

### 2.2 Iniciar Sesión

1. Accede a `/login`
2. Rellena los campos:
   - **Correo electrónico**
   - **Contraseña**

3. Haz clic en **Iniciar Sesión**

> Si eres usuario empresario, algunas funciones seran diferentes para tu cuenta.

---

## 3. Perfil del Usuario

### 3.1 Ver tu Perfil

1. Haz clic en el boton de perfil → en la barra superior
2. Se muestra tu información actual:

| Campo | Descripción |
|-------|-------------|
| Nombre | Tu nombre de usuario |
| Email | Tu correo electrónico |
| Ubicación | Donde resides |
| Teléfono | Tu número de contacto |
| Foto de Perfil | Imagen actual |

> Si eres una cuenta nueva tendras la foto predeterminada de perfil.

---

### 3.2 Editar tu Perfil

1. En tu perfil, haz clic en **Editar Perfil**
2. Cambia lo que necesites:

| Campo | ¿Qué puedes editar? |
|--------|----------------------|
| Nombre | ✅ Sí |
| Email | ✅ Sí |
| Teléfono | ✅ Sí (con prefijo) |
| Ubicación | ✅ Sí |
| Contraseña | ✅ Opcional |
| Foto de perfil | ✅ Sube una nueva imagen |

3. Haz clic en **Guardar cambios**

---

## 4. Comprar un Producto

### 4.1 Buscar un Producto

1. Apreta en una de las categorias para acceder a la lista
2. También puedes filtrar usar uno de los filtros

---

### 4.2 Añadir al Carrito

1. Ve a la pagina de un producto
2. Depende del tipo de producto puedes comprar uno o varios
3. Haz clic en **Comprar**

✅ El producto aparece en tu carrito con su precio total

---

### 4.3 Finalizar Compra

1. Haz clic en tu carrito → desde la barra superior
2. Revisa tus productos y cantidades
3. Haz clic en **Finalizar Compra**
4. Confirma tu método de pago(Añade uno o escoje uno ya introducido)

> ✅ Una vez pagado, el estado cambia a `pagado` y pasa al historial  


---

## 5. Vender un Producto

### 5.1 Publicar un Producto

1. Haz clic en **Vender** en la barra superior
2. Completa todos los campos obligatorios:

| Campo | Obligatorio |
|--------|--------------|
| Título | ✅ |
| Descripción | ✅ |
| Categoría | ✅ |
| Precio | ✅ |
| Estado | ✅ (nuevo/usado) |
| Cantidad | ⚠️Solo empresario |
| Imágenes | Hasta 6 archivos |

3. Haz clic en **Publicar**

✅ Tu producto aparecerá en la sección **Mis Productos**

> Si eres empresario, tambien podras añadir la cantidad

---

### 5.2 Editar o Eliminar un Producto

1. Ve a **Mis Productos**(barra superior)
2. Haz clic en **Editar** o **Eliminar**
3. Al editar, modifica los datos y haz clic en **Actualizar**

> Tambien puedes visualizar estadisticas del producto

---

## 6. Chat entre Usuarios

### 6.1 Iniciar una Conversación

1. Desde la pagina de un producto → haz clic en **Chat**
2. Escribe tu mensaje inicial → haz clic en **Enviar**
3. Puedes tambien editar o eliminar mensajes i puedes eliminar el chat(6.4)
4. Para eliminar el chat entero darle al boton **🗑️**


---

### 6.2 Ver Mensajes Recibidos

1. Haz clic en **Buzon** en la barra lateral izquierda
2. Te muestra la lista de chats
3. Para abrir el chat que quieres apretas encima del nombre
4. A la derecha saldra el chat con los mensajes
---

### 6.3 Enviar y Leer Mensajes

1. Al seleccionar un chat → se cargan todos los mensajes
2. Escribe tu respuesta y haz clic en **Enviar**

---

### 6.4 Eliminar i ediar un Mensaje i eliminar un Chat

1. Para poder eliminar o editar mensajes haces lo siguiente:
   1. click derecho en el mensaje que quieras editar o eliminar
   2. Para editar Apretar **editar** i editar en el popup
   3. Para eliminar apretar **eliminar** i darle a aceptar
2. Para eliminar el chat:
   4. Para eliminar el chat entero darle al boton **🗑️**


---

## 7. Métodos de Pago

### 7.1 Añadir Método de Pago

1. Ve a tu perfil → haz clic en **Métodos de Pago**
2. Haz clic en **Añadir nuevo método**
3. Elige uno de estos tipos:

| Tipo | Campos Obligatorios |
|------|---------------------|
| Tarjeta      | Titular, Número, Fecha de expiración, CVC |
| PayPal       | Correo electrónico, Contraseña |
| Apple Pay    | Correo, Contraseña |
| Google Pay   | Correo, Contraseña |

4. Haz clic en **Guardar**

> Solo puedes tener **un método de pago por tipo**.  
Ej: No puedes tener dos cuentas de PayPal guardadas
Tambien puedes añadirlos al pagar el carrito

---

### 7.2 Modificar o Eliminar un Método

1. Haz clic en el método que quieras modificar
2. Edita los datos y haz clic en **Actualizar**
3. Para eliminarlo → haz clic en **Eliminar**
> No dejamos modificar la tarjeta solo el servicio

---

## 8. Historial de Compras

### 8.1 Ver Pedidos Realizados

1. Ve a **Historial** desde tu perfil
2. Verás todas tus compras con estado:

| Estado | Descripción |
|--------|-------------|
| `Pagado` | La transacción fue completada |
| `Enviado` | El vendedor ha iniciado el envío |
| `Recibido` | Confirmaste haber recibido el producto |
| `Cancelado` | Se canceló antes de enviar |

como se deveria ver
|  |  |
|--------|-------------|
| Titulo: | Lamborghini SVJ |
| Cantidad: | 1 |
| Precio Total: | 120.000,90 €|
| Estado | Pagado|
---

### 8.2 Actualizar Estado de un Pedido

1. En el carrito, haz clic en **Finalizar Compra**
2. El estado cambia a `Pagado` → y pasa al historial
3. El vendedor puede marcar como `Enviado`  
4. Tú puedes marcar como `Recibido`

---

## 9. Panel Empresarial (si aplica)

Si eres un **usuario empresaurio**, tendrás acceso a funciones adicionales:

### Funciones Especiales

| Función | Descripción |
|--------|-------------|
| 📦 Publicar múltiples productos a la vez | Ideal para inventarios grandes |
| 📊 Estadísticas avanzadas de ventas | Cuántos productos has vendido |
| 💬 Soporte directo con clientes | Gestiona consultas en tiempo real |
| 🎯 Crear campañas promocionales | Ofertas, descuentos, destacar productos |
| 🧾 Descuentos especiales | Aplicables a categorías o productos específicos |

---

## 10. Soporte Técnico

¿Tienes dudas o problemas técnicos?

Contáctanos por:

📧 Correo: soporte@purchoose.com  
📞 WhatsApp: +34 123 456 789  
❓ FAQ: ve a **Ayuda > Preguntas Frecuentes**

---

## 🔒 Anexo A: Validaciones Importantes

| Tipo de Pago | Campos Obligatorios |
|--------------|---------------------|
| Tarjeta      | Nombre titular, número de tarjeta, fecha de expiración, CVC |
| PayPal       | Correo electrónico, contraseña |
| Apple Pay    | Correo, contraseña |
| Google Pay   | Correo, contraseña |

✅ Laravel devolverá errores claros si intentas guardar duplicados o datos inválidos

---

## 🛠️ Anexo B: Estados de los Productos

| Estado | Descripción |
|--------|-------------|
| `no pagado` | El producto sigue en el carrito |
| `pagado` | La transacción fue completada |
| `enviado` | El vendedor ha iniciado el envío |
| `recibido` | El producto llegó correctamente |
| `cancelado` | Se canceló antes de enviar |

---

## 🧾 Anexo C: Tipos de Usuarios

| Tipo | Descripción |
|------|-------------|
| `usuario` | Cliente normal |
| `empresauiro` | Vendedor empresarial |
| `admin` | Administrador de la plataforma |

---

## 📄 Anexo D: Flujos de Datos

- **Carrito → Historial**: cuando se marca como `pagado`, el producto pasa al historial
- **Chat**: se genera por cada producto vendido entre dos usuarios
- **Métodos de Pago**: solo uno por tipo permitido

---

## 📝 Notas Adicionales

- Todos los formularios tienen validaciones claras
- Errores comunes:

| Código de Error | Posible causa |
|------------------|----------------|
| `409 Conflict` | Ya tienes este método de pago creado |
| `422 Unprocessable Entity` | Campos incompletos o incorrectos |
| `500 Internal Server Error` | Problema en el backend |
| `Property 'subscribe' does not exist on type 'signal'` | Usar `.subscribe()` en lugar de acceder al valor con `()`
| `Can't bind to 'ngModel' since it isn't a known property` | Falta importar `FormsModule` en el componente

---

> ✅ Este documento está pensado para ser usado en Angular como página de ayuda o exportado a PDF con **Markdown Preview Enhanced** en **Visual Studio Code**

---

¿Quieres que te dé las instrucciones exactas de cómo pasarlo a PDF desde VSCode? 😊