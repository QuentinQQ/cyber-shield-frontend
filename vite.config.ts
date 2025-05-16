import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import viteImagemin from 'vite-plugin-imagemin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteImagemin({
      // PNG optimization
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      // JPG optimization
      mozjpeg: {
        quality: 80
      },
      // GIF optimization
      gifsicle: {
        optimizationLevel: 3
      },
      // WebP conversion and optimization
      webp: {
        quality: 75
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable compression
    minify: 'esbuild',
    // Chunk strategy
    rollupOptions: {
      output: {
        // Asset file output organization
        assetFileNames: (assetInfo) => {
          const fileName = assetInfo.name || '';
          const info = fileName.split('.');
          let extType = info[info.length - 1];
          
          if (/\.(png|jpe?g|gif|webp)$/i.test(fileName)) {
            extType = 'img';
          } else if (/\.(mp4|webm)$/i.test(fileName)) {
            extType = 'video';
          } else if (/\.(mp3|wav|ogg)$/i.test(fileName)) {
            extType = 'audio';
          } else if (/\.svg$/i.test(fileName)) {
            extType = 'svg';
          }
          
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        // Separate large files and common libraries
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion']
        }
      }
    }
  }
})
