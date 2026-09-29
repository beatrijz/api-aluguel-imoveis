const app = require("./src/app");

const PORT = 8080;

// Iniciar servidor
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
  });
}

module.exports = app;
