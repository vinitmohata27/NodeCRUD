let Company = require('../models/company'),
    log4js = require('log4js'),
    logger = log4js.getLogger();

let getAllCompanies = function (callback) {
    Company.find(function (err, result) {
        if (err) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
}
let addCompany = function (obj, callback) {
    obj.CreatedAt = new Date();
    let company = new Company(obj);
    company.save(function (error, result) {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
}
let updateCompany = function (obj, callback) {
    obj.UpdatedAt = new Date();
    Company.update({ _id: obj.id }, {$set:obj},function (error, result) {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
}
let deleteCompany = function (id, callback) {
    Company.remove({ _id: id }, function (error, result) {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
}
let getCompanyById = function (id, callback) {
    Company.findOne({ _id: id }, function (error, result) {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
}

module.exports.getAllCompanies = getAllCompanies;
module.exports.addCompany = addCompany;
module.exports.updateCompany = updateCompany;
module.exports.deleteCompany = deleteCompany;
module.exports.getCompanyById = getCompanyById;


