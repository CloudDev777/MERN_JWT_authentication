const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '6h' }, // Token expires after 6 hours
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);
