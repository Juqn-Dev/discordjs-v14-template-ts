import { SlashCommandBuilder, CommandInteraction, Collection, PermissionResolvable, Message } from "discord.js"
import mongoose from "mongoose"

export interface SlashCommand {
    command: SlashCommandBuilder | any,
    execute: (interaction : CommandInteraction) => void,
    cooldown?: number // in seconds
}

export interface Command {
    name: string,
    execute: (message: Message, args: Array<string>) => void,
    permissions: Array<PermissionResolvable>,
    aliases: Array<string>,
    cooldown?: number,
}


export interface IGuild extends mongoose.Document {
    guildID: string,
    options: {
        prefix: string
    }
    joinedAt: Date
}

export type GuildOption = "prefix"
export interface BotEvent {
    name: string,
    once?: boolean | false,
    execute: (...args?) => void
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string,
            CLIENT_ID: string,
            PREFIX: string,
            MONGO_URI: string,
            MONGO_DATABASE_NAME: string
        }
    }
}

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>
        commands: Collection<string, Command>,
        cooldowns: Collection<string, number>
    }
}