/*
    Padrão de boas práticas: no máx 5 função em cada controller.
    * index = GET para listar varios registro
    * show = GET para exibir um registro especifico
    * create - POST para criar um registro.
    * update = PUT para atualizar um registro.
    * delete - DELETE para remover um registro.
*/
const { hash, compare } = require("bcryptjs");
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
    
    async update(request, response) {
        const { name, email, new_password, current_password, address, phone } = request.body;
        const { id } = request.params;
        
        const database = await sqliteConnection();
        const user = await database.get(
            "SELECT * FROM clients WHERE id = (?)", [id]
        )
        
        if(!user) {
            throw new AppError("Usuário não encontrado");
        }
        
        const userEmailUpdate = await database.get(
            "SELECT * FROM clients WHERE email = (?)", [email]
        )
        
        if(userEmailUpdate && userEmailUpdate.id !== user.id){
            throw new AppError("Esse e-mail já está em uso.");
        }
        
        user.name = name ?? user.name;
        user.address = address ?? user.address;
        user.email = email ?? user.email;
        user.phone = phone ?? user.phone;

        if(new_password && !current_password){
            throw new AppError("Informe a senha atual")
        }

        if(new_password && current_password) {
            const checkCurrentPassword = await compare(current_password, user.password);

            if(!checkCurrentPassword){
                throw new AppError("Senha atual não confere.")
            }

            user.password = await hash(new_password, 10);
        }


        await database.run(`
            UPDATE clients SET
            name = ?,
            address = ?,
            email = ?,
            password = ?,
            phone = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.address, user.email, user.password, user.phone, id]
        )

        return response.status(200).json();
    }
}

module.exports = UsersControllers;