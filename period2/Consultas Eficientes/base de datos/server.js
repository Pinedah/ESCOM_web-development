const { Sequelize, DataTypes } = require('sequelize');

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize('mysql://root:panke@localhost:3306/consultas_eficientes');

// Definición del modelo Usuario
const Usuario = sequelize.define('Usuario', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false });

// Función para obtener usuarios paginados
async function obtenerUsuariosPaginados(pagina) {
    const limite = 10;
    const offset = (pagina - 1) * limite;
    return await Usuario.findAll({ limit: limite, offset: offset });
}

// Función principal para probar la conexión y la consulta
async function main() {
    try {
        // Probar la conexión a la base de datos
        await sequelize.authenticate();
        console.log('Conexión a la base de datos exitosa.');

        // Sincronizar el modelo con la base de datos (opcional)
        await sequelize.sync();

        // Llamar a la función para obtener usuarios paginados
        const pagina = 1; // Cambia el número de página según sea necesario
        const usuarios = await obtenerUsuariosPaginados(pagina);

        // Mostrar los usuarios obtenidos
        console.log('Usuarios obtenidos:', usuarios);
    } catch (error) {
        console.error('Error al conectar o consultar la base de datos:', error);
    } finally {
        // Cerrar la conexión a la base de datos
        await sequelize.close();
    }
}

// Llamar a la función principal
main();