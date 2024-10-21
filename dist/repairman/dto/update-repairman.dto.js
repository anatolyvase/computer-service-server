"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRepairmanDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_repairman_dto_1 = require("./create-repairman.dto");
class UpdateRepairmanDto extends (0, mapped_types_1.PartialType)(create_repairman_dto_1.CreateRepairmanDto) {
}
exports.UpdateRepairmanDto = UpdateRepairmanDto;
//# sourceMappingURL=update-repairman.dto.js.map