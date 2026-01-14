import cron from "node-cron";
import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;
import qrcode from "qrcode-terminal";

const client = new Client({
  authStrategy: new LocalAuth(), // guarda sesión
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  }
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("Escaneá el QR con WhatsApp");
});

client.on("ready", async() => {
  console.log("Bot listo");
    const chat = await client.getChatById("120363424277871437@g.us")
    const mentions = [];
    let text = "";

    for (const participant of chat.participants) {
        const id = participant?.id?._serialized;
        const user = participant?.id?.user;

        if (!id || !user) continue;

        mentions.push(id);
        text += `@${user} `;
    }
  cron.schedule("03 23 * * *", () => {
    client.sendMessage("120363424277871437@g.us",`Recordatorio diario de que tienen que salir a correr loquitos. ${text}`,
    { mentions });
  },
  { timezone: "America/Argentina/Buenos_Aires" });
});

client.on("message", async (msg) => {
    console.log(msg)
  if (msg.body === "!ping") {
    console.log(msg)
    await msg.reply("pong 🏓");
  }
});
client.on("message_edit",async(msg) => {
    console.log(msg)
})

client.initialize();
