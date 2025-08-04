const jwt = require('jsonwebtoken');
// Middleware per autenticazione JWT
// Questo middleware verifica la presenza e la validità del token JWT nell'header Authorization
// Se il token è valido, aggiunge l'ID dell'utente alla richiesta e chiama `next()`
// Altrimenti, restituisce un errore 401 Unauthorized
//next serve per passare il controllo al middleware successivo nella catena oppure alla route finale.
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('Token mancante');
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch {
        res.status(401).send('Token non valido');
    }
};