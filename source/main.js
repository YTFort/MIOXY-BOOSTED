const { createClient, createServer, states } = require("minecraft-protocol");
const protocol = require('minecraft-protocol')
const gradient = require('gradient-string');
const fetch = require('node-fetch');
const fs = require("fs");

// Логгер
class Logger {
    info(msg) {
        console.log(gradient('#cf239e', '#cf7f23')("[Info] ") + msg); }
    warning(msg) {
        console.log(gradient('#cccf23', '#cf6b23')("[Warning] ") + msg)}
    client(msg) {
        console.log(gradient('#23cf29', '#23cfcf')("[Client] ") + msg)}
    server(msg) {
        console.log(gradient('#235ccf', '#cf23bd')("[Server] ") + msg)}
    error(msg) {
        console.log(gradient('#e84a55', '#4f080d')("[Error] ") + msg)} }
const logger = new Logger();

class ProxyServer {
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
        this.isPlayed = false;
        this.userClient = null;
        this.proxyClient = null;
        this.packets = []; }
    
    // Создание клиента
    createProxyClient() {
        this.logger.client("Creating client");
        if (!this.config.password == "") {
            var client = createClient({
                username: this.config.accountname,
                password: this.config.password,
                auth: "microsoft",
                host: this.config.host,
                port: this.config.port,
                proxyport: this.config.proxyport,
                keepAlive: true,
                version: this.config.version,
                hideErrors: true }); } else {
            var client = createClient({
                username: this.config.accountname,
                auth: "offline",
                host: this.config.host,
                port: this.config.port,
                proxyport: this.config.proxyport,
                keepAlive: true,
                version: this.config.version,
                hideErrors: true });
        }

        client.on("packet", (data, meta) => {
            if (!["keep_alive", "success", "custom_payload", "encryption_begin", "compress"].includes(meta.name)) {
                this.packets.push([meta, data]);
                if (this.userClient && meta.state === states.PLAY && this.userClient.state === states.PLAY) {
                    this.userClient.write(meta.name, data);
                    if (meta.name === "set_compression") this.userClient.compressionThreshold = data.threshold;
                }
            } });

        client.on("end", () => {
            if (this.userClient) this.logger.info("Proxy client ended!"); });

        client.on("error", (error) => {
            if (this.userClient) {
                this.logger.error(`Proxy client error: ${error}`);
                this.userClient.end(error);
            }   });
        return client;   }

    findLastPacket(array, searchValue) {
        var index = array.slice().reverse().findIndex(x => x[0].name === searchValue);
        var count = array.length - 1;
        var finalIndex = index >= 0 ? count - index : index;
        return finalIndex; }

    async getServerIcon(address) {
        const response = await fetch(`https://api.mcstatus.io/v2/status/java/${address}`);
        const data = await response.json();
        this.logger.server("Fetched server info...");
        return data; }

    async start() {
        this.proxyClient = this.createProxyClient();
        const serverInfo = await this.getServerIcon(this.config.host);
        try { this.motdFormatted = serverInfo.motd.raw }
        catch (e) {
            this.logger.warning("Failed to read motd!")
            this.motdFormatted = "" }

        this.logger.server("Creating server...");

        // Создание сервера
        const proxyServer = createServer({
            "online-mode": false,
            host: this.config.proxyhost,
            proxyport: this.config.proxyport,
            keepAlive: false,
            version: this.config.version,
            motd: this.motdFormatted,
            favicon: serverInfo.icon,
            maxPlayers: serverInfo.players.max });

        proxyServer.playerCount = serverInfo.players.online;

        this.logger.server(`Server created: ${gradient.mind(this.config.proxyhost + ":" + this.config.proxyport)} (${this.config.version})`);
        this.logger.info("Waiting for connections...");

        proxyServer.on("login", (client) => {
            this.logger.client(`(${new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"})}) ${gradient.mind(client.username)} has connected`);

            if (!this.isPlayed) this.packets.forEach(([meta, data]) => client.write(meta.name, data));
            else if (this.isPlayed) {
                this.packets.forEach(([meta, data]) => {
                    if (!['position'].includes(meta.name)) {
                        client.write(meta.name, data);
                    }   });   
                }

            this.isPlayed = true;
            this.userClient = client;

            client.on("packet", (data, meta) => {
                if (meta.state === states.PLAY && this.proxyClient.state === states.PLAY && !["keep_alive"].includes(meta.name)) {
                    this.proxyClient.write(meta.name, data);
                }   });

            client.on("end", () => {
                if (this.proxyClient) {
                    this.logger.client(`(${new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"})}) ${gradient.mind(client.username)} has disconnected`);
                }
            });
        });
    }
}

