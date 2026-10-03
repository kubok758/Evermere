import { defineConfig } from 'vite';
export default defineConfig({base:'./',server:{host:'0.0.0.0',port:4173,allowedHosts:true},build:{target:'es2022',chunkSizeWarningLimit:850}});
