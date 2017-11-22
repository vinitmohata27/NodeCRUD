var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddressSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is Required.']
    },
    address: {
        addressLine1: { type: String, required: [true, 'Address line 1 is Required.'] },
        addressLine2: { type: String, required: [true, 'Address line 2 is Required.'] },
        postalCode: { type: Number, required: [true, 'Postal Code is Required.'] },
        postalName: { type: String, required: [true, 'Postal name is Required.'] },
        countryCode: { type: String, required: [true, 'Country Code is Required.'] }, 
    },
    size: {
        type: Number,
        required: [true, 'Size is Required.']
    },
    website: {
        type: String,
        required: [true, 'Website is Required.']
    },
    Industry: {
        type: String,
        required: [true, 'Industry is Required.']
    },
    CreatedAt: {
        type: Date
    },
    UpdatedAt: {
        type: Date
    }
});

module.exports = mongoose.model('Company', AddressSchema);