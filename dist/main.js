"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const prisma_service_1 = require("./prisma/prisma.service");
async function bootstrap() {
    var _a, _b;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, cookie_parser_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    app.enableCors({
        origin: (_a = process.env.CORS_ORIGIN) !== null && _a !== void 0 ? _a : 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    });
    const prisma = app.get(prisma_service_1.PrismaService);
    prisma.enableShutdownHooks(app);
    const port = Number((_b = process.env.PORT) !== null && _b !== void 0 ? _b : 4000);
    await app.listen(port);
    console.log(`Nurse backend running on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map