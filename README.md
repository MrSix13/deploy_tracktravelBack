<p align="center">
  <a href="https://tracktravel.app/" target="blank"><img src="https://res.cloudinary.com/dmkklptzi/image/upload/v1680210978/images/ucylwmaclplivybskcd3.png" width="400" alt="Track travel Logo" /></a>
</p>

<h1 align="center" style="font-size: 48px; font-weight: bold;">Track Travel</h1>

<p align="center" ><a href="https://tracktravel.app/" target="blank">https://tracktravel.app/</a></p>

<p align="center">Nuestro objetivo como empresa es revolucionar la organización de las agencias en cuanto a sus viajes y tours locales, ofreciendo seguridad y confianza desde el momento de la venta hasta el final del viaje. Somos una empresa joven y enérgica.</p>
<br>
<br>

# Instalación del Backend
<p>Una vez clonado el repositorio, realizamos lo siguiente:</p>

- Hacemos "git checkout Develop"
- Para actualizar el repositorio a la versión más reciente, ejecutamos "git pull"
- Una vez actualizado el Backend, ejecutamos:

```bash
$ npm install
```

# Inicializar el servidor
<p>Una vez instaladas las dependencias, inicializamos el servidor con:</p>

```bash
$ npm run start:dev
```

# Endpoints del Backend
<p>La ruta inicial por defecto es "http://localhost:3000", a partir de aquí se agregan las rutas dadas a cada controller según el decorador (Get, Post, Put o Delete).</p>

## Entidad Tourist
<p>Para la entidad Tourist: "http://localhost:3000/touist"</p>

- Obtener todos los turistas------>Solicitud GET a "http://localhost:3000/touist"
- Obtener un turista por su id---->Solicitud GET a "http://localhost:3000/touist/:id"
- Registrar un turista-------------->Solicitud POST a "http://localhost:3000/touist/register"
- Acutalizar un turista------------->Solicitud PUT a "http://localhost:3000/touist/:id"
- Eliminar un turista--------------->Solicitud DELETE a "http://localhost:3000/touist/:id"