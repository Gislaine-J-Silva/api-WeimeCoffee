const { json } = require("express");
const knex = require("../database/knex");

class AccessLogController{
    async addAccessLog(userId, ip, action, device, browser, product, details){
        await knex("access_log").insert({
            user_id: userId,
            ip_address: ip,
            action_taken: action,
            access_device: device,
            browser_used: browser,
            visited_product: product,
            details
        });
    }
}

module.exports = AccessLogController;