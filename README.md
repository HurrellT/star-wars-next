## Star Wars Next.js App

Para correr el proyecto, primero instala las dependencias:

```bash
yarn install
```

Luego, inicia el servidor de desarrollo:

```bash
yarn dev
```

Para correr los tests, utiliza:

```bash
yarn test
```

# Decisiones
## Api
### Paginación
La api no cuenta con paginación, por lo que se optó por implementar una paginación local, que permite mostrar los personajes de a 16 por vez. Esto influyó en la decisión de utilizar SSG para la página de personas, ya que no es necesario hacer una consulta a la api cada vez que se carga la página.

### Funcionalidad de Search
La API de Swapi no cuenta con un endpoint de búsqueda, por lo que se optó por implementar una búsqueda local, filtrando los personajes por nombre. Esto permite una mejor experiencia de usuario, ya que no es necesario esperar a que se cargue la información de la API cada vez que se realiza una búsqueda. Además, se implementó un debounce para esperar el input del usuario y evitar rerenders innecesarios.

## Estructura de carpetas
Opté por una estructura de carpetas para los componentes siguiendo la convención de Atomic Design, ya que me parece una forma de organizar los componentes que permite una mejor escalabilidad y reutilización. Sin embargo, también creo que es importante adaptarse a las necesidades del proyecto, por lo tanto decidí separar por casos de uso (en este ejemplo, People), ya que en este caso hay componentes particulares para lo que son las personas. Me parece una buena forma de organizar los componentes y mantener la consistencia en el proyecto, y hacerlo más fácil de entender y mantener a largo plazo y a medida que el proyecto crezca.

```
star-wars-next/
├── src/
│   ├── app/                    # App Router de Next.js
│   ├── components/             # Componentes React organizados por Atomic Design
│   │   ├── People/             # Componentes específicos para funcionalidad especifica
│   │   │   ├── atoms/          # Componentes básicos (botones, inputs, etc.)
│   │   │   ├── molecules/      # Combinaciones de átomos (tarjetas, formularios)
│   │   │   └── organisms/      # Componentes complejos (listas, grillas)
│   │   ├── common/             # Componentes reutilizables comunes
│   │   └── icons/              # Componentes de iconos
│   ├── hooks/                  # Custom hooks de React
│   ├── services/               # Servicios para comunicación con APIs
│   └── utils/                  # Funciones utilitarias y helpers
└── ...                         # Archivos de configuración y documentación
```

## SSG vs SSR
En este caso, se optó por utilizar SSG para la página de personas, ya que la api no tiene información que cambie con frecuencia, y tampoco cuenta con paginación ni parámetro de búsqueda, por lo que no es necesario hacer una consulta a la api cada vez que se carga la página. Esto permite una mejor performance y una mejor experiencia de usuario, ya que la página se carga más rápido y no es necesario esperar a que se cargue la información de la api.

## Uso de Zod
En este caso, por el scope del challenge, y los entregables pedidos, se utilizó Zod dentro de cada proyecto. Pero optaría por extraer las validaciones compartidas entre ambos proyectos a una librería externa, compartida, para evitar duplicación de código y mantener la consistencia en las validaciones.



## Recursos utilizados
- **SWAPI**: https://swapi.info/
- **Next.js**: https://nextjs.org/
- **HeroUI**: https://heroui.com/
- **React Query**: https://react-query.tanstack.com/
- **Tailwind CSS**: https://tailwindcss.com/
- **Zod**: https://zod.dev/
- **lucide-react**: https://lucide.dev/
- **Jest**: https://jestjs.io/
- **React Testing Library**: https://testing-library.com/docs/react-testing-library/intro/