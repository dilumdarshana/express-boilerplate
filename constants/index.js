const constants = {
    user_types: {
        customer: 1,
        restaurant_owner: 2,
        admin: 3,
        super_admin: 4,
    },
    secrets: {
        verify_pin_salt: '$2a$10$hWeNtGzt/WuQ1a7zHuuTDes',
        jwt_login_auth: 'eabe8511-b1ec-4ab1-982f-0c986ba4d6a5',
    },
};

module.exports = Object.freeze(constants);
