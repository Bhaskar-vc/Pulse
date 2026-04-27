export default {                               
    server: {                                    
      proxy: {                                   
        '/api': {                                
          target: 'http://localhost:9040',
          changeOrigin: true,                    
          rewrite: (path) =>                     
  path.replace(/^\/api/, ''),                    
        },                                       
      },                                         
    },                                           
  };   