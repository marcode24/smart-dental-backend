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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const service_entity_1 = require("../entities/service.entity");
let ServicesService = class ServicesService {
    constructor(serviceModel) {
        this.serviceModel = serviceModel;
    }
    async create(data) {
        const { price } = data;
        const priceRegex = new RegExp(/^[0-9]+(.[0-9]{1,2})?$/);
        if (!price.toString().match(priceRegex)) {
            return new common_1.BadRequestException('Must provide a valid price');
        }
        const serviceCreated = await this.serviceModel.create(Object.assign({}, data));
        return serviceCreated;
    }
    async findAll(name, limit = 5, offset = 0) {
        const newLimit = limit || 5;
        const newOffset = offset || 0;
        let options = {
            limit: newLimit,
            offset: newOffset,
        };
        if (name) {
            const search = `%${name.toString()}%`;
            options = {
                where: {
                    name: { [sequelize_2.Op.like]: search },
                },
            };
        }
        const [services, totalActive, totalInactive] = await Promise.all([
            this.serviceModel.findAll(options),
            this.serviceModel.count({ where: { status: true } }),
            this.serviceModel.count({ where: { status: false } }),
        ]);
        const data = { services, totalActive, totalInactive };
        return data;
    }
    async findByFilter(odontogram = false) {
        const servicesFound = await this.serviceModel.findAll({
            where: {
                odontogram,
                status: true
            }
        });
        return { services: servicesFound };
    }
    async findById(serviceId) {
        const serviceFound = await this.serviceModel.findByPk(serviceId);
        if (!serviceFound) {
            return new common_1.NotFoundException(`service not found with id: ${serviceId}`);
        }
        return serviceFound;
    }
    async changeStatus(serviceId, newValue) {
        const serviceDB = await this.serviceModel.findByPk(serviceId);
        if (!serviceDB) {
            return new common_1.NotFoundException(`service not found with id: ${serviceId}`);
        }
        serviceDB.status = Boolean(newValue);
        return await serviceDB.save();
    }
    async update(serviceId, changes) {
        return await this.serviceModel.update(changes, {
            where: {
                id_service: serviceId,
            }
        });
    }
};
ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(service_entity_1.Service)),
    __metadata("design:paramtypes", [Object])
], ServicesService);
exports.ServicesService = ServicesService;
//# sourceMappingURL=services.service.js.map