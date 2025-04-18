# PathFindingVisualizer

### First install tailwindcss and @tailwindcss/vite via npm.

``` npm install tailwindcss @tailwindcss/vite ```

While creating react Vite Project, a configuration file by the name `vite.config.js` was created. We need to add the @tailwindcss/vite plugin to your Vite configuration. This will be your final setup of vite.config.js file

```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // We have added this line

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()] // & We have added tailwindcss() here
})
```

Then import tailwind to your project in index.css file:

```
@import "tailwindcss";
```
