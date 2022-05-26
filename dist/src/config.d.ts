declare const _default: (() => {
    mysql: {
        dbName: string;
        host: string;
        port: number;
        username: string;
        password: string;
    };
    jwt_secret: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    mysql: {
        dbName: string;
        host: string;
        port: number;
        username: string;
        password: string;
    };
    jwt_secret: string;
}>;
export default _default;
