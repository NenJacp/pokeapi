# PokeAPI - Super Buscador de Pokémon

Aplicación web desarrollada con SvelteKit, TypeScript y Tailwind CSS para buscar y filtrar Pokémon de la PokéAPI.

## Características

-  Búsqueda por nombre o número de Pokémon
-  Filtrado por tipos (selección múltiple)
-  Operador NOT para excluir tipos
-  Diseño moderno con tema oxocarbon
-  Diseño responsive
-  Carga de 999 Pokémon desde la PokéAPI

## Requisitos Previos

- Node.js (v18 o superior)
- pnpm (gestor de paquetes)

## Instalación

```sh
# Instalar dependencias
pnpm install
```

## Desarrollo

Inicia el servidor de desarrollo:

```sh
pnpm run dev

# o inicia el servidor y abre la app en una nueva pestaña del navegador
pnpm run dev -- --open
```

## Construcción

Para crear una versión de producción de la aplicación:

```sh
pnpm run build
```

Puedes previsualizar la construcción de producción con:

```sh
pnpm run preview
```

## Scripts Disponibles

- `pnpm run dev` - Inicia el servidor de desarrollo
- `pnpm run build` - Construye la aplicación para producción
- `pnpm run preview` - Previsualiza la construcción de producción
- `pnpm run check` - Verifica el código con svelte-check
- `pnpm run check:watch` - Verifica el código en modo watch

## Tecnologías Utilizadas

- **SvelteKit** - Framework web
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Estilos utilitarios
- **PokéAPI** - API de datos de Pokémon

## Estructura del Proyecto

```
pokeapi/
├── src/
│   ├── lib/
│   │   ├── components/     # Componentes Svelte
│   │   ├── services/       # Servicios de API
│   │   └── types/          # Tipos TypeScript
│   └── routes/             # Rutas de SvelteKit
├── static/                 # Archivos estáticos
└── package.json           # Dependencias del proyecto
```

> Para desplegar tu aplicación, puede que necesites instalar un [adaptador](https://svelte.dev/docs/kit/adapters) para tu entorno objetivo.
