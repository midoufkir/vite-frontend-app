server: {
  proxy: {
    '/api': {
      target: 'http://<IP_BACKEND>:8055',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
