/*
    Padrão de boas práticas: no máx 5 função em cada controller.
    * index = GET para listar varios registro
    * show = GET para exibir um registro especifico
    * create - POST para criar um registro.
    * update = PUT para atualizar um registro.
    * delete - DELETE para remover um registro.
*/
const AppError = require("../utils/AppError");

class UsersControllers {
    
    create(request, response) {
        const { name, email, password } = request.body;

        if(!name){
            throw new AppError("Nome é obrigatório!");
        }

        response.status(201).json({ name, email, password });
    }
}

module.exports = UsersControllers;