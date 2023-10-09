This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Primero correr dependiendo el manejador de paquetes instalado:

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

Luego crear en el directorio raiz de proyects-admin-frontend un archivo con el siguiente nombre: .env.local
Dentro del mismo colocar estos valores:
NEXT_PUBLIC_API_URL = 'http://localhost:8080' (8080 es el puerto que yo elegi para que utilice la API, puede variar según el puerto que desee)

Tecnologias utilizadas:
Next.js: framework para react, me hablaron muy bien y quería realizar un proyecto con esto y aproveche la ocasión.
Primereact: librería para componentes ya realizados, a modo de que quede todo un poco mas bonito
axios: Lo utilicé para la interacción con la API
