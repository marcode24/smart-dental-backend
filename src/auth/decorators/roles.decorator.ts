import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = 'roles';

export const Roles = () => SetMetadata(ROLES_KEY, true);