function Main() {
    // Проверка config.json
    const path = "config.json";
    if (!fs.existsSync(path)) {
        logger.warning("Configuration file not found. Creating a new one with default values.");

        const defaultConfig = {
            accountname: "Steve",
            password: "",
            host: "mc.hypixel.net",
            port: 25565,
            proxyhost: "127.1.1.1",
            proxyport: 25565,
            version: "1.16.5" };

        fs.writeFileSync(path, JSON.stringify(defaultConfig, null, 2), "utf-8");

        logger.info("Please fill in the required values in 'config.json' and restart mioxy boosted.");
        process.exit(1); }

    const config = JSON.parse(fs.readFileSync(path, "utf-8"));
    
    // Баннер
    console.clear();
    process.title = "MIOXY BOOSTED | V1.0.0"
    const banner = `
███╗░░░███╗██╗░██████╗░██╗░░██╗██╗░░░██╗░░░░██████╗░░██████╗░░██████╗░███████╗████████╗███████╗██████╗░
████╗░████║██║██╔═══██╗╚██╗██╔╝╚██╗░██╔╝░░░░██╔══██╗██╔═══██╗██╔═══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗
██╔████╔██║██║██║░░░██║░╚███╔╝░░╚████╔╝░░░░░██████╔╝██║░░░██║██║░░░██║███████╗░░░██║░░░█████╗░░██║░░██║
██║╚██╔╝██║██║██║░░░██║░██╔██╗░░░╚██╔╝░░░░░░██╔══██╗██║░░░██║██║░░░██║╚════██║░░░██║░░░██╔══╝░░██║░░██║
██║░╚═╝░██║██║╚██████╔╝██╔╝░██╗░░░██║░░░░░░░██████╔╝╚██████╔╝╚██████╔╝███████║░░░██║░░░███████╗██████╔╝
╚═╝░░░░░╚═╝╚═╝░╚═════╝░╚═╝░░╚═╝░░░╚═╝░░░░░░░╚═════╝░░╚═════╝░░╚═════╝░╚══════╝░░░╚═╝░░░╚══════╝╚═════╝░
░░░░MINECRAFT░PROXY░SERVER░░░|░░░Original:░https://github.com/quickyyy/MIOXY░░░|░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░VERSION:░1.0.0░░░░░░░|░░░Based:░https://github.com/dest4590/MIOXY░░░░░░|░░░Created:░Fortcote░░░
    `;
    console.log(gradient('#e8b34a', '#e84ae3', '#574ae8')(banner));
    logger.info(`Player username: ${gradient.mind(config.accountname)}`);
    logger.info(`Server to connect: ${gradient.mind(config.host)}`);
    let host = config.host
    let port = config.port
    protocol.ping({ host, port }, (err, Result) => {
        if (err) throw err
        logger.info(`Ping: ${gradient.pastel(JSON.stringify(Result.latency))} ms - Online: ${gradient.mind(JSON.stringify(Result.players.online)+"/"+JSON.stringify(Result.players.max))} - Version: ${gradient.pastel(JSON.stringify(Result.version.name))}`)
    });
    const proxyServer = new ProxyServer(config, logger);
    proxyServer.start(); }

if (typeof require !== 'undefined' && require.main === module) {Main();}