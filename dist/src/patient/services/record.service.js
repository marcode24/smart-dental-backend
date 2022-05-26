"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const sequelize_3 = require("sequelize");
const services_service_1 = require("../../service/services/services.service");
const record_entity_1 = require("../entities/record.entity");
const status_enum_1 = require("../enums/status.enum");
let RecordService = class RecordService {
    constructor(recordModel, servicesService) {
        this.recordModel = recordModel;
        this.servicesService = servicesService;
    }
    async create(data) {
        const { id_service, quantity } = data;
        let newRecord = new this.recordModel(data);
        const serviceDB = await this.servicesService.findById(id_service);
        newRecord.service_name = serviceDB.name;
        newRecord.price = serviceDB.price * quantity;
        newRecord.status = status_enum_1.Status.PENDING;
        return await newRecord.save();
    }
    async changeStatus(recordId, newStatus) {
        const recordDB = await this.recordModel.findByPk(recordId);
        if (!recordDB) {
            return new common_1.NotFoundException(`record not found with id ${recordId}`);
        }
        const { status } = recordDB;
        if (status === status_enum_1.Status.CANCELLED) {
            return new common_1.BadRequestException('you can not change status');
        }
        const newDate = new Date();
        const newTime = `${newDate.getHours()}:${newDate.getMinutes()}`;
        switch (newStatus) {
            case 'cancel':
                if (status === status_enum_1.Status.PENDING_PAYMENT || status === status_enum_1.Status.COMPLETED) {
                    return new common_1.BadRequestException('you can not change status record');
                }
                recordDB.status = status_enum_1.Status.CANCELLED;
                recordDB.cancel_date = newDate;
                recordDB.cancel_time = newTime;
                break;
            case 'paid':
                if (status !== status_enum_1.Status.PENDING_PAYMENT) {
                    return new common_1.BadRequestException('must be pending payment to change status');
                }
                recordDB.status = status_enum_1.Status.COMPLETED;
                recordDB.payment_date = newDate;
                recordDB.payment_time = newTime;
                break;
            case 'done':
                if (status !== status_enum_1.Status.PENDING) {
                    return new common_1.BadRequestException('must be pending to change status');
                }
                recordDB.status = status_enum_1.Status.PENDING_PAYMENT;
                recordDB.realization_date = newDate;
                recordDB.realization_time = newTime;
                break;
            default:
                return new common_1.BadRequestException('must provide a valid status option');
        }
        return await recordDB.save();
    }
    async findByPatient(patientId, filter) {
        const status = (filter === 1) ? [status_enum_1.Status.PENDING, status_enum_1.Status.PENDING_PAYMENT] : (filter === 2) ? [status_enum_1.Status.CANCELLED, status_enum_1.Status.COMPLETED] : [status_enum_1.Status.PENDING];
        const optionsQuery = {
            where: {
                id_patient: patientId,
                status
            }
        };
        return await this.recordModel.findAll(optionsQuery);
    }
    async update(idRecord, data) {
        const { id_service, quantity } = data;
        const recordFound = await this.recordModel.findByPk(idRecord);
        if (!recordFound) {
            return new common_1.NotFoundException(`record not found with id: ${idRecord}`);
        }
        if (recordFound.status !== status_enum_1.Status.PENDING) {
            return new common_1.BadRequestException('You can not update record, because it status is not pending');
        }
        const serviceDB = await this.servicesService.findById(id_service);
        if (serviceDB.id_service) {
            recordFound.id_service = serviceDB.id_service;
            recordFound.service_name = serviceDB.name;
            recordFound.quantity = quantity;
            recordFound.price = serviceDB.price * quantity;
            return await recordFound.save();
        }
        return 0;
    }
    async statistics(limit = 3) {
        var e_1, _a;
        const results = await this.recordModel.sequelize.query(`
    SELECT
      COUNT(r.id_service) as total_service,
      r.id_service,
      s.name,
      sum(r.price * r.quantity) as total
    FROM record r
    INNER JOIN service s ON s.id_service = r.id_service
    WHERE r.status = 'COMPLETED'
    GROUP BY s.id_service , r.service_name
    ORDER BY total_service DESC
    LIMIT :limit;
    `, {
            replacements: { limit },
            type: sequelize_2.QueryTypes.SELECT
        });
        let newResults = [];
        results.forEach(res => {
            const newResult = {
                total_service: res['total_service'],
                id_service: res['id_service'],
                name: res['name'],
                total: Number(res['total']),
                statistics: [],
            };
            newResults.push(newResult);
        });
        try {
            for (var newResults_1 = __asyncValues(newResults), newResults_1_1; newResults_1_1 = await newResults_1.next(), !newResults_1_1.done;) {
                let res = newResults_1_1.value;
                res.statistics = await this.statisticsByDays(res.id_service);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (newResults_1_1 && !newResults_1_1.done && (_a = newResults_1.return)) await _a.call(newResults_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return newResults;
    }
    async statisticsByDays(serviceID) {
        const results = await this.recordModel.sequelize.query(`
    SELECT
      COUNT(r.realization_date) as total,
      SUM(r.quantity) as total_quantity,
      r.id_service,
      r.realization_date
    FROM record r
    WHERE r.status = 'COMPLETED'
      AND id_service = :id_service
      AND r.realization_date > CURRENT_DATE - INTERVAL 7 DAY
    GROUP BY r.realization_date, r.id_service ;
    `, {
            replacements: { id_service: serviceID },
            type: sequelize_2.QueryTypes.SELECT,
        });
        const newResults = [];
        results.map(async (res) => {
            const newResult = {
                total: res['total'],
                total_quantity: res['total_quantity'],
                id_service: res['id_service'],
                realization_date: res['realization_date'],
            };
            newResults.push(newResult);
        });
        return newResults;
    }
    async statisticsByDate(optionsParams) {
        const { limit, offset, option, type } = optionsParams;
        const newLimit = limit || 10;
        const newOffset = offset || 0;
        const newOption = option || 'current';
        const newType = type || 'month';
        let sequelizeWhereQuery;
        switch (newType) {
            case 'month':
                let diff;
                const DFPaymentDate = sequelize_2.Sequelize.fn('DATE_FORMAT', sequelize_2.Sequelize.col('payment_date'), '%Y%m');
                if (newOption === 'current') {
                    diff = sequelize_2.Sequelize.fn('DATE_FORMAT', sequelize_2.Sequelize.fn('CURDATE'), '%Y%m');
                    sequelizeWhereQuery = sequelize_2.Sequelize.where(DFPaymentDate, '=', diff);
                }
                if (newOption === 'last') {
                    diff = sequelize_2.Sequelize.fn('PERIOD_DIFF', sequelize_2.Sequelize.fn('DATE_FORMAT', sequelize_2.Sequelize.fn('NOW'), '%Y%m'), DFPaymentDate);
                    sequelizeWhereQuery = sequelize_2.Sequelize.where(diff, '=', 1);
                }
                break;
            default:
                return new common_1.BadRequestException('must provide a valid type option');
        }
        const optionsQuery = {
            where: {
                status: status_enum_1.Status.COMPLETED,
                [sequelize_3.Op.and]: [sequelizeWhereQuery],
            },
            limit: newLimit,
            offset: newOffset
        };
        const querySumColumns = sequelize_2.Sequelize.fn('SUM', sequelize_2.Sequelize.where(sequelize_2.Sequelize.col('quantity'), '*', sequelize_2.Sequelize.col('price')));
        const optionsQueryEarnings = {
            attributes: [[querySumColumns, 'total']],
            where: {
                status: status_enum_1.Status.COMPLETED,
                [sequelize_3.Op.and]: [sequelizeWhereQuery],
            },
        };
        const [records, totalRecords, earnings] = await Promise.all([
            this.recordModel.findAll(optionsQuery),
            this.recordModel.count(optionsQuery),
            this.recordModel.findAll(optionsQueryEarnings)
        ]);
        return { records, earnings, total: totalRecords };
    }
};
RecordService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(record_entity_1.Record)),
    __metadata("design:paramtypes", [Object, services_service_1.ServicesService])
], RecordService);
exports.RecordService = RecordService;
//# sourceMappingURL=record.service.js.map