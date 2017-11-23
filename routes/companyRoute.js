let express = require('express'),
    router = express.Router(),
    Company = require('../models/company'),
    messages = require('../config/messages'),
    log4js = require('log4js'),
    logger = log4js.getLogger(),
    _ = require('lodash'),
    companyService = require('../services/companyService');


//http://localhost:3000/api/company
router.route('/company')
    .post(function (req, res) {
        if (!checkCompanyFields(req.body)) {
            return res.status(401).json({ message: messages.BAD_REQUEST });
        }
        logger.info(req.body);
        companyService.addCompany(req.body, function (error, result) {
            if (error) {
                logger.error(error);
                res.status(400).send(error);
            }
            else {
                res.status(201).json({ message: messages.CREATED,data:{company:true,companyData:result} });
            }
        })
    })
    .get(function (req, res) {
        companyService.getAllCompanies(function (error, result) {
            if (error) {
                logger.error(error);
                res.status(400).send(error);
            }
            else if (result.length > 0) {
                res.status(200).json({ message: messages.GET_ALL_ADDRESS_SUCCESS, data: { company: true, companyList: result } });
            }
            else {
                res.status(200).json({ message: messages.ADDRESS_NOT_FOUND });
            }
        })
    });

router.route('/company/:id')
    .get(function (req, res) {
        if (!req.params.id) {
            return res.status(401).json({ message: messages.BAD_REQUEST });
        }
        let id = req.params.id;
        companyService.getCompanyById(id, function (error, result) {
            if (error) {
                logger.error(error);
                res.status(400).send(error);
            }
            else if (result) {
                res.status(200).json({ message: messages.GET_ALL_ADDRESS_SUCCESS, data: { company: true, companyData: result } });
            }
            else {
                res.status(200).json({ message: messages.COMPANY_NOT_FOUND });
            }
        })
    })
    .put(function (req, res) {
        if (!req.params.id) {
           return res.status(401).json({ message: messages.BAD_REQUEST });
        }
        let id = req.params.id;
        let obj = req.body;
        obj.id = req.params.id;
        companyService.updateCompany(obj, function (error, result) {
            if (error) {
                logger.error(error);
                res.status(400).send(error);
            }
            else if (result) {
                res.status(200).json({ message: messages.UPDATE_SUCCESS });
            }
            else {
                res.status(200).json({ message: messages.COMPANY_NOT_FOUND });
            }
        })
    })
    .delete(function (req, res) {
        if (!req.params.id) {
           return res.status(401).json({ message: messages.BAD_REQUEST });
        }
        logger.info(req.params.id);
        let id = req.params.id;
        companyService.deleteCompany(id, function (error, result) {
            if (error) {
                logger.error(error);
                res.status(400).send(error);
            }
            else if (result.result.n == 1) {
                res.status(200).json({ message: messages.COMPANY_DELETE_SUCCESS });
            }
            else {
                res.status(200).json({ message: messages.COMPANY_NOT_FOUND });
            }
        })
    });

let checkCompanyFields = function (data) {
    if (_.isEmpty(data.name) || _.isEmpty(data.address.addressLine1) ||
        _.isEmpty(data.address.addressLine2) || !data.address.postalCode ||
        _.isEmpty(data.address.postalName) || _.isEmpty(data.address.countryCode) || 
        !data.size || _.isEmpty(data.website) || _.isEmpty(data.Industry)
        ) {
        return false;
    }
    else {
        return true;
    }
}

module.exports = router;