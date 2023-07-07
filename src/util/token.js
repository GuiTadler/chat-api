const jwt = require('jsonwebtoken');

const checktoken = async (token, id, key) => {
    try {
        const decoded = await jwt.verify(token, key);
        if(decoded.id=id)
            return true
        
    } catch (err) {
        return false;
    }
    return false;
};

const setToken = async (id, key) => {
    console.log(id);
    if (id) {
        return jwt.sign({ id }, key, { expiresIn: 28800 });
    }
    return false;
}

module.exports = { checktoken, setToken,};
