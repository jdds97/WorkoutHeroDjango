# WorkoutHero - SthenosFit

## 🏋️ Descripción del Proyecto

WorkoutHero (SthenosFit) es una aplicación web completa de gestión de fitness y entrenamiento que permite a los usuarios crear rutinas personalizadas, reservar clases de gimnasio, gestionar membresías y hacer seguimiento de su progreso físico. La plataforma conecta a clientes con instructores y facilita la administración integral de un gimnasio moderno.

## ✨ Características Principales

### Para Usuarios/Clientes
- **Gestión de Perfil Personal**: Creación y edición de perfiles con biografía personalizada
- **Rutinas de Entrenamiento**: Crear, personalizar y seguir rutinas de ejercicios
- **Reserva de Clases**: Sistema de reservas para clases grupales con instructores
- **Seguimiento de Progreso**: Registro de ejercicios, repeticiones, peso y tiempos
- **Sistema de Membresías**: Gestión de diferentes tipos de membresías y estados
- **Chat Integrado**: Comunicación directa con instructores y otros usuarios
- **Notificaciones**: Sistema de alertas e información relevante

### Para Instructores
- **Gestión de Clases**: Creación y administración de clases grupales
- **Seguimiento de Clientes**: Monitoreo del progreso de clientes asignados
- **Comunicación**: Chat directo con clientes
- **Horarios**: Gestión de horarios y disponibilidad

### Para Administradores
- **Panel de Administración**: Control total sobre usuarios, clases y membresías
- **Gestión de Reservas**: Administración del sistema de reservas
- **Reportes**: Seguimiento de actividad y estadísticas del gimnasio

## 🛠️ Tecnologías Utilizadas

### Backend
- **Django 5.2+** - Framework web de Python
- **Django REST Framework** - API REST para comunicación frontend-backend
- **PostgreSQL** - Base de datos relacional
- **JWT Authentication** - Autenticación segura con tokens
- **Django Allauth** - Gestión avanzada de autenticación
- **Celery** - Tareas asíncronas
- **Pillow** - Procesamiento de imágenes

### Frontend
- **Next.js 14** - Framework de React con TypeScript
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework de CSS utility-first
- **NextUI** - Componentes de interfaz moderna
- **Framer Motion** - Animaciones fluidas
- **Axios** - Cliente HTTP para APIs
- **Next-Auth** - Autenticación del lado del cliente
- **Zustand** - Gestión de estado
- **React Hook Form** - Gestión de formularios
- **Zod** - Validación de esquemas

### DevOps y Despliegue
- **Docker** - Containerización de la aplicación
- **Docker Compose** - Orquestación de contenedores
- **Nginx** - Servidor web y proxy reverso
- **uWSGI** - Servidor de aplicaciones Python
- **GitHub Actions** - CI/CD automatizado

### Herramientas de Desarrollo
- **Pipenv** - Gestión de dependencias Python
- **ESLint** - Linter para JavaScript/TypeScript
- **Prettier** - Formateador de código
- **Jest** - Framework de testing
- **Pytest** - Testing para Python
- **MyPy** - Verificación de tipos para Python

## 🚀 Instalación y Despliegue Local

### Prerrequisitos
- Python 3.12+
- Node.js 18+
- PostgreSQL 15+
- Docker y Docker Compose (opcional)

### Opción 1: Despliegue con Docker (Recomendado)

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/jdds97/WorkoutHeroDjango.git
   cd WorkoutHeroDjango
   ```

2. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env en la raíz del proyecto
   cp .env.example .env
   # Editar las variables según tu configuración
   ```

3. **Levantar los servicios**
   ```bash
   docker-compose up -d
   ```

4. **Ejecutar migraciones**
   ```bash
   docker-compose exec api python manage.py migrate
   ```

5. **Crear superusuario**
   ```bash
   docker-compose exec api python manage.py createsuperuser
   ```

6. **Acceder a la aplicación**
   - Frontend: http://localhost:3000
   - API: http://localhost:8000
   - Admin: http://localhost:8000/admin

### Opción 2: Despliegue Manual

#### Backend (Django)

1. **Configurar el entorno backend**
   ```bash
   cd api
   pipenv install
   pipenv shell
   ```

2. **Configurar base de datos PostgreSQL**
   ```bash
   # Crear base de datos y usuario
   createdb sthenosfit
   createuser sthenosfit --password
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env en /api
   touch .env
   # Añadir configuraciones necesarias
   ```

4. **Ejecutar migraciones y servidor**
   ```bash
   python manage.py migrate
   python manage.py collectstatic
   python manage.py runserver
   ```

#### Frontend (Next.js)

1. **Configurar el entorno frontend**
   ```bash
   cd frontend
   npm install
   ```

2. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env.local
   cp .env.example .env.local
   # Configurar URLs del backend
   ```

3. **Ejecutar servidor de desarrollo**
   ```bash
   npm run dev
   ```

## 🔧 Configuración

### Variables de Entorno Principales

#### Backend (.env en /api)
```env
DJANGO_SECRET_KEY=your-secret-key
DJANGO_DATABASE_NAME=sthenosfit
DJANGO_DATABASE_USER=sthenosfit
DJANGO_DATABASE_PASSWORD=your-password
DJANGO_DATABASE_HOST=localhost
DJANGO_DATABASE_PORT=5432
SIMPLEJWT_SECRET_KEY=your-jwt-secret
```

#### Frontend (.env.local en /frontend)
```env
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

## 🧪 Testing

### Backend
```bash
cd api
python manage.py test
# o con pytest
pytest
```

### Frontend
```bash
cd frontend
npm test
npm run lint
```

## 📁 Estructura del Proyecto

```
WorkoutHeroDjango/
├── api/                    # Backend Django
│   ├── SthenosFit/        # Configuración principal
│   ├── usuarios/          # App de gestión de usuarios
│   ├── clases/           # App de gestión de clases
│   ├── workout_hero/     # App de rutinas y ejercicios
│   ├── core/             # Funcionalidades core
│   └── manage.py
├── frontend/              # Frontend Next.js
│   ├── app/              # App Router de Next.js
│   ├── components/       # Componentes reutilizables
│   ├── styles/          # Estilos globales
│   └── types/           # Definiciones TypeScript
├── docker/               # Configuraciones Docker
├── docker-compose.yml    # Orquestación de contenedores
└── README.md
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Jesús de Dios Sánchez** - [@jdds97](https://github.com/jdds97)

## 🌐 Enlaces

- [Repositorio del Proyecto](https://github.com/jdds97/WorkoutHeroDjango)
- [Demo en Vivo](https://workouthero.jesusdediossanchez.me)
- [Documentación de la API](https://workouthero.jesusdediossanchez.me/api/docs)
