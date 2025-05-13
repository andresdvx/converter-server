import { Application } from "express";

export interface IController {
    Router(app: Application): void;
}