# Segunda entrega

Mejorar la arquitectura del servidor desarrollado durante el curso, enfocándose en la implementación de patrones de diseño, manejo de roles y autorización, así como en la mejora de la lógica de negocio del ecommerce.

Aspectos a Incluir:

1. **Patrón Repository:** ✅
   - Implementar el patrón Repository para trabajar con el DAO (Data Access Object) dentro de la lógica de negocio.
2. **Modificación de la Ruta :** ✅

   **`/current`**

   - Evitar enviar información sensible del usuario. Enviar un DTO (Data Transfer Object) que contenga solo la información necesaria y no sensible.

3. **Sistema de Recuperación de Contraseña:** ✅
   - Implementar un sistema de recuperación de contraseña que envíe un correo con un botón para restablecer la contraseña.
   - El enlace del correo debe expirar después de una hora de ser enviado.
   - Evitar que el usuario pueda restablecer la contraseña a la misma que tenía anteriormente.
4. **Middleware de Autorización:**
   - Crear un middleware que trabaje junto con la estrategia “current” para limitar el acceso a ciertos endpoints:
     - Solo el administrador puede crear, actualizar y eliminar productos.
     - Solo el usuario puede agregar productos a su carrito.
5. **Arquitectura Profesional:**
   - Aplicar una arquitectura más profesional en el servidor, utilizando patrones de diseño, manejo de variables de entorno y técnicas avanzadas como mailing.
6. **Mejora en la Lógica de Compra:**
   - Profundizar en los roles de los usuarios y las autorizaciones aplicables a cada rol en el contexto de las compras dentro del ecommerce.

Formato de Entrega:

- Link al repositorio de GitHub con el proyecto completo, excluyendo la carpeta .
  `node_modules`
- Incluir el archivo  necesario para la configuración de las variables de entorno.
  `.env`

Esta entrega final busca consolidar todos los conocimientos adquiridos durante el curso, enfocándose en la mejora de la arquitectura, seguridad y profesionalización del servidor, preparándote para desarrollar aplicaciones backend robustas y bien estructuradas.

## **Criterios:**

- **Implementación de DAO y DTO en Capa de Persistencia**:

Los DAOs y DTOs están adecuadamente estructurados y separados, siguiendo buenas prácticas de diseño y arquitectura. La transferencia de datos entre capas es eficiente y se minimiza el uso de consultas redundantes a la base de datos.

- **Patrón Repository y Lógica de Negocio:**

El patrón Repository se aplica de manera ejemplar, separando claramente la lógica de acceso a datos de la lógica de negocio. Las operaciones de negocio se realizan de manera eficiente y coherente utilizando los Repository.

- Middleware de Autorización y Seguridad de Endpoints:

El middleware de autorización se integra perfectamente con la estrategia "current", permitiendo delimitar el acceso a los endpoints según los roles de usuario de manera segura y eficiente.

- **Modelo de Ticket y Lógica de Compra:**

El modelo Ticket se crea correctamente con todos los campos necesarios y se implementa una lógica de compra robusta que verifica el stock de los productos, genera tickets y maneja compras completas e incompletas de manera eficiente.

<!-- PRIMERA ENTREGA -->

# Primera entrega

Consigna:

Implementar en el proyecto ecommerce facilitado al inicio del curso un CRUD de usuarios, junto con un sistema de Autenticación y Autorización.

Aspectos a Incluir:

1. **Modelo de Usuario:**
   - Crear un modelo  que contenga los siguientes campos:
     `User`
     - : String
       `first_name`
     - : String
       `last_name`
     - : String (debe ser único)
       `email`
     - : Number
       `age`
     - : String (en formato hash)
       `password`
     - : Id con referencia a
       `cart`
       `Carts`
     - : String (valor por defecto: 'user')
       `role`
2. **Encriptación de Contraseña:**
   - Utilizar el paquete  para encriptar la contraseña del usuario mediante el método .
     `bcrypt`
     `hashSync`
3. **Estrategias de Passport:**
   - Desarrollar las estrategias de Passport para que funcionen con el modelo de usuarios creado.
4. **Sistema de Login:**
   - Implementar un sistema de login del usuario que trabaje con JWT (JSON Web Tokens).
5. **Ruta de Validación:**
   - Agregar al router  la ruta , que validará al usuario logueado y devolverá en una respuesta sus datos asociados al JWT.
     `/api/sessions/`
     `/current`

Formato de Entrega:

- Link al repositorio de GitHub con el proyecto completo, sin incluir la carpeta .
  `node_modules`

Esta actividad es una parte fundamental de la preparación para la entrega del proyecto final y se centra en la implementación de mecanismos de seguridad y gestión de usuarios, que son esenciales para el desarrollo de aplicaciones backend robustas y seguras.

## **Criterios:**

- **Modelo de Usuario y Encriptación de Contraseña:**

Crear modelo User con los campos especificados y se ha implementado la encriptación de la contraseña utilizando **bcrypt.hashSync.**

Que el modelo User incluya todos los campos requeridos.

Que la contraseña se encripte correctamente y se almacene en la base de datos de forma segura.

---

- **Estrategias de Passport para Autorización y Autenticación:**

Que se desarrollen y configuren las estrategias de Passport para el modelo de usuarios definido.

Que las estrategias de Passport están correctamente configuradas para la autenticación y autorización de usuarios.

Que se haya implementado una estrategia para la autenticación del usuario mediante JWT.

---

- **Sistema de Login y Generación de Token JWT:**

Que el sistema de login permita a los usuarios autenticarse y generar un token JWT válido.

Que los usuarios pueden iniciar sesión de manera exitosa y se les asigna un token JWT.

Que el token JWT sea válido y pueda utilizarse para realizar acciones protegidas en la aplicación.

---

- **Estrategia "Current" y Endpoint /api/sessions/current:**

Que se implemente una estrategia "current" que valide al usuario logueado y extraiga sus datos mediante el endpoint /api/sessions/current.

Que la estrategia "current" permita extraer el usuario asociado al token JWT de manera efectiva.

Que en caso de token inválido o inexistente, se devuelva un error apropiado de Passport.

Que el endpoint /api/sessions/current funcione correctamente y devuelva los datos del usuario asociado al token JWT.

Que la validación del usuario en el endpoint sea precisa y segura.
