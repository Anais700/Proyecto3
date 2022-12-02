# Proyecto 3: Ecommerce 

<p align="center">
 <img src="/Images/Logo PB.jpg" alt="Logo" width="350" height="350"></p>
 
## PINK BOUTIQUE WEB
<p>El proyecto tiene como objetivo desarrollar una página web tipo e-commerce de venta de ropa y accesorios. </p>
<p>En esta página web el usuario podrá crear su cuenta e ingresar con su email y contraseña, para poder añadir productos al carrito y realizar la compra. </p>
<p>Los productos se mostrarán por categorías y se dividirán en colecciones y temporadas. Cada producto lo podrá conocer por:</p> 
<p>•	Id</p>
<p>•	Foto-imagen</p>
<p>•	Nombre</p>
<p>•	Descripción</p>
<p>•	Precio</p>

## Características de la aplicación
<p>•	Procedimiento de registro e inicio de sesión</p>
•	Carrito de compras que guarda los productos añadidos.
•	Posibilidad de que el usuario pueda actualizar su nickname y contraseña.
<p>•	El administrador podrá crear, borrar y actualizar los productos, las categorías, las colecciones y temporadas; podrá ver todos los usuarios por su nombre y su email y los pedidos realizados por todos los usuarios de su tienda.</p>

## Tecnologías empleadas
<p>•	JavaScript</p>
<p>•	NodeJS</p>
<p>•	MongoDB</p>
<p>•	Postman</p>
<p>•	Cloudinary</p>

## Sistema de Registro/Inicio de sesión
<p>•	Para poder registrarse el usuario deberá introducir su nombre, apellido, email, contraseña y si desea podrá crearse un nickname.</p>
-	Se verifica que la contraseña cuente como mínimo con 8 caracteres.
<p></p>
-	Verificación del email: se verifica si el formato de la dirección de correo es válido, así como si el email ya está registrado en la base de datos.
<p>•	Para el inicio de sesión (Log in): El usuario deberá introducir su email y contraseña, si no coinciden se le mostrará un mensaje de error.</p>

## Roles de usuario 
A la hora de hacer el Log in el sistema detectará automáticamente si el usuario tiene rol de administrador de la página o de usuario pro o de usuario normal.

### Usuario normal
Este usuario podrá ver todos los productos, categorías, colecciones y temporadas, su carrito y podrá comprar y ver sus pedidos realizados con anterioridad, esto contendrá la información sobre productos, cantidad y precio. En el código el rol de este usuario se identifica por el número 0.

### Usuario Pro
Este usuario también podrá acceder a todo como un usuario normal, pero tendrá el acceso a precios con descuento en compras de mayoreo. En el código su rol se identifica por el 1.

## Panel de administrador
<p>Dentro de su panel el administrador podrá hacer lo siguiente:</p>
<p>-	Crear, editar y borrar los productos que contendrán la siguiente información:</p>

+ nombre del producto
+ descripción
+ precio
+ categoría a la que pertenece
+ colección o temporada
+ imagen

<p>-	Crear, editar y borrar: productos, categorías, colecciones y temporadas.</p>
<p>-	Ver todos los pedidos que hicieron los usuarios de su tienda.</p>



## BACKEND
<p>Se encarga de todos los procesos necesarios para que la web funcione de forma correcta, así como la conexión con la Base de Datos y el servidor.</p>
<p>•	Para la funcionalidad de la aplicación se ha trabajado con métodos de NodeJS, con la base de datos de MongoDB y con el apoyo de Postman.</p>
<p>•	Para levantar el servidor nos apoyamos del entorno NodeJS, por medio de la dependencia “express” y de la función “app.listen” trabajando con el puerto 5000.</p>
<p>•	Ejecutamos la dependencia “nodemon” para poder ver en la terminal la correcta funcionalidad de nuestro código, a través del comando: “dev”: “nodemon server.js” colocado en el archivo package.json que se nos crea al instalar la dependencia; finalmente para ejecutarlo colocamos en la terminal: npm run dev.</p>
<p>•	Conectamos con la Base de Datos de MongoDB, instalando las dependencias: dotenv y mongoose.</p>


## MODELOS DE DATOS Y DIAGRAMA DE RELACIONES
<p align="center">
 <img src="/Images/RelacionesModelos.jpg" alt="Logo"></p>

## RUTAS
### Usuario
<p></p>

```.post(/user)``` - Para que el usuario pueda registrarse – Ruta abierta
 
```.post(/login)```  - Acceso al inicio de sesión – Ruta abierta
 
```.get(/users)``` - Ruta privada de administrador para ver los usuarios

```.get(/user)``` - Ruta privada para que el usuario pueda ver su perfil

```.put(/user/:id)``` - Ruta privada de administrador para modificar el nombre, apellido o rol de un usuario

```.put(/user)``` - Ruta privada para que el usuario pueda actualizar su nickname y contraseña

```.delete(/user/:id)``` - Ruta privada de administrador para eliminar un usuario

```.post(/cart)``` - Ruta privada para que el usuario pueda añadir productos a su carrito

### Productos

```.post(/product)``` - Ruta privada de administrador para crear un nuevo producto

```.get(/products)``` - Ruta para ver todos los productos – Ruta abierta

```.get(/product/:id)``` - Ruta para ver un producto específico – Ruta abierta

```.put(/product/:id)``` - Ruta privada de administrador para actualizar un producto

```.delete(/product/:id)``` - Ruta privada de administrador para borrar un producto

```.post(/cart)``` - Ruta privada para agregar productos al carrito


### Categorías

```.post(/category)``` - Ruta privada de administrador para crear una nueva categoría

```.get(/categories)``` - Ruta para ver las categorías – Ruta abierta

```.get(/category/:id)``` - Ruta para ver una categoría específica – Ruta abierta

```.put(/category/:id)``` - Ruta privada de administrador para actualizar una categoría

```.delete(/category/:id)``` - Ruta privada de administrador para borrar una categoría


### Colecciones

```.post(/collection/:id)``` - Ruta privada de administrador para crear una nueva colección relacionada a una categoría

```.get(/collections)``` - Ruta para ver todas las colecciones – Ruta abierta

```.get(/collection/:id)``` - Ruta para ver una colección específica – Ruta abierta

```.put(/collection/:id)``` - Ruta privada de administrador para actualizar una colección

```.delete(/collection/:id)``` - Ruta privada de administrador para borrar una colección


### Temporadas

```.post(/season/:id)``` - Ruta privada de administrador para crear un nueva temporada relacionada a una categoría

```.get(/seasons)``` - Ruta para ver todas las temporadas – Ruta abierta

```.get(/season/:id)``` - Ruta para ver una temporada  específica – Ruta abierta

```.put(/season/:id)``` - Ruta privada de administrador para actualizar una temporada

```.delete(/season/:id)``` - Ruta privada de administrador para borrar una temporada


### Fotos

```.post(/upload)``` - Ruta privada de administrador para agregar una nuevo foto, subida a cloudinary

```.post(/destroy)``` - Ruta privada de administrador para borrar una foto de cloudinary


### Pagos

```.get(/payments)``` - Ruta privada para que el usuario pueda ver todos sus pedidos realizados

```.post(/payment)``` - Ruta privada para que el usuario pueda pagar los pedidos realizados
