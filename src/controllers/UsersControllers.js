/*
    Padrão de boas práticas: no máx 5 função em cada controller.
    * index = GET para listar varios registro
    * show = GET para exibir um registro especifico
    * create - POST para criar um registro.
    * update = PUT para atualizar um registro.
    * delete - DELETE para remover um registro.
*/
const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

class UsersControllers {
    
    async create(request, response) {
        const { name, address, email, password, phone, cpf } = request.body;

        const database = await sqliteConnection();
        const checkUserExist = await database.get(
            "SELECT * FROM clients WHERE email = (?) OR cpf = (?)", [email, cpf]
        )

        if(checkUserExist) {
            if (checkUserExist.email === email) {
                throw new AppError("Este e-mail já está em uso.");
            } else if (checkUserExist.cpf === cpf){
                throw new AppError("Este CPF já está em uso.");
            }
        }

        const hashedPassword = await hash(password, 10);

        await database.run(
            "INSERT INTO clients (name, address, email, password, phone, cpf) VALUES (?, ?, ?, ?, ?, ?)",
             [name, address, email, hashedPassword, phone, cpf]
        );

        return response.status(201).json();
    }
}

module.exports = UsersControllers;